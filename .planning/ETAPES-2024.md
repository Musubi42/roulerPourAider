# Les 18 étapes du Tour 2024 — source de vérité

Reconstitué le 11 août 2026 à partir des publications Facebook de l'association
(fichier brut : `.planning/etapes`), recoupé avec la presse.

**Les données éditables vivent dans `data/etapes-2024.js`.** On y corrige une
distance, un lien Facebook ou une ville, puis :

```bash
node utils/buildMap.mjs      # régénère data/map-2024.json
```

Ne jamais éditer `data/map-2024.json` à la main : il est écrasé à chaque build.

---

## Le parcours

Une **boucle** : départ et arrivée à **Verneuil-en-Halatte** (Oise), berceau de
l'association. 18 étapes, du **7 au 25 juillet 2024**.

> **Note sur les dates.** Le post de l'étape 1 est daté du **6 juillet** et la
> presse situe l'arrivée le **24**. L'association a pourtant toujours communiqué
> sur « 7–25 juillet », et c'est ce que le site affiche partout. L'écart d'un
> jour n'est pas expliqué et **on ne le corrige pas** : mieux vaut une date
> cohérente sur tout le site qu'une reconstitution à un jour près.

| # | Départ | Arrivée | km | Source | Récit Facebook |
|---|---|---|---|---|---|
| 1 | Verneuil-en-Halatte | Versailles | 105 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid02XRfkZeAd1zLWc9mX1nyTspBxLv2NSGabeWvfp9AwaLMBNx8G4t6fYXY4rpST51nVl) |
| 2 | Versailles | Blois | 178 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid0pYPZj7c9KxkHGjEV7BakDw28XxHY9LgkY7sJefarhbqrSHbdvtU32DMFUVMHQwTgl) |
| 3 | Blois | Poitiers | 175 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid0a5mMApznNqPC8kAu3eQCGv5ifRQvzrmy1B15Cecd3W5Vxf6FmKdMrQ8twTtA42HSl) |
| 4 | Poitiers | Royan | 197 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid035YaKsz5Jz1UG4CqtjVcAHDm7yfT69iDogFiFz9t78Xure3xENdUSCr12VHGufvmFl) |
| 5 | Royan | Mont-de-Marsan | 241 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid02PxDLn1z2Ui6FbaxiuU4bbHWy6wsaDmHsfNdFNpM2uqKNVnJpJL41GHg99Uo3hqTil) |
| 6 | Mont-de-Marsan | Lourdes | 113 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid02TfuPFXE1rB1mYUoHYjqzWziryHVU788imNGRMWcUcUyWTuiXBzSt2XQWBR29dzckl) |
| 7 | Lourdes | Loudenvielle | 83 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid02Yd8GbJYBcumtZRE4eze2NZdb74o6HRM5AwcTjxuKbive8hKtPGJGBnwA5zSqiEnGl) |
| 8 | Loudenvielle | Plateau de Beille | 203 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid0sxc7WxT6KMJeHxfnYZfp2VxeeE1b7GocNDRGAVg2yRZyvZ6gui2hWEoXjnaQ2ppBl) |
| 9 | Plateau de Beille | Béziers | 219 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid02GD9C7t9rruFxvqgw3sSvPHgjZFg2bfBwqemPRVUSSvp2gsgVrVkrCy1MwwnE14fcl) |
| 10 | Béziers | Avignon | 176 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid06aXtYTaogXmDCEZ69WbfYRRFZkuHvXH33f5XkWQdMquo9dZR6asAYeSo2Ji62VYgl) |
| 11 | Avignon | Sisteron | **≈ 165** | estimé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid035HcWzz35xUBaLjyCKPSgfS4nyoxVxBK65Lcso2GCSM4TvNuvFnvdRXiaA6ySHCTXl) |
| 12 | Sisteron | Barcelonnette | **≈ 105** | estimé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid0ofAokpzk5ho5UZbbwq11LhWp4piFeXjxnx8JvpNzuRVeiZCRqJ5tuHTuvYY3hZeHl) |
| 13 | Barcelonnette | Saint-Jean-de-Maurienne | 124 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid0bjemGmeuVFUtv8QEpuLaaWuBmuJmtGK2c4BK5PRGiDX7PXbuMinZ6m5mB1xciVs9l) |
| 14 | Saint-Jean-de-Maurienne | Annecy | **≈ 125** | estimé | *introuvable* |
| 15 | Annecy | Lons-le-Saunier | 142 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid0gNds7wZp4WwaxYQGY468HvfNk65BUQepuy7rLnXVbhDgDxTt4svD6a5Hjk5sHUGhl) |
| 16 | Lons-le-Saunier | Chaumont | 191 | annoncé | [lien](https://www.facebook.com/roulerpouraider/posts/pfbid037ZRt3c14W46ruAYfxX9QSUG8XCJkyh3oqJ6PH4mGAPXUikGQmjBXdCVztFJkpvLql) |
| 17 | Chaumont | Reims | **≈ 265** | estimé | *introuvable* |
| 18 | Reims | Verneuil-en-Halatte | **≈ 193** | estimé | *introuvable* |

**Total : 3 000 km.** 13 étapes sur 18 ont un kilométrage publié par
l'association (2 147 km cumulés).

---

## Comment les 5 distances manquantes sont calculées

L'association n'a jamais publié le kilométrage de ces cinq étapes. On ne les
invente pas au hasard : on connaît le **total (3 000 km)** et **13 valeurs
réelles**, donc le reliquat de 853 km revient nécessairement aux cinq autres. Il
est réparti au prorata de la distance à vol d'oiseau.

Ces valeurs portent `estime: true` dans `data/map-2024.json` et s'affichent
précédées d'un **« ≈ »**. Elles ne doivent jamais être présentées comme sourcées
(cf. ADR-012).

**Repère de plausibilité.** Sur les 13 étapes réelles, le rapport
route/vol d'oiseau vaut **1,352**. Le reliquat impose **1,750** aux cinq
estimées, ce qui est nettement plus haut. Deux lectures : soit les 3 000 km sont
un chiffre rond arrondi vers le haut, soit ces étapes comportaient de vrais
détours — c'est plausible pour l'étape 11 (ascension du Mont Ventoux) et 12
(cols alpins), beaucoup moins pour l'étape 17.

⚠️ **L'étape 17 (Chaumont → Reims) ressort à 265 km, alors que la route directe
en fait environ 175.** C'est la valeur la plus douteuse du tableau. Si un jour on
retrouve son kilométrage réel, c'est celle-là qu'il faut corriger en priorité.

---

## Ce qui reste à retrouver

Trois publications Facebook n'ont pas été localisées : **étapes 14, 17 et 18**.
Les récupérer donnerait à la fois le lien et, probablement, le kilométrage réel.

**Comment procéder.** Le fil de la page `facebook.com/roulerpouraider` est
inaccessible sans compte connecté, mais **un permalien de publication s'ouvre
publiquement**. Il suffit donc de récupérer les URL depuis un compte connecté :
le contenu redevient ensuite lisible sans authentification. Dates approximatives
à viser : étape 14 vers le 20 juillet, étapes 17 et 18 vers les 23 et 24 juillet.

**Où coller le lien.** Dans `data/etapes-2024.js`, sur l'entrée concernée —
elles portent un commentaire `⬅ POST À RETROUVER`. On ne met que la partie
**après** `/posts/`, pas l'URL entière :

```js
{
  slug: 'chaumont',
  ville: 'Chaumont',
  vers: 'Reims',
  ...
  km: null,          // ← si le post donne le kilométrage, le mettre ici
  fb: 'pfbid0XXXXXX' // ← seulement l'identifiant, pas l'URL complète
},
```

Puis `node utils/buildMap.mjs`. Renseigner un `km` bascule automatiquement
l'étape de « estimée » à « sourcée » : le « ≈ » disparaît, et le reliquat est
redistribué sur les étapes encore estimées pour que le total reste à 3 000 km.

---

## Points de vigilance sur les données

**La numérotation de l'association dérape à partir de l'étape 14.** Deux
publications portent le numéro 14 : « Étape 14 en chanson entre
Saint-Jean-de-Maurienne et Annecy » et « Étape 14 : Annecy → Lons-le-Saunier =
142 km ». Ce sont bien deux étapes distinctes. À partir de là, la numérotation
publiée est décalée d'une unité : leur « étape 15 : Lons-le-Saunier → Chaumont »
est en réalité la 16e. **La numérotation de ce tableau est la bonne** — elle
donne 18 étapes, ce que confirment l'association (« après 18 jours ») et la
presse.

**Le roadbook prévisionnel n'est pas le parcours réel.** L'annonce d'avril 2024
prévoyait un départ et une arrivée à l'Hôpital Necker, avec une dernière étape
Verneuil-en-Halatte → Paris. C'est ce plan qu'avait figé l'ancien
`data/locations.js` (d'où son étape 18 « Verneuil-en-Halatte > Paris »). Dans les
faits, l'étape 1 est partie de Verneuil-en-Halatte en passant par l'Hôtel de
Ville de Paris et l'Hôpital Necker, et le tour s'est **achevé à
Verneuil-en-Halatte le 24 juillet**. Ne pas « corriger » les données en
réintroduisant Paris comme ville-étape.

**Paris et Soissons ne sont pas des villes-étapes**, seulement des points de
passage : Paris pendant l'étape 1, Soissons pendant l'étape 18.

**Les chiffres de l'association sont approximatifs à ±5 %.** Le récit de l'étape
5 annonce « 850 kilomètres parcourus » depuis Verneuil, alors que la somme de ses
propres étapes 1 à 5 donne 896 km. Le « 3 000 km » est un ordre de grandeur
assumé, pas une mesure.

**Montants.** Le dernier récit publié à l'arrivée annonce « plus de 58 000 € »
puis « 60 000 mercis ». Ce ne sont pas les chiffres finaux : les dons ont
continué après l'arrivée. Le montant retenu reste **70 458 €** pour 2024
(cf. ADR-011).

---

## Photos d'étape

Le repo stocke `public/steps/<slug>.webp`, un fichier par ville de départ. Mais
**on ne renomme rien à la main** : on dépose les photos numérotées par étape dans
un dossier quelconque et le script s'occupe du reste.

```bash
node utils/importSteps.mjs ~/Desktop/photos-rpa --dry   # simulation
node utils/importSteps.mjs ~/Desktop/photos-rpa         # pour de vrai
```

Le nom du fichier source doit **commencer par le numéro de l'étape** (1 à 18).
Le reste est libre, l'extension aussi (jpg, png, tif, webp…) :

```
1.jpg          02-versailles.png     3 - blois.jpeg     18-arrivee.jpg
```

Le script convertit en webp 1600×1350 (le ratio du cadre de la carte), recadre
autour de la zone saillante, applique l'orientation EXIF, et sort ~100 Ko par
photo. Il liste les étapes sans photo et les fichiers qu'il n'a pas su rattacher.

**Pourquoi des slugs dans le repo et des numéros à l'import ?** Une
renumérotation des étapes — il y en a déjà eu une, à l'insertion de Versailles —
décalerait silencieusement toutes les photos si elles étaient stockées par
numéro. Le slug, lui, dit quelle ville il montre.

### État actuel

**Photos génériques** issues de banques d'images, à remplacer par celles de
l'association.

- ❌ `versailles.webp` **manquante** — Versailles est une ville-étape depuis
  cette révision. En son absence, la carte conserve la photo précédente plutôt
  que d'afficher un trou.
- 🗑️ `paris.webp` et `verneuil.webp` ne sont plus utilisées.

### Ce qui rend une photo bonne ici

La photo passe en **duotone navy**, clippée dans la silhouette de la France,
sous un voile, dans un cadre **paysage** (ratio 1,185).

- **Plans larges** : route, col, peloton, panneau d'entrée de ville. Un gros plan
  de visage devient une tache grise une fois désaturé.
- **Éviter le portrait** : rogné de plus de moitié. Le script signale les sources
  verticales par un ⚠ pour qu'on vérifie le cadrage à l'œil.
- Préférer les **originaux** aux versions retéléchargées depuis Facebook, qui
  recompresse assez fort — ça se voit en niveaux de gris.
