/**
 * Convertit les polices Omnes de TrueType en WOFF2.
 *
 *     node utils/buildFonts.mjs
 *
 * Le TTF n'est pas un format web : il n'est pas compressé pour le réseau. Le
 * WOFF2 applique une compression Brotli spécialisée pour les fontes et divise
 * typiquement le poids par deux, à rendu strictement identique.
 *
 * Seuls les poids réellement employés dans le code sont convertis. Les fichiers
 * TTF d'origine restent dans `assets/fonts/Omnes_Font_Family/` : ce sont les
 * masters, ils ne sont plus servis mais on veut pouvoir régénérer.
 *
 * Piste non exploitée : le sous-ensemblage (ne garder que les caractères
 * latins et les accents français) gagnerait encore ~40 %, mais demande
 * `fonttools`, une dépendance Python — disproportionné ici.
 */

import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compress } from 'wawoff2';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'assets/fonts/Omnes_Font_Family');
const dest = resolve(root, 'assets/fonts/woff2');

/**
 * Les graisses employées, relevées par comptage des classes Tailwind dans
 * `components/`, `pages/` et `layouts/`. Hairline (250) et ExtraLight (260)
 * sont volontairement absentes : zéro occurrence dans tout le projet.
 */
const POIDS = [
  { fichier: 'Omnes-Light.ttf', poids: 270, usages: 'font-light' },
  { fichier: 'Omnes-Regular.ttf', poids: 400, usages: 'font-normal, défaut' },
  { fichier: 'Omnes-Medium.ttf', poids: 500, usages: 'font-medium' },
  { fichier: 'Omnes-SemiBold.ttf', poids: 600, usages: 'font-semibold' },
  { fichier: 'Omnes-Bold.ttf', poids: 700, usages: 'font-bold' },
  { fichier: 'Omnes-Black.ttf', poids: 900, usages: 'font-black' },
];

mkdirSync(dest, { recursive: true });

const ko = (o) => Math.round(o / 1024);
let avantTotal = 0;
let apresTotal = 0;

for (const p of POIDS) {
  const entree = resolve(src, p.fichier);
  const sortie = resolve(dest, p.fichier.replace(/\.ttf$/i, '.woff2'));

  const ttf = readFileSync(entree);
  const woff2 = await compress(ttf);
  writeFileSync(sortie, woff2);

  avantTotal += ttf.length;
  apresTotal += woff2.length;

  console.log(
    `  ✓ ${p.fichier.padEnd(22)} ${String(ko(ttf.length)).padStart(4)} → ${String(ko(woff2.length)).padStart(3)} Ko   poids ${p.poids}  (${p.usages})`
  );
}

console.log(
  `\n${POIDS.length} polices · ${ko(avantTotal)} → ${ko(apresTotal)} Ko  (−${Math.round((1 - apresTotal / avantTotal) * 100)} %)`
);
console.log(`Non converties car inutilisées : Omnes-Hairline, Omnes-ExtraLight, et les 10 italiques.`);
