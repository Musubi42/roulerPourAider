/**
 * Convertit les polices Omnes de TrueType en WOFF2, sous-ensemblées au latin.
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
 * SOUS-ENSEMBLAGE. Omnes déclare 440 codepoints, dont ~110 hors du latin de
 * base. Le site est francophone et son contenu est figé : un relevé de tous
 * les caractères de `components/`, `pages/`, `layouts/` et `data/` ne sort
 * jamais de la plage `latin` ci-dessous. Les trois exceptions relevées — `→`
 * (U+2192), `↗` (U+2197) et `≈` (U+2248) — sont de toute façon ABSENTES
 * d'Omnes : elles tombaient déjà en police de substitution avant ce
 * sous-ensemblage. On ne perd donc rien de ce qui est réellement rendu, pour
 * 260 → 139 Ko sur les six graisses (−47 %), en tête du chemin critique.
 *
 * Latin Extended-A (U+0100-017F, les diacritiques d'Europe centrale) coûterait
 * 34 Ko de plus pour zéro caractère employé. Écarté ; à rétablir en l'ajoutant
 * à `PLAGE_LATIN` si un nom propre l'exige un jour.
 *
 * pyftsubset (Python, fonttools) fait le travail, invoqué via `uvx` pour ne
 * rien installer durablement. C'est une étape MANUELLE — les WOFF2 produits
 * sont versionnés, le build Vercel n'exécute jamais ce script et n'a donc
 * besoin d'aucun Python. Sans `uvx`, on retombe sur une simple conversion
 * WOFF2 non sous-ensemblée : le site reste correct, seulement plus lourd.
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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

/**
 * La plage `latin` de Google Fonts, à l'identique. Elle couvre l'ASCII, tout
 * Latin-1 (donc les accents français), Œ/œ, la ponctuation typographique
 * (U+2000-206F : les apostrophes courbes, les tirets cadratins, les
 * espaces insécables) et l'euro.
 *
 * ⚠️ Cette liste doit rester synchronisée avec le descripteur `unicode-range`
 * des `@font-face` de `assets/css/main.css`. Le navigateur s'y fie pour savoir
 * quand se rabattre sur la police de substitution ; s'il croit à une
 * couverture plus large que le fichier, il affiche des carrés vides.
 */
const PLAGE_LATIN = [
  'U+0000-00FF',
  'U+0131',
  'U+0152-0153',
  'U+02BB-02BC',
  'U+02C6',
  'U+02DA',
  'U+02DC',
  'U+2000-206F',
  'U+2074',
  'U+20AC',
  'U+2122',
  'U+2212',
  'U+2215',
  'U+FEFF',
  'U+FFFD',
].join(',');

/**
 * Le crénage et les ligatures sont conservés : les retirer allègerait à peine
 * et abîmerait le rendu des titres, qui sont grands et donc impitoyables.
 * Le hinting TrueType est conservé lui aussi — le supprimer gagnerait ~8 Ko
 * mais dégrade le rendu du petit texte sous Windows.
 */
const FONCTIONS_OPENTYPE = 'kern,liga,ccmp,locl,mark,mkmk';

function sousEnsembler(entree, sortie) {
  execFileSync(
    'uvx',
    [
      '--quiet',
      '--with', 'brotli',
      '--from', 'fonttools',
      'pyftsubset',
      entree,
      `--output-file=${sortie}`,
      '--flavor=woff2',
      `--unicodes=${PLAGE_LATIN}`,
      `--layout-features=${FONCTIONS_OPENTYPE}`,
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );
}

let sousEnsemblageDisponible = true;
try {
  execFileSync('uvx', ['--version'], { stdio: 'ignore' });
} catch {
  sousEnsemblageDisponible = false;
  console.warn(
    '⚠️  `uvx` introuvable : conversion WOFF2 SANS sous-ensemblage.\n' +
      '    Les polices produites seront ~47 % plus lourdes que celles versionnées.\n' +
      '    Installer uv (https://docs.astral.sh/uv/) pour retrouver le résultat de référence.\n'
  );
}

mkdirSync(dest, { recursive: true });

const ko = (o) => Math.round(o / 1024);
let avantTotal = 0;
let apresTotal = 0;

for (const p of POIDS) {
  const entree = resolve(src, p.fichier);
  const sortie = resolve(dest, p.fichier.replace(/\.ttf$/i, '.woff2'));

  const ttf = readFileSync(entree);

  if (sousEnsemblageDisponible) {
    sousEnsembler(entree, sortie);
  } else {
    writeFileSync(sortie, await compress(ttf));
  }

  const woff2 = readFileSync(sortie);
  avantTotal += ttf.length;
  apresTotal += woff2.length;

  console.log(
    `  ✓ ${p.fichier.padEnd(22)} ${String(ko(ttf.length)).padStart(4)} → ${String(ko(woff2.length)).padStart(3)} Ko   poids ${p.poids}  (${p.usages})`
  );
}

console.log(
  `\n${POIDS.length} polices · ${ko(avantTotal)} → ${ko(apresTotal)} Ko  (−${Math.round((1 - apresTotal / avantTotal) * 100)} %)` +
    (sousEnsemblageDisponible ? '  · sous-ensemblées au latin' : '  · SANS sous-ensemblage')
);
console.log(`Non converties car inutilisées : Omnes-Hairline, Omnes-ExtraLight, et les 10 italiques.`);
