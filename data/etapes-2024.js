/**
 * Les 18 étapes du Tour de France 2024 de Rouler pour aider.
 *
 * ── C'EST ICI QU'ON ÉDITE ────────────────────────────────────────────────
 * Ce fichier est la source de vérité du parcours. Après toute modification :
 *
 *     node utils/buildMap.mjs
 *
 * qui régénère `data/map-2024.json` (projection, tracé, distances, cumuls).
 * Ne jamais éditer `map-2024.json` à la main : il est écrasé à chaque build.
 *
 * Contexte, sources et pièges : `.planning/ETAPES-2024.md`
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le tour est une BOUCLE : la 18e étape ramène à Verneuil-en-Halatte, d'où
 * part la 1re. `latLng` est donc toujours la ville de DÉPART de l'étape.
 *
 * Champs :
 *   slug   nom du fichier photo dans public/steps/<slug>.webp
 *   km     distance annoncée par l'association. `null` = aucune source,
 *          la valeur sera estimée au build et affichée avec un « ≈ ».
 *   fb     identifiant du post Facebook (la partie après /posts/).
 *          `null` = post non retrouvé.
 *   label  côté où poser l'étiquette sur la carte : left | right | bottom
 *
 *   cadrage  Où placer la photo derrière la silhouette de la France, quand le
 *            cadrage par défaut tombe mal (un poteau au centre, un panneau
 *            coupé par la Bretagne). Absent = photo centrée, ce qui convient à
 *            la plupart. `{ zoom, x, y }` :
 *
 *              zoom  1 = la photo couvre juste la silhouette. 1.2 = +20 %.
 *              x, y  décalage, en fraction de la silhouette. Positif = la photo
 *                    descend / part à droite, donc on voit plus HAUT / plus à
 *                    GAUCHE dedans.
 *
 *            Au-delà de ±((zoom−1)/2 + 3 %), le décalage découvre le fond vert
 *            aux extrémités du contour. Les 3 % sont le PADDING que `buildMap`
 *            laisse autour de la silhouette : ils offrent un peu de course même
 *            à `zoom: 1`, mais guère plus. Pour décaler franchement, il faut
 *            zoomer.
 *
 *            Les valeurs valent pour les deux affichages : la photo est calée
 *            sur la silhouette (`viewBoxTight`), pas sur la fenêtre de la carte,
 *            qui elle s'élargit sur grand écran pour loger les étiquettes.
 *
 * ── RÉGLER UN CADRAGE, DANS LE NAVIGATEUR ────────────────────────────────
 * Se régler à l'œil, sur la carte de l'accueil, plutôt qu'à l'aveugle ici.
 * Ouvrir la console sur `/`, coller une fois :
 *
 *   window.carte = (zoom = 1, dx = 0, dy = 0) => {
 *     const S = { x: 6.81, y: 0, w: 786.38, h: 800 };   // la silhouette
 *     const width = S.w * zoom, height = S.h * zoom;
 *     const r = {
 *       x: S.x - (width - S.w) / 2 + dx * S.w,
 *       y: S.y - (height - S.h) / 2 + dy * S.h,
 *       width, height,
 *     };
 *     document.querySelectorAll('.tourmap-photo').forEach(img =>
 *       Object.entries(r).forEach(([k, v]) => img.setAttribute(k, v)));
 *     const marge = ((zoom - 1) / 2 * 100 + 3).toFixed(1);
 *     console.log(`cadrage: { zoom: ${zoom}, x: ${dx}, y: ${dy} },   // marge ±${marge}%`);
 *   };
 *
 * puis, arrêté sur l'étape à régler : `carte(1.15, 0.1, 0)`. La console recrache
 * la ligne à recopier ici. Deux pièges : dès qu'on scrolle vers une autre étape,
 * Vue redessine et efface les attributs posés à la main ; et l'outil ne vérifie
 * PAS que le contour reste couvert. Après recopie, faire tourner
 * `node utils/buildMap.mjs`, qui lui le vérifie et refuse les cadrages qui
 * laissent apparaître le fond.
 */
