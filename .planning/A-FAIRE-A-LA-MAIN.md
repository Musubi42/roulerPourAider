# Ce que le code ne peut pas faire tout seul

Liste des points qui demandent une information, une décision ou un fichier que
seul un humain peut fournir. Mise à jour le 11 août 2026.

---

## 1. Trois publications Facebook manquantes

Les étapes **14, 17 et 18** n'ont ni lien ni kilométrage publié. Le fil de la
page `facebook.com/roulerpouraider` est inaccessible sans compte connecté, mais
**un permalien de publication s'ouvre publiquement** : il suffit de récupérer
les URL depuis un compte connecté.

| Étape | Trajet | À viser |
|---|---|---|
| 14 | Saint-Jean-de-Maurienne → Annecy | vers le 20 juillet 2024 |
| 17 | Chaumont → Reims | vers le 23 juillet 2024 |
| 18 | Reims → Verneuil-en-Halatte | vers le 24 juillet 2024 |

**Où le coller** : `data/etapes-2024.js`, sur les entrées portant le commentaire
`⬅ POST À RETROUVER`. Seulement l'identifiant, pas l'URL entière :

```js
km: null,           // ← le kilométrage si le post le donne
fb: 'pfbid0XXXXX'   // ← juste la partie après /posts/
```

Puis `node utils/buildMap.mjs`. Renseigner un `km` fait basculer l'étape
d'« estimée » à « sourcée » : le « ≈ » disparaît et le reliquat est redistribué
pour que le total reste à 3 000 km.

⚠️ Priorité à l'**étape 17** : son estimation ressort à 265 km alors que la
route directe Chaumont → Reims en fait environ 175. C'est la valeur la moins
plausible du tableau. Détail dans `.planning/ETAPES-2024.md`.

---

## 2. Numéro RNA de l'association

`pages/mentions-legales.vue` porte un `[à compléter]`. Le numéro RNA (format
`W60xxxxxxx`) figure sur le récépissé de déclaration en préfecture, et se
retrouve sur <https://www.journal-officiel.gouv.fr/associations/recherche/>.

Le reste des mentions légales est rédigé et conforme : éditeur, siège,
direction de la publication, hébergeur, propriété intellectuelle, données
personnelles, liens externes, dons. Aucune coordonnée personnelle n'y figure
(ADR-009).

---

## 3. Faire relire les textes juridiques

`pages/mentions-legales.vue` et `pages/cookies.vue` ont été rédigés sur la base
de ce que fait réellement le site (aucun traceur, aucun formulaire, aucun
paiement). Ce sont des textes standards d'association loi 1901, mais une
relecture par quelqu'un de l'association reste souhaitable — notamment sur la
formulation relative au reversement des dons.

---

## 4. Deux PDF de 4,6 et 4,3 Mo

`public/Rouler_pour_aider_dossier.pdf` et son voisin ne sont référencés nulle
part dans le code. Ils sont donc téléchargés par personne, mais ils partent
quand même dans chaque déploiement.

Ils n'ont **pas** été archivés automatiquement, parce qu'une URL directe a pu
être communiquée à des partenaires ou à la presse : les supprimer casserait ce
lien silencieusement. À arbitrer.

---

## 5. Les originaux archivés

`node utils/auditAssets.mjs --archive` a déplacé **43 fichiers, 37,5 Mo** de
`public/` vers `archives/`. Ils restent versionnés sur GitHub mais ne partent
plus dans le build : le déploiement est passé de **71 Mo à 24 Mo**.

Parmi eux, les masters JPEG des photos de l'hôpital Necker (`fresque.jpeg`
11 Mo, `image00060.jpeg` 10 Mo, `fauteuil-lit.jpeg` 9,8 Mo), dont les versions
`.webp` utilisées par le site restent en place.

`node utils/auditAssets.mjs --restore` remet tout dans `public/` si besoin.
À décider : garder cet historique dans le dépôt, ou l'externaliser.

---

## 6. Les photos d'étape

Les 18 photos fournies sont en place (`node utils/importSteps.mjs <dossier>`).
Les originaux JPEG ne sont **pas** dans le dépôt — garder une copie de son côté
pour pouvoir réimporter avec d'autres réglages.

---

## 7. Vérifications que l'outillage ne permet pas

Trois choses n'ont pas pu être validées en automatique et demandent un coup
d'œil humain :

- **Le rendu mobile réel.** Le redimensionnement de fenêtre échoue dans
  l'outillage. La carte a été mesurée par calcul et vérifiée à 500 px de large,
  mais pas sur un vrai téléphone.
- **Les animations.** Toutes les révélations au scroll passent par GSAP, donc
  par `requestAnimationFrame`, qui est mis en pause dans un onglet en arrière-
  plan. Aucune capture automatique ne peut les montrer. Vérifié : le
  comportement est identique avant et après le passage au prérendu — ce n'est
  pas une régression.
- **La performance réelle.** En local, `/_vercel/image` renvoie 404 : le
  provider d'images de Vercel n'existe que sur Vercel. Le LCP et le CLS mesurés
  localement sont donc faussés. Pour des chiffres justes :
  `node utils/audit.mjs --url https://xxx.vercel.app` sur une préproduction.

---

## 8. Décision en suspens : la carte sur la page d'accueil

`components/victory/TourMap.vue` n'est pour l'instant monté que sur
`/carte-test`. La page d'accueil affiche toujours l'ancien
`components/victory/FranceMap.vue`.

Une fois la nouvelle carte validée, la bascule consiste à remplacer
`<VictoryFranceMap />` par `<VictoryTourMap />` dans `pages/index.vue`, puis à
supprimer `FranceMap.vue` et `pages/carte-test.vue`.

⚠️ `FranceMap.vue` est encore le seul utilisateur de `MotionPathPlugin`. Le
supprimer permettra de retirer ce plugin de `plugins/gsap.client.js`, soit
~10 Ko gzip de moins sur le chemin critique.
