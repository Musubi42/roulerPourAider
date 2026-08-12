/**
 * Repère les fichiers de `public/` qu'aucune source ne référence, et sait les
 * déplacer vers `archives/` — versionnés sur GitHub, absents du déploiement.
 *
 *     node utils/auditAssets.mjs             # rapport
 *     node utils/auditAssets.mjs --archive   # déplace vers archives/
 *     node utils/auditAssets.mjs --restore   # remet tout dans public/
 *
 * POURQUOI UN DÉPLACEMENT ET PAS UN .vercelignore ?
 * Parce que ce que Vercel déploie n'est pas le dépôt mais `.output/public`,
 * généré par le build — et Nitro y recopie `public/` intégralement. Vérifié :
 * avant archivage, le build pesait 71 Mo pour un site dont les pages n'en
 * servent qu'une fraction. `.vercelignore` ne filtre que l'envoi des sources
 * par le CLI, il n'a aucune prise sur un artefact généré. Sortir les fichiers
 * de `public/` est le seul moyen fiable : Nitro ne peut pas copier ce qui n'y
 * est plus, et git les conserve.
 *
 * DEUX RÈGLES DE DÉTECTION
 * 1. Aucune occurrence du nom de fichier dans le code ni dans les données.
 *    La recherche porte sur le NOM, pas le chemin, et teste aussi le nom sans
 *    extension : plusieurs chemins sont construits dynamiquement
 *    (`/steps/${slug}.webp`). Volontairement permissif — mieux vaut garder un
 *    fichier de trop que casser une image en production.
 * 2. Les originaux lourds doublonnés par un `.webp` du même nom, quand seul le
 *    `.webp` est cité (ex. `fresque.jpeg` 11 Mo / `fresque.webp` 524 Ko).
 *
 * Les PDF sont volontairement épargnés : personne ne les référence, mais une
 * URL directe a pu être communiquée à l'extérieur. À arbitrer à la main.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(root, 'public');
const archiveDir = resolve(root, 'archives');

const SOURCE_DIRS = ['components', 'pages', 'layouts', 'data', 'plugins', 'composables', 'assets', 'utils'];
const SOURCE_FILES = ['nuxt.config.ts', 'app.vue', 'error.vue', 'vercel.json'];
const SOURCE_EXT = new Set(['.vue', '.ts', '.js', '.mjs', '.json', '.css', '.md']);
const TOUJOURS_GARDER = new Set(['robots.txt', 'sitemap.xml', 'favicon.ico']);
const EXT_EPARGNEES = new Set(['.pdf']);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const mode = process.argv.includes('--archive')
  ? 'archive'
  : process.argv.includes('--restore')
    ? 'restore'
    : 'rapport';

// --- Remise en place ---------------------------------------------------------
if (mode === 'restore') {
  const fichiers = walk(archiveDir);
  for (const f of fichiers) {
    const dest = join(publicDir, relative(archiveDir, f));
    mkdirSync(dirname(dest), { recursive: true });
    renameSync(f, dest);
    console.log(`  ← ${relative(root, dest)}`);
  }
  console.log(`\n${fichiers.length} fichier(s) remis dans public/`);
  process.exit(0);
}

// --- Corpus ------------------------------------------------------------------
const moi = fileURLToPath(import.meta.url);
const strapiDump = resolve(root, 'data/strapi');
let corpus = '';
for (const d of SOURCE_DIRS) {
  for (const f of walk(resolve(root, d))) {
    // Ce script cite des noms de fichiers dans ses propres commentaires : sans
    // cette exclusion, il les déclarerait « utilisés » et s'auto-aveuglerait.
    if (f === moi) continue;
    // `data/strapi/` est le dump brut de l'ancien CMS, importé par aucun
    // composant. Il ne doit pas voter sur ce qui est vivant : son champ `slug`
    // « /qui-sommes-nous/hopital-necker » suffisait à faire passer pour utilisé
    // un `public/hopital-necker.jpeg` de 4,7 Mo que plus rien n'affiche.
    if (f.startsWith(strapiDump)) continue;
    if (SOURCE_EXT.has(extname(f))) corpus += readFileSync(f, 'utf8') + '\n';
  }
}
for (const f of SOURCE_FILES) {
  try {
    corpus += readFileSync(resolve(root, f), 'utf8') + '\n';
  } catch {}
}

/** Le nom apparaît-il tel quel dans le code ? */
const cite = (nom) => corpus.includes(nom);

