/**
 * Projette le contour de la France métropolitaine et les 18 étapes du Tour 2024
 * en Lambert-93, et écrit le tout dans data/map-2024.json.
 *
 * Ce script tourne au build (ou à la main), jamais dans le navigateur : le site
 * n'embarque donc aucune dépendance carto à l'exécution (cf. ADR-001).
 *
 *   node utils/buildMap.mjs
 *
 * Tout ce qui est projeté ici — contour, points d'étape, tracé lissé — passe par
 * la MÊME projection. C'est la condition pour que les villes tombent au bon endroit.
 *
 * Le parcours lui-même (villes, distances, liens Facebook) vit dans
 * `data/etapes-2024.js` — c'est là qu'on l'édite, pas ici.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { geoConicConformal, geoPath } from 'd3-geo';
import { etapes2024 as etapesSource, KM_ANNONCE, FB_BASE } from '../data/etapes-2024.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const WIDTH = 800;
const HEIGHT = 800;
const PADDING = 24;
/** Réserve horizontale pour les étiquettes de villes, en unités de viewBox. */
const LABEL_ROOM = 130;

/** Distance à vol d'oiseau entre deux points, en km. */
function haversine([lat1, lon1], [lat2, lon2]) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/**
 * Découpe une suite de points en segments de Bézier cubique (Catmull-Rom).
 * C'est ce qui donne au tracé son allure de route plutôt que de ligne brisée.
 * Chaque segment relie exactement deux villes consécutives.
 */
function catmullRom(points, tension = 0.9) {
  const at = (i) => points[Math.max(0, Math.min(points.length - 1, i))];
  const segments = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    segments.push({
      depart: p1,
      c1: [p1[0] + ((p2[0] - p0[0]) / 6) * tension, p1[1] + ((p2[1] - p0[1]) / 6) * tension],
      c2: [p2[0] - ((p3[0] - p1[0]) / 6) * tension, p2[1] - ((p3[1] - p1[1]) / 6) * tension],
      arrivee: p2,
    });
  }
  return segments;
}

function pathDepuisSegments(segments) {
  if (!segments.length) return '';
  const f = (n) => n.toFixed(2);
  let d = `M${f(segments[0].depart[0])},${f(segments[0].depart[1])}`;
  for (const s of segments) {
    d += ` C${f(s.c1[0])},${f(s.c1[1])} ${f(s.c2[0])},${f(s.c2[1])} ${f(s.arrivee[0])},${f(s.arrivee[1])}`;
  }
  return d;
}

/**
 * Longueur d'arc d'un segment de Bézier cubique, par échantillonnage.
 *
 * Le composant a besoin de savoir à quelle fraction du tracé se trouve chaque
 * ville, pour que le vélo passe par les villes au bon moment du scroll. Il le
 * calculait au montage, dans le navigateur, à coups de ~51 000 appels à
 * `getPointAtLength()` — 150 à 600 ms de blocage du thread principal sur un
 * mobile. Or la géométrie ne bouge jamais (ADR-001) : elle se calcule ici, une
 * fois pour toutes.
 */
