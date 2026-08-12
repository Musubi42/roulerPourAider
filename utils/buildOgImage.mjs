/**
 * Génère l'image de partage (Open Graph) : public/og-image.jpg, 1200 × 630.
 *
 *     node utils/buildOgImage.mjs
 *
 * C'est la vignette qui s'affiche quand quelqu'un colle un lien du site dans
 * WhatsApp, Facebook, LinkedIn, Slack ou iMessage.
 *
 * Contraintes qui expliquent les choix :
 * — 1200 × 630 (ratio 1.91:1) est le format attendu par Facebook et LinkedIn.
 *   Une image carrée, comme le logo utilisé jusqu'ici, s'y fait rogner en haut
 *   et en bas.
 * — Sous ~300 Ko, sinon WhatsApp n'affiche aucun aperçu. On vise 150 Ko.
 * — Le texte doit rester lisible en vignette de 300 px de large dans une liste
 *   de conversation : d'où des corps très grands et un fort contraste.
 *
 * Le traitement duotone navy reprend l'ADR-013, pour que la vignette appartienne
 * visuellement au site.
 */

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const W = 1200;
const H = 630;
const NAVY = '#12294A';
const OR = '#D4A843';

const PHOTO = resolve(root, 'public/1ere-edition/2020-arrivee-nice.webp');
const SORTIE = resolve(root, 'public/og-image.jpg');

// Le texte est posé en SVG : pas de dépendance à une police installée sur la
// machine, on s'appuie sur les familles génériques présentes partout.
const calque = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="voile" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${NAVY}" stop-opacity="0.72"/>
      <stop offset="55%"  stop-color="${NAVY}" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="${NAVY}" stop-opacity="0.94"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#voile)"/>

  <text x="80" y="212" font-family="Helvetica, Arial, sans-serif" font-size="46"
        font-weight="700" fill="${OR}" letter-spacing="6">2019 — 2024</text>

  <text x="80" y="330" font-family="Helvetica, Arial, sans-serif" font-size="104"
        font-weight="800" fill="#FFFFFF">Rouler pour aider</text>

  <text x="80" y="410" font-family="Helvetica, Arial, sans-serif" font-size="44"
        font-weight="500" fill="#FFFFFF" opacity="0.92">
    103 782 € récoltés pour l'hôpital Necker
  </text>

  <text x="80" y="480" font-family="Helvetica, Arial, sans-serif" font-size="38"
        font-weight="500" fill="#FFFFFF" opacity="0.68">
    4 327 km à vélo · 605 donateurs · deux éditions
  </text>

  <rect x="80" y="524" width="180" height="7" rx="3.5" fill="${OR}"/>
</svg>`;

const fond = await sharp(PHOTO)
  .resize(W, H, { fit: 'cover', position: sharp.strategy.attention })
  // Duotone : la photo devient une atmosphère, le texte reste au premier plan.
  .grayscale()
  .modulate({ brightness: 0.85 })
  .toBuffer();

const info = await sharp(fond)
  .composite([{ input: Buffer.from(calque), top: 0, left: 0 }])
  .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(SORTIE);

console.log(`✓ public/og-image.jpg — ${info.width}×${info.height}, ${Math.round(info.size / 1024)} Ko`);
if (info.size > 300 * 1024) {
  console.warn(`  ⚠ au-dessus de 300 Ko : WhatsApp risque de ne pas afficher d'aperçu`);
}
