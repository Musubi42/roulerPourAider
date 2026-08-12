/**
 * Recompresse, SUR PLACE, les images qui sont bien utilisées par le site mais
 * servies à une résolution sans rapport avec leur affichage.
 *
 *     node utils/optimizeAssets.mjs --dry    # simulation
 *     node utils/optimizeAssets.mjs
 *
 * Le format et le nom de chaque fichier sont conservés : aucune référence dans
 * le code n'a besoin d'être modifiée, donc aucun risque de 404. C'est plus
 * important ici que le gain marginal qu'apporterait un passage en WebP —
 * l'essentiel du poids vient de la résolution, pas du format.
 *
 * Les cibles sont calculées à partir de la taille de RENDU réelle, doublée
 * pour les écrans retina. Le script est idempotent : une image déjà à la bonne
 * taille est laissée telle quelle.
 */

import { statSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dry = process.argv.includes('--dry');

/**
 * `largeur` = largeur cible en pixels (retina compris).
 * `pourquoi` documente d'où sort le chiffre — sans ça, personne ne saura
 * plus dans deux ans pourquoi c'est 512 et pas 2048.
 */
const CIBLES = [
  {
    fichier: 'public/images/logoBig_roulerPourAider.png',
    largeur: 512,
    pourquoi: 'rendu en h-12 (48 px) dans le header et w-32 (128 px) dans le footer',
  },
  {
    fichier: 'public/Grande-cause-nationale-Bouge-chaque-jour.png',
    largeur: 820,
    pourquoi: 'rendu en h-24/h-32 sur PartnerThanks, h-10 dans le footer',
  },
  {
    fichier: 'public/soutiens/Steve-Chainel.jpeg',
    largeur: 512,
    pourquoi: 'pastille de 112 px sur /equipe',
  },
  {
    fichier: 'public/soutiens/Yoann-Offredo.jpeg',
    largeur: 512,
    pourquoi: 'pastille de 112 px sur /equipe',
  },
  {
    fichier: 'public/soutiens/Stella-Akakpo.jpeg',
    largeur: 512,
    pourquoi: 'pastille de 112 px sur /equipe',
  },
  {
    fichier: 'public/soutiens/nelson-monfort.webp',
    largeur: 512,
    pourquoi: 'pastille de 112 px sur /equipe',
  },
];

const ko = (o) => Math.round(o / 1024);
let gainTotal = 0;

for (const cible of CIBLES) {
  const abs = resolve(root, cible.fichier);
  let avant;
  try {
    avant = statSync(abs).size;
  } catch {
    console.log(`  ⚠ introuvable : ${cible.fichier}`);
    continue;
  }

  const meta = await sharp(abs).metadata();
  if (meta.width <= cible.largeur) {
    console.log(`  = ${cible.fichier}  déjà à ${meta.width} px, rien à faire`);
    continue;
  }

  const pipeline = sharp(abs).rotate().resize(cible.largeur, null, { withoutEnlargement: true });
  const format = meta.format === 'png' ? 'png' : meta.format === 'webp' ? 'webp' : 'jpeg';
  const encode =
    format === 'png'
      ? pipeline.png({ compressionLevel: 9, palette: true })
      : format === 'webp'
        ? pipeline.webp({ quality: 78, effort: 6 })
        : pipeline.jpeg({ quality: 80, mozjpeg: true });

  const buffer = await encode.toBuffer();

  if (dry) {
    console.log(
      `  ~ ${cible.fichier}\n      ${meta.width}×${meta.height} ${ko(avant)} Ko  →  ${cible.largeur} px ${ko(buffer.length)} Ko   (${cible.pourquoi})`
    );
  } else {
    // Écriture après coup : sharp ne peut pas lire et écrire le même fichier
    // dans la même passe, d'où le passage par un buffer.
    const { writeFileSync } = await import('node:fs');
    writeFileSync(abs, buffer);
    console.log(
      `  ✓ ${relative(root, abs)}   ${ko(avant)} → ${ko(buffer.length)} Ko   (−${ko(avant - buffer.length)} Ko)`
    );
  }
  gainTotal += avant - buffer.length;
}

console.log(
  `\n${dry ? 'Simulation' : 'Terminé'} — ${gainTotal > 0 ? `−${(gainTotal / 1024 / 1024).toFixed(2)} Mo` : 'aucun gain'}`
);