function longueurBezier({ depart, c1, c2, arrivee }, echantillons = 400) {
  const point = (t) => {
    const u = 1 - t;
    return [
      u * u * u * depart[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * arrivee[0],
      u * u * u * depart[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * arrivee[1],
    ];
  };
  let total = 0;
  let precedent = point(0);
  for (let i = 1; i <= echantillons; i++) {
    const courant = point(i / echantillons);
    total += Math.hypot(courant[0] - precedent[0], courant[1] - precedent[1]);
    precedent = courant;
  }
  return total;
}

// --- Projection --------------------------------------------------------------
const geojson = JSON.parse(
  readFileSync(resolve(root, 'assets/france-geojson-metropole.json'), 'utf8')
);

// Lambert-93 : parallèles 44°/49°, méridien d'origine 3°E, latitude d'origine 46.5°N.
const projection = geoConicConformal()
  .parallels([44, 49])
  .rotate([-3, 0])
  .center([0, 46.5])
  .fitExtent(
    [
      [PADDING, PADDING],
      [WIDTH - PADDING, HEIGHT - PADDING],
    ],
    geojson
  );

const pathGen = geoPath(projection);
const outline = pathGen(geojson);
const [[x0, y0], [x1, y1]] = pathGen.bounds(geojson);

// viewBox serrée sur le contour, plus une réserve horizontale pour les
// étiquettes de villes : sans elle, « Barcelonnette » et « Mont-de-Marsan »
// sortent du cadre et se font couper.
const viewBox = {
  x: +(x0 - LABEL_ROOM).toFixed(2),
  y: +(y0 - PADDING).toFixed(2),
  width: +(x1 - x0 + LABEL_ROOM * 2).toFixed(2),
  height: +(y1 - y0 + PADDING * 2).toFixed(2),
};

// Cadrage serré, sans réserve d'étiquettes : utilisé en dessous de `lg`, où
// les étiquettes sont masquées (illisibles à cette échelle, et redondantes
// avec la fiche d'étape affichée juste en dessous de la carte). La France y
// occupe toute la largeur disponible au lieu des trois quarts.
const viewBoxTight = {
  x: +(x0 - PADDING).toFixed(2),
  y: +(y0 - PADDING).toFixed(2),
  width: +(x1 - x0 + PADDING * 2).toFixed(2),
  height: +(y1 - y0 + PADDING * 2).toFixed(2),
};

// --- Distances ---------------------------------------------------------------
// 13 étapes sur 18 ont un kilométrage annoncé par l'association. Pour les 5
// autres, on l'ESTIME : on calibre un facteur route/vol d'oiseau sur les 13
// étapes connues, puis on l'applique aux 5 manquantes. Ces valeurs sont
// marquées `estime: true` et affichées avec un « ≈ » — jamais confondues avec
// une donnée sourcée (cf. ADR-012).
const legCrow = etapesSource.map((e, i) =>
  haversine(e.latLng, etapesSource[(i + 1) % etapesSource.length].latLng)
);

const connues = etapesSource
  .map((e, i) => ({ km: e.km, crow: legCrow[i] }))
  .filter((l) => l.km !== null);

// Facteur route/vol d'oiseau calibré sur les 13 étapes réelles. Sert de
// repère de plausibilité, et non de méthode d'estimation finale.
const roadFactor =
  connues.reduce((a, l) => a + l.km, 0) / connues.reduce((a, l) => a + l.crow, 0);

// Le reliquat entre le total annoncé (3 000 km) et la somme des 13 étapes
// sourcées revient forcément aux 5 étapes manquantes. On le répartit au prorata
// du vol d'oiseau : c'est la meilleure information disponible, puisqu'elle
// combine une contrainte réelle (le total) et la géométrie du parcours.
const kmConnus = connues.reduce((a, l) => a + l.km, 0);
const crowManquantes = etapesSource.reduce(
  (a, e, i) => a + (e.km === null ? legCrow[i] : 0),
  0
);
const reliquatFactor = (KM_ANNONCE - kmConnus) / crowManquantes;

const distances = etapesSource.map((e, i) =>
  e.km !== null ? e.km : Math.round((legCrow[i] * reliquatFactor) / 5) * 5
);

// L'arrondi à 5 km laisse quelques kilomètres d'écart. On les reporte sur la
// dernière étape estimée pour que le compteur atteigne exactement le total
// annoncé — un compteur qui s'arrête à 2 997 km se lirait comme un échec.
const derniereEstimee = etapesSource.reduce((last, e, i) => (e.km === null ? i : last), -1);
if (derniereEstimee >= 0) {
  distances[derniereEstimee] += KM_ANNONCE - distances.reduce((a, b) => a + b, 0);
}

// --- Assemblage --------------------------------------------------------------
// 19 points pour le tracé : les 18 villes de départ, puis retour à Verneuil.
const points = [...etapesSource, etapesSource[0]].map((e) => {
  const [x, y] = projection([e.latLng[1], e.latLng[0]]);
  return [+x.toFixed(2), +y.toFixed(2)];
});

let cumul = 0;
const etapes = etapesSource.map((e, i) => {
  const cumulKm = cumul;
  cumul += distances[i];
  return {
    numero: i + 1,
    slug: e.slug,
    ville: e.ville,
    arriveeVers: e.vers,
    label: e.label,
    x: points[i][0],
    y: points[i][1],
    photo: `/steps/${e.slug}.webp`,
    distanceKm: distances[i],
    estime: e.km === null,
    cumulKm,
    fbUrl: e.fb ? FB_BASE + e.fb : null,
  };
});

const totalKm = cumul;

// Position de chaque ville le long du tracé, en fraction de la longueur totale.
// 19 valeurs : les 18 départs, plus le retour à Verneuil (donc 0 et 1 aux
// extrémités). Exprimé en fraction et non en unités absolues pour rester juste
// quelle que soit la mesure que le navigateur fera de son côté.
const segments = catmullRom(points);
const longueurs = segments.map((s) => longueurBezier(s));
const longueurTotale = longueurs.reduce((a, b) => a + b, 0);

let parcouru = 0;
const stageProgress = [0];
for (const l of longueurs) {
  parcouru += l;
  stageProgress.push(+(parcouru / longueurTotale).toFixed(6));
}
stageProgress[stageProgress.length - 1] = 1;

const output = {
  _generated: 'Fichier généré par utils/buildMap.mjs — ne pas éditer à la main.',
  _source: '.planning/ETAPES-2024.md',
  projection: 'Lambert-93 (geoConicConformal, parallèles 44/49, origine 3°E 46.5°N)',
  viewBox,
  viewBoxTight,
  outline,
  route: pathDepuisSegments(segments),
  stageProgress,
  totalKm,
  kmAnnonce: KM_ANNONCE,
  etapes,
};

writeFileSync(resolve(root, 'data/map-2024.json'), JSON.stringify(output, null, 2) + '\n');

console.log(`✓ data/map-2024.json — viewBox ${viewBox.width}×${viewBox.height} · serré ${viewBoxTight.width}×${viewBoxTight.height}`);
console.log(`  ${etapes.length} étapes · ${connues.length} distances sourcées, ${etapes.length - connues.length} estimées`);
console.log(`  facteur calibré sur les 13 étapes réelles : ${roadFactor.toFixed(3)}`);
console.log(`  facteur appliqué aux 5 estimées (reliquat/3 000) : ${reliquatFactor.toFixed(3)}`);
console.log(`  total ${totalKm} km · annoncé ${KM_ANNONCE} km · écart ${totalKm - KM_ANNONCE} km`);
console.log(`  positions des villes le long du tracé : ${stageProgress.length} fractions précalculées`);
console.log(`  liens Facebook : ${etapes.filter((e) => e.fbUrl).length}/${etapes.length}`);