export const etapes2024 = [
  {
    slug: 'verneuil-en-halatte',
    cadrage: { zoom: 1.15, x: -0.07, y: 0.1 },
    ville: 'Verneuil-en-Halatte',
    vers: 'Versailles',
    latLng: [49.2833, 2.5167],
    label: 'left',
    km: 105,
    fb: 'pfbid02XRfkZeAd1zLWc9mX1nyTspBxLv2NSGabeWvfp9AwaLMBNx8G4t6fYXY4rpST51nVl',
  },
  {
    slug: 'versailles',
    cadrage: { zoom: 1.45, x: -0.07, y: -0.05 },
    ville: 'Versailles',
    vers: 'Blois',
    latLng: [48.8014, 2.1301],
    label: 'left',
    km: 178,
    fb: 'pfbid0pYPZj7c9KxkHGjEV7BakDw28XxHY9LgkY7sJefarhbqrSHbdvtU32DMFUVMHQwTgl',
  },
  {
    slug: 'blois',
    ville: 'Blois',
    vers: 'Poitiers',
    latLng: [47.5939, 1.3281],
    label: 'left',
    km: 175,
    fb: 'pfbid0a5mMApznNqPC8kAu3eQCGv5ifRQvzrmy1B15Cecd3W5Vxf6FmKdMrQ8twTtA42HSl',
  },
  {
    slug: 'poitiers',
    cadrage: { zoom: 1.15, x: 0.1, y: 0 },
    ville: 'Poitiers',
    vers: 'Royan',
    latLng: [46.5802, 0.3404],
    label: 'left',
    km: 197,
    fb: 'pfbid035YaKsz5Jz1UG4CqtjVcAHDm7yfT69iDogFiFz9t78Xure3xENdUSCr12VHGufvmFl',
  },
  {
    slug: 'royan',
    cadrage: { zoom: 1.45, x: 0.08, y: -0.02 },
    ville: 'Royan',
    vers: 'Mont-de-Marsan',
    latLng: [45.628, -1.0281],
    label: 'left',
    km: 241,
    fb: 'pfbid02PxDLn1z2Ui6FbaxiuU4bbHWy6wsaDmHsfNdFNpM2uqKNVnJpJL41GHg99Uo3hqTil',
  },
  {
    slug: 'mont-de-marsan',
    ville: 'Mont-de-Marsan',
    vers: 'Lourdes',
    latLng: [43.891, -0.4979],
    label: 'left',
    km: 113,
    fb: 'pfbid02TfuPFXE1rB1mYUoHYjqzWziryHVU788imNGRMWcUcUyWTuiXBzSt2XQWBR29dzckl',
  },
  {
    slug: 'lourdes',
    ville: 'Lourdes',
    vers: 'Loudenvielle',
    latLng: [43.0977, -0.0457],
    label: 'left',
    km: 83,
    fb: 'pfbid02Yd8GbJYBcumtZRE4eze2NZdb74o6HRM5AwcTjxuKbive8hKtPGJGBnwA5zSqiEnGl',
  },
  {
    slug: 'loudenvielle',
    cadrage: { zoom: 1.45, x: -0.08, y: 0.05 },
    ville: 'Loudenvielle',
    vers: 'Plateau de Beille',
    latLng: [42.7957, 0.4122],
    label: 'left',
    km: 203,
    fb: 'pfbid0sxc7WxT6KMJeHxfnYZfp2VxeeE1b7GocNDRGAVg2yRZyvZ6gui2hWEoXjnaQ2ppBl',
  },
  {
    slug: 'plateau-de-beille',
    cadrage: { zoom: 1.17, x: -0.08, y: 0.11 },
    ville: 'Plateau de Beille',
    vers: 'Béziers',
    latLng: [42.7219, 1.6879],
    label: 'bottom',
    km: 219,
    fb: 'pfbid02GD9C7t9rruFxvqgw3sSvPHgjZFg2bfBwqemPRVUSSvp2gsgVrVkrCy1MwwnE14fcl',
  },
  {
    slug: 'beziers',
    ville: 'Béziers',
    vers: 'Avignon',
    latLng: [43.3442, 3.2158],
    label: 'bottom',
    km: 176,
    fb: 'pfbid06aXtYTaogXmDCEZ69WbfYRRFZkuHvXH33f5XkWQdMquo9dZR6asAYeSo2Ji62VYgl',
  },
  {
    // Ascension du Mont Ventoux. Le post ne donne pas de kilométrage.
    slug: 'avignon',
    ville: 'Avignon',
    vers: 'Sisteron',
    latLng: [43.9493, 4.8055],
    label: 'right',
    km: null,
    fb: 'pfbid035HcWzz35xUBaLjyCKPSgfS4nyoxVxBK65Lcso2GCSM4TvNuvFnvdRXiaA6ySHCTXl',
  },
  {
    // Étape suivie par France Télévisions. Le post ne donne pas de kilométrage.
    slug: 'sisteron',
    cadrage: { zoom: 1.05, x: -0.05, y: 0 },
    ville: 'Sisteron',
    vers: 'Barcelonnette',
    latLng: [44.1985, 5.9396],
    label: 'right',
    km: null,
    fb: 'pfbid0ofAokpzk5ho5UZbbwq11LhWp4piFeXjxnx8JvpNzuRVeiZCRqJ5tuHTuvYY3hZeHl',
  },
  {
    slug: 'barcelonnette',
    cadrage: { zoom: 1, x: 0.02, y: 0 },
    ville: 'Barcelonnette',
    vers: 'Saint-Jean-de-Maurienne',
    latLng: [44.3863, 6.6505],
    label: 'right',
    km: 124,
    fb: 'pfbid0bjemGmeuVFUtv8QEpuLaaWuBmuJmtGK2c4BK5PRGiDX7PXbuMinZ6m5mB1xciVs9l',
  },
  {
    // ⬅ POST À RETROUVER. L'étape « en chanson » : elle est décrite dans les
    // publications, mais sans kilométrage ni permalien identifié.
    slug: 'st-jean-de-maurienne',
    cadrage: { zoom: 1.1, x: -0.02, y: -0.08 },
    ville: 'Saint-Jean-de-Maurienne',
    vers: 'Annecy',
    latLng: [45.2754, 6.3449],
    // `bottom` et non `right` : c'est le nom le plus long du parcours, et posé
    // à droite d'un point déjà très à l'est il sortait du cadre. Centré sous
    // son point, il tient.
    label: 'bottom',
    km: null,
    fb: null,
  },
  {
    slug: 'annecy',
    ville: 'Annecy',
    vers: 'Lons-le-Saunier',
    latLng: [45.8992, 6.1294],
    label: 'right',
    km: 142,
    fb: 'pfbid0gNds7wZp4WwaxYQGY468HvfNk65BUQepuy7rLnXVbhDgDxTt4svD6a5Hjk5sHUGhl',
  },
  {
    slug: 'lons-le-saunier',
    cadrage: { zoom: 1.1, x: 0.04, y: 0.08 },
    ville: 'Lons-le-Saunier',
    vers: 'Chaumont',
    latLng: [46.6714, 5.5508],
    label: 'right',
    km: 191,
    fb: 'pfbid037ZRt3c14W46ruAYfxX9QSUG8XCJkyh3oqJ6PH4mGAPXUikGQmjBXdCVztFJkpvLql',
  },
  {
    // ⬅ POST À RETROUVER. Aucun kilométrage publié : la distance est estimée.
    slug: 'chaumont',
    ville: 'Chaumont',
    vers: 'Reims',
    latLng: [48.112, 5.139],
    label: 'right',
    km: null,
    fb: null,
  },
  {
    // ⬅ POST À RETROUVER. Dernière étape, passée par Soissons.
    // Arrivée à Verneuil-en-Halatte le 24 juillet 2024.
    slug: 'reims',
    cadrage: { zoom: 1.15, x: 0, y: 0.1 },
    ville: 'Reims',
    vers: 'Verneuil-en-Halatte',
    latLng: [49.2583, 4.0317],
    label: 'right',
    km: null,
    fb: null,
  },
];

/** Kilométrage annoncé par l'association dans toute sa communication. */
export const KM_ANNONCE = 3000;

/** Préfixe des permaliens de publication de la page Facebook. */
export const FB_BASE = 'https://www.facebook.com/roulerpouraider/posts/';
