/**
 * Importe les photos d'étape : renomme, recadre, convertit en webp.
 *
 *     node utils/importSteps.mjs <dossier-source>
 *     node utils/importSteps.mjs ~/Desktop/photos-rpa --dry
 *
 * ── COMMENT NOMMER LES FICHIERS SOURCES ──────────────────────────────────
 * Le fichier doit COMMENCER par le numéro de l'étape (1 à 18). Tout ce qui
 * suit est libre, l'extension aussi (jpg, jpeg, png, webp, heic déjà converti).
 *
 *     1.jpg              02-versailles.png       3 - blois.jpeg
 *     01_arrivee.jpg     18-verneuil-final.png
 *
 * Le script se charge du reste : il retrouve la ville correspondante dans
 * `data/etapes-2024.js` et écrit `public/steps/<slug>.webp`.
 *
 * Pourquoi ne pas garder les numéros dans le repo ? Parce qu'une renumérotation
 * des étapes — il y en a déjà eu une, à l'insertion de Versailles — décalerait
 * silencieusement toutes les photos. Le slug, lui, dit quelle ville il montre.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { etapes2024 } from '../data/etapes-2024.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(root, 'public/steps');

// Le cadre de la carte fait 948×800 unités, soit un ratio de 1,185.
//
// La photo est plafonnée à 640 px d'affichage (`lg:max-w-[min(76vh,40rem)]`),
// et seuls ~78 % de sa largeur sont visibles — le reste est mangé par la
// découpe en silhouette et la réserve d'étiquettes. 1024 px reste donc
// au-dessus du 1:1 réel tout en pesant deux fois moins que du 2× intégral.
// Mesuré sur les 18 photos : 4,9 Mo d'origine → 2,1 Mo en 1280 → 1,6 Mo ici.
const WIDTH = 1024;
const HEIGHT = 864;

// Qualité volontairement basse : la photo n'est jamais vue telle quelle. Elle
// est désaturée, assombrie, recouverte d'un voile navy et découpée dans la
// silhouette de la France. Les artefacts de compression y sont invisibles,
// alors qu'ils coûteraient cher au chargement sur mobile.
const QUALITY = 58;
// `effort: 6` = compression la plus poussée de l'encodeur webp. Plus lent à
// produire, mais on ne le fait qu'une fois, et ça gagne ~15 % de poids.
const EFFORT = 6;

const SOURCES_OK = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif']);

const [, , srcArg, ...flags] = process.argv;
const dry = flags.includes('--dry');

if (!srcArg) {
  console.error('Usage : node utils/importSteps.mjs <dossier-source> [--dry]');
  process.exit(1);
}

const srcDir = resolve(srcArg.replace(/^~/, process.env.HOME ?? '~'));
if (!existsSync(srcDir) || !statSync(srcDir).isDirectory()) {
  console.error(`Dossier introuvable : ${srcDir}`);
  process.exit(1);
}

const fichiers = readdirSync(srcDir).filter((f) => SOURCES_OK.has(extname(f).toLowerCase()));

if (!fichiers.length) {
  console.error(`Aucune image exploitable dans ${srcDir}`);
  process.exit(1);
}

// Un numéro d'étape en tête de nom de fichier, avec ou sans zéro initial.
const numeroDe = (f) => {
  const m = basename(f).match(/^\s*0*(\d{1,2})\b/);
  if (!m) return null;
  const n = Number(m[1]);
  return n >= 1 && n <= etapes2024.length ? n : null;
};

const parEtape = new Map();
const ignores = [];

for (const f of fichiers) {
  const n = numeroDe(f);
  if (n === null) {
    ignores.push(f);
    continue;
  }
  // Deux fichiers pour la même étape : on garde le premier et on le signale,
  // plutôt que d'en écraser un au hasard selon l'ordre du système de fichiers.
  if (parEtape.has(n)) {
    ignores.push(`${f} (l'étape ${n} est déjà prise par ${parEtape.get(n)})`);
    continue;
  }
  parEtape.set(n, f);
}

console.log(`Source : ${srcDir}`);
console.log(`Sortie : ${OUT_DIR}${dry ? '  [--dry, rien ne sera écrit]' : ''}\n`);

if (!dry) mkdirSync(OUT_DIR, { recursive: true });

let ecrits = 0;

for (const [numero, fichier] of [...parEtape.entries()].sort((a, b) => a[0] - b[0])) {
  const etape = etapes2024[numero - 1];
  const dest = join(OUT_DIR, `${etape.slug}.webp`);
  const src = join(srcDir, fichier);

  const meta = await sharp(src).metadata();
  const portrait = meta.height > meta.width;

  if (dry) {
    console.log(
      `  ${String(numero).padStart(2)}  ${fichier}  →  ${etape.slug}.webp` +
        `   (${meta.width}×${meta.height}${portrait ? ', PORTRAIT : rognage important' : ''})`
    );
    continue;
  }

  // `cover` + position `attention` : sharp recadre autour de la zone la plus
  // saillante plutôt qu'au centre. Sur une photo verticale, ça évite de couper
  // le sujet en gardant bêtement le milieu géométrique.
  const info = await sharp(src)
    .rotate() // applique l'orientation EXIF avant tout recadrage
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: QUALITY, effort: EFFORT })
    .toFile(dest);

  const ko = Math.round(info.size / 1024);
  console.log(
    `  ${String(numero).padStart(2)}  ${fichier}  →  ${etape.slug}.webp   ${ko} Ko` +
      (portrait ? '   ⚠ source portrait, à vérifier à l\'œil' : '')
  );
  ecrits++;
}

const manquantes = etapes2024
  .map((e, i) => ({ numero: i + 1, slug: e.slug }))
  .filter((e) => !parEtape.has(e.numero));

if (ignores.length) {
  console.log(`\n⚠ Ignorés (pas de numéro d'étape en tête de nom) :`);
  ignores.forEach((f) => console.log(`  · ${f}`));
}

if (manquantes.length) {
  console.log(`\n⚠ Étapes sans photo fournie :`);
  manquantes.forEach((e) => console.log(`  · ${String(e.numero).padStart(2)}  ${e.slug}`));
}

console.log(
  `\n${dry ? 'Simulation' : `${ecrits} photo(s) écrite(s)`} · ${parEtape.size}/${etapes2024.length} étapes couvertes`
);