/**
 * Le nom, privé de son extension, apparaît-il comme un identifiant entier ?
 * Cette règle existe pour les chemins construits à l'exécution — `/steps/${slug}.webp`,
 * où seul le slug figure dans le code. On exige des délimiteurs, sinon
 * « hopital-necker » passerait pour cité par « /hopital-necker-visite/... ».
 *
 * Deux formes seulement, et pas une de plus :
 *   1. `"paris"`        — un slug isolé dans une liste, qu'on suffixera
 *   2. `/paris.` ou `"paris.` — le nom immédiatement suivi de son extension
 *
 * Ce qui est délibérément EXCLU : `"/un/chemin/paris"`, un segment d'URL fermé
 * par un guillemet. C'est une route, pas un fichier — et c'est exactement ce
 * qui faisait passer pour utilisé un `public/hopital-necker.jpeg` de 4,7 Mo,
 * via la redirection `/qui-sommes-nous/hopital-necker` de vercel.json.
 */
const citeCommeIdentifiant = (nom) => {
  const echappe = nom.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return (
    new RegExp(`['"\`]${echappe}['"\`]`).test(corpus) ||
    new RegExp(`['"\`/]${echappe}\\.`).test(corpus)
  );
};

// --- Détection ---------------------------------------------------------------
const candidats = [];
let poidsTotal = 0;

for (const f of walk(publicDir)) {
  const base = f.split('/').pop();
  const ext = extname(base).toLowerCase();
  const taille = statSync(f).size;
  poidsTotal += taille;

  if (TOUJOURS_GARDER.has(base) || EXT_EPARGNEES.has(ext)) continue;

  const sansExt = base.slice(0, base.length - ext.length);
  const webpVoisin = resolve(dirname(f), sansExt + '.webp');

  let motif = null;
  if (!cite(base) && !citeCommeIdentifiant(sansExt)) {
    motif = 'aucune référence';
  } else if (
    ['.jpeg', '.jpg', '.png', '.tif', '.tiff'].includes(ext) &&
    existsSync(webpVoisin) &&
    webpVoisin !== f &&
    !cite(base)
  ) {
    motif = 'original doublonné par un .webp';
  }

  if (motif) candidats.push({ f, rel: relative(root, f), taille, motif });
}

candidats.sort((a, b) => b.taille - a.taille);
const poidsCandidats = candidats.reduce((a, c) => a + c.taille, 0);
const mo = (o) => (o / 1024 / 1024).toFixed(2);

// --- Sortie ------------------------------------------------------------------
if (mode === 'archive') {
  for (const c of candidats) {
    const dest = join(archiveDir, relative(publicDir, c.f));
    mkdirSync(dirname(dest), { recursive: true });
    renameSync(c.f, dest);
    console.log(`  → archives/${relative(publicDir, c.f)}`);
  }
  // Nettoyage des dossiers devenus vides dans public/
  for (const d of walk(publicDir).map((f) => dirname(f))) void d;
  const vider = (dir) => {
    if (!existsSync(dir)) return;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) vider(join(dir, e.name));
    }
    if (dir !== publicDir && readdirSync(dir).length === 0) rmdirSync(dir);
  };
  vider(publicDir);
  console.log(`\n${candidats.length} fichier(s) archivé(s), ${mo(poidsCandidats)} Mo retirés du build.`);
  console.log(`Ils restent versionnés dans archives/. Pour revenir : --restore`);
} else {
  console.log(`public/ : ${mo(poidsTotal)} Mo`);
  console.log(`Archivables : ${candidats.length} fichiers, ${mo(poidsCandidats)} Mo\n`);
  for (const c of candidats) {
    console.log(`  ${mo(c.taille).padStart(6)} Mo  ${c.rel.padEnd(52)} ${c.motif}`);
  }
  console.log(`\n--archive pour les déplacer, --restore pour revenir en arrière.`);
}
