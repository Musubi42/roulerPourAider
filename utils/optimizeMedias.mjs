/**
 * Reencode les visuels herites du back-office Strapi (`public/medias/`).
 *
 * L'export brut de Strapi a livre les fichiers ORIGINAUX : des photos de presse
 * en 4535x3024 pour des vignettes affichees en ~450 px de large, et des logos de
 * partenaires en PNG de 600 Ko pour une bande de 80 px de haut. 7,4 Mo au total,
 * soit un tiers du poids deploye du site, pour des pixels que personne ne voit.
 *
 * `archives/medias/` est la SOURCE DE VERITE : les originaux y sont deposes
 * au premier passage et n'en bougent plus. Le CMS d'origine est eteint, c'est
 * leur seule copie survivante. `public/medias/` n'est qu'une sortie, ecrasee
 * a chaque execution — d'ou l'idempotence : relancer donne le meme resultat.
 *
 * Le script reecrit aussi les chemins dans les fichiers qui les portent, en
 * raisonnant sur le nom SANS extension. C'est ce qui le rend rejouable apres un
 * changement de format : `/medias/x.png` comme `/medias/x.webp` pointent
 * tous deux vers la sortie retenue pour `x`.
 *
 *   node utils/optimizeMedias.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const RACINE = path.resolve(import.meta.dirname, '..');
const PUBLIC_DIR = path.join(RACINE, 'public/medias');
const ARCHIVE_DIR = path.join(RACINE, 'archives/medias');

/**
 * Largeurs cibles, par usage. Chacune vaut environ deux fois la taille CSS
 * rendue, pour rester net sur un ecran a densite doublee.
 *  - logo      : bande partenaires, 80 px de haut  -> 500 px suffit largement
 *  - vignette  : carte de presse en 16/10, ~450 px -> 900 px
 *  - portrait  : pastille ronde de 112 px          -> 300 px
 */
const LARGEURS = { logo: 500, vignette: 900, portrait: 300 };

/** Le portrait rond des fondateurs, code en dur dans TeamGrid. */
const PORTRAITS = new Set(['unamed_6bf1002668']);

/**
 * Fichiers reellement lus par le site : ce sont EUX, et eux seuls, qui disent
 * quelle image merite encore d'etre deployee.
 */
const VIVANTS = [
  'data/presse.json',
  'data/partenaires.json',
  'components/victory/TeamGrid.vue',
  'components/victory/PressFull.vue',
];

/**
 * `data/strapi/` est volontairement HORS de cette liste. C'est le dump brut du
 * CMS, eteint depuis : aucun composant ne l'importe, et ses chemins decrivent
 * ce qu'etait le back-office, pas ce que sert `public/`. Le reecrire au fil des
 * reencodages ferait mentir la seule trace qui reste de l'ancien site.
 */
const PORTEURS = VIVANTS;

const sansExt = (nom) => path.parse(nom).name;

// ── Ce qui est encore reference, et a quel titre ──────────────────────────
const references = new Set();
const logos = new Set();
for (const rel of VIVANTS) {
  const texte = await fs.readFile(path.join(RACINE, rel), 'utf8');
  for (const m of texte.matchAll(/\/medias\/([A-Za-z0-9_.-]+)/g)) {
    references.add(sansExt(m[1]));
    if (rel === 'data/partenaires.json') logos.add(sansExt(m[1]));
  }
}

// ── Depot des originaux dans les archives, au premier passage ─────────────
await fs.mkdir(ARCHIVE_DIR, { recursive: true });
const dejaArchive = new Set((await fs.readdir(ARCHIVE_DIR)).map(sansExt));
for (const nom of await fs.readdir(PUBLIC_DIR)) {
  if (!/\.(png|jpe?g|webp)$/i.test(nom) || dejaArchive.has(sansExt(nom))) continue;
  await fs.copyFile(path.join(PUBLIC_DIR, nom), path.join(ARCHIVE_DIR, nom));
  console.log(`archive  ${nom}`);
}

// ── Regeneration complete de la sortie ────────────────────────────────────
for (const nom of await fs.readdir(PUBLIC_DIR)) {
  if (/\.(png|jpe?g|webp)$/i.test(nom)) await fs.unlink(path.join(PUBLIC_DIR, nom));
}

const originaux = (await fs.readdir(ARCHIVE_DIR)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
const sorties = new Map(); // nom sans extension -> fichier retenu dans public/
let avant = 0;
let apres = 0;

for (const nom of originaux) {
  const base = sansExt(nom);
  const source = path.join(ARCHIVE_DIR, nom);
  const poidsOriginal = (await fs.stat(source)).size;
  avant += poidsOriginal;

  if (!references.has(base)) {
    console.log(`ignore   ${nom} (${Math.round(poidsOriginal / 1024)} Ko, non reference)`);
    continue;
  }

  const usage = logos.has(base) ? 'logo' : PORTRAITS.has(base) ? 'portrait' : 'vignette';
  const meta = await sharp(source).metadata();
  const buffer = await sharp(source)
    // `withoutEnlargement` : un logo deja livre en 276 px ne doit pas etre
    // interpole vers 500, ca n'ajouterait que du poids sans un pixel de net.
    .resize({ width: Math.min(LARGEURS[usage], meta.width), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  // Un logo en aplats de couleur — deux teintes, des bords nets — se compresse
  // mieux en PNG indexe qu'en WebP avec perte : sur ces fichiers la conversion
  // TRIPLAIT le poids. On garde donc le format d'origine quand il gagne.
  const gagne = buffer.length < poidsOriginal;
  const cible = gagne ? `${base}.webp` : nom;
  if (gagne) await fs.writeFile(path.join(PUBLIC_DIR, cible), buffer);
  else await fs.copyFile(source, path.join(PUBLIC_DIR, cible));

  const poidsFinal = (await fs.stat(path.join(PUBLIC_DIR, cible))).size;
  apres += poidsFinal;
  sorties.set(base, cible);
  console.log(
    `${usage.padEnd(9)} ${nom} ${Math.round(poidsOriginal / 1024)} Ko -> ` +
      `${Math.round(poidsFinal / 1024)} Ko${gagne ? '' : ' (original conserve)'}`
  );
}

// ── Reecriture des chemins ────────────────────────────────────────────────
for (const rel of PORTEURS) {
  const chemin = path.join(RACINE, rel);
  const avantTexte = await fs.readFile(chemin, 'utf8');
  const texte = avantTexte.replace(
    /\/medias\/([A-Za-z0-9_-]+)\.(png|jpe?g|webp)/g,
    (tel, base) => (sorties.has(base) ? `/medias/${sorties.get(base)}` : tel)
  );
  if (texte !== avantTexte) {
    await fs.writeFile(chemin, texte);
    console.log(`reecrit  ${rel}`);
  }
}

console.log(
  `\npublic/medias : ${Math.round(avant / 1024)} Ko -> ${Math.round(apres / 1024)} Ko`
);
