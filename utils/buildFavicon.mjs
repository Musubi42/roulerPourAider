/**
 * Fabrique `public/favicon.ico` depuis le master d'assets/favicon/.
 *
 *     node utils/buildFavicon.mjs
 *
 * Le fichier livré auparavant n'était PAS un ICO : c'était un PNG de 350 × 350
 * simplement renommé `.ico` (30 Ko). Les navigateurs le toléraient en reniflant
 * les octets, mais ils téléchargeaient 30 Ko pour dessiner 16 pixels de côté.
 *
 * On produit ici un vrai conteneur ICO contenant trois rendus — 16, 32 et 48 —
 * qui sont les tailles réellement demandées : 16 pour l'onglet, 32 pour l'onglet
 * en écran haute densité et la barre des tâches, 48 pour les raccourcis bureau.
 * Au-delà, c'est le domaine des `apple-touch-icon`, que le site ne déclare pas.
 *
 * Le master reste dans `assets/favicon/` : `assets/` n'est pas servi tel quel,
 * seul le résultat atterrit dans `public/`. Même convention que buildFonts.mjs
 * et buildMap.mjs — les sources sont versionnées, la génération est manuelle et
 * son résultat est commité, le build Vercel n'exécute jamais ce script.
 *
 * Le format ICO est un simple index suivi des images. Chaque entrée peut porter
 * un BMP ou un PNG ; le PNG est accepté partout depuis Vista et compresse bien
 * mieux, on ne fabrique donc que du PNG.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const master = resolve(root, 'assets/favicon/favicon-source.png');
const sortie = resolve(root, 'public/favicon.ico');

const TAILLES = [16, 32, 48];

/** En-tête ICONDIR : 2 octets réservés à zéro, le type 1 (icône), le nombre d'images. */
function enTete(nombre) {
  const b = Buffer.alloc(6);
  b.writeUInt16LE(0, 0);
  b.writeUInt16LE(1, 2);
  b.writeUInt16LE(nombre, 4);
  return b;
}

/**
 * ICONDIRENTRY, 16 octets. Les dimensions tiennent sur un octet : 0 y signifie
 * 256, ce qui borne le format — sans conséquence ici, on ne dépasse pas 48.
 */
function entree({ taille, poids, decalage }) {
  const b = Buffer.alloc(16);
  b.writeUInt8(taille % 256, 0); // largeur
  b.writeUInt8(taille % 256, 1); // hauteur
  b.writeUInt8(0, 2); // palette : aucune, l'image est en couleurs directes
  b.writeUInt8(0, 3); // réservé
  b.writeUInt16LE(1, 4); // plans
  b.writeUInt16LE(32, 6); // bits par pixel (RGBA)
  b.writeUInt32LE(poids, 8);
  b.writeUInt32LE(decalage, 12);
  return b;
}

const png = readFileSync(master);

const images = [];
for (const taille of TAILLES) {
  images.push({
    taille,
    donnees: await sharp(png)
      .resize(taille, taille, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9, palette: true })
      .toBuffer(),
  });
}

// Les images suivent l'index : le premier décalage est donc la taille de
// l'en-tête plus celle de toutes les entrées.
let decalage = 6 + 16 * images.length;
const entrees = [];
for (const img of images) {
  entrees.push(entree({ taille: img.taille, poids: img.donnees.length, decalage }));
  decalage += img.donnees.length;
}

const ico = Buffer.concat([enTete(images.length), ...entrees, ...images.map((i) => i.donnees)]);
writeFileSync(sortie, ico);

const ko = (o) => (o / 1024).toFixed(1);
console.log(`  master  ${ko(png.length)} Ko`);
for (const img of images) {
  console.log(`  ✓ ${String(img.taille).padStart(2)}×${img.taille}   ${ko(img.donnees.length).padStart(5)} Ko`);
}
console.log(`\nfavicon.ico · ${ko(png.length)} → ${ko(ico.length)} Ko`);
