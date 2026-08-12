# Session dédiée — La carte de France

Document de préparation. À lire au début de la session consacrée à la carte.

---

## Où on en est

Le reste du site est en place : contrastes, palette, données réelles branchées (9 partenaires,
15 retombées presse), chiffres corrigés, traceurs supprimés, documentation à jour.
**La carte est la dernière grosse pièce.** Elle a été volontairement différée : la faire à
moitié en fin de session aurait été le pire choix.

## Le problème actuel

`components/victory/FranceMap.vue`, dans son état hérité du refactor de février :

| Symptôme | Cause |
|---|---|
| La France ressemble à une patate | Le contour est un `<path>` écrit à la main, ligne 121 — une trentaine de points approximatifs |
| Le tracé ne ressemble à aucune route | Segments droits (`L`) entre 18 points, sans lissage |
| Les libellés se chevauchent | « Verneuil » écrase « Paris », aucune gestion de collision |
| Rien ne fonctionne au doigt | L'interaction repose sur `@mouseenter` — le survol n'existe pas sur mobile |
| Le vélo tourne en boucle dans le vide | `repeat: -1` sur 15 s, sans lien avec la lecture de la page |
| Distances fausses | Les 18 étapes valent toutes « 250km » dans `data/locations.js` (18 × 250 = 4 500 km ≠ 3 000) |

## Ce qu'on a déjà sous la main

- ✅ **`assets/france-geojson-metropole.json`** (151 Ko, MultiPolygon métropole) — le vrai
  contour, déjà dans le repo, jamais utilisé par le refactor.
- ✅ **20 photos d'étapes** dans `public/steps/` (une par ville).
- ✅ **Les 18 étapes avec coordonnées** dans `data/locations.js`.
- ✅ **GSAP + MotionPathPlugin + ScrollTrigger** déjà installés et enregistrés
  (`plugins/gsap.client.js`).
- ✅ Le logo de l'association **est** une silhouette de France verte avec un cycliste —
  une référence visuelle à exploiter.

## Ce qu'on veut

Formulé par le client :

> « Un petit vélo qui part de Verneuil-en-Halatte et qui revient à Verneuil-en-Halatte, qui
> fait le tour de France. On va de point en point, on voit le vélo qui défile, et le fond
> de carte, l'image du fond de carte, qui change. »

Traduit en exigences :

1. **Vrai contour de France**, projection **Lambert-93** (`geoConicConformal`) — c'est la
   projection officielle française, celle qui donne à l'Hexagone sa silhouette correcte.
2. **Tracé lissé en courbes**, qui évoque une route et non une ligne brisée.
3. **Lecture pilotée par le scroll** : le vélo avance à mesure qu'on descend, d'étape en
   étape, en boucle Verneuil → Verneuil.
4. **La photo de fond change à chaque étape** — c'est là que les 20 photos servent.
5. **Fonctionne au doigt** : le scroll règle le problème du survol inexistant sur mobile.
6. **Noms de villes lisibles** : afficher seulement l'étape active plus quelques repères,
   au lieu des 18 simultanément.
7. **Contrastes et couleurs** alignés sur le logo (même vert, même épaisseur de trait).

## À discuter en début de session

1. **Où vit la carte ?** Le client propose une **page de test dédiée** pour itérer sans
   casser la home. À décider : `/carte-test` temporaire supprimée ensuite, ou section
   permanente sur `/notre-aventure` ?

2. **Scroll-jacking ou pas ?** Un tracé piloté par le scroll immobilise la page pendant la
   séquence. C'est spectaculaire mais ça peut agacer. Alternative : la carte occupe une
   section `sticky` d'une hauteur donnée, on la traverse en scrollant normalement.
   *Mon avis : sticky, plus prévisible et plus court à parcourir.*

3. **Techno du rendu.** SVG statique projeté au build (zéro dépendance runtime) ou
   `d3-geo` embarqué (~10 Ko, projection calculée côté client) ? Le client a laissé la
   porte ouverte à un changement de techno.
   *Mon avis : projeter au build et committer le SVG. Cohérent avec ADR-001 — un site qui
   doit tenir des années sans maintenance n'a pas besoin d'une dépendance de plus.*

4. **Les distances réelles des 18 étapes.** Toujours manquantes. Sans elles, on ne peut pas
   afficher un roadbook honnête par étape. Piste : `public/Rouler_pour_aider_dossier.pdf`
   (nécessite `brew install poppler`). Question : affiche-t-on les distances par étape, ou
   seulement le total de 3 000 km ?

5. **Et l'édition 2020 ?** La carte ne montre que le Tour 2024. Or le parcours Lille → Nice
   (1 327 km) est tout aussi racontable, et `public/1ere-edition/map.webp` existe déjà.
   Une carte ou deux ?

6. **Repli sans JavaScript.** Si GSAP ne se charge pas, que voit-on ? Un site mémorial doit
   rester lisible dans dix ans. Prévoir un état statique acceptable — carte + tous les
   points visibles.

## Méthode proposée

1. Projeter le GeoJSON en Lambert-93, générer le path SVG, l'afficher **statique** d'abord.
2. Valider la silhouette avant toute animation. *(Point de contrôle visuel avec le client.)*
3. Placer les 18 étapes, vérifier qu'elles tombent bien sur les bonnes villes.
4. Lisser le tracé, styliser selon le logo.
5. Animer le vélo au scroll, étape par étape.
6. Brancher le changement de photo de fond.
7. Passe mobile, `prefers-reduced-motion`, repli sans JS.

⚠️ **Limite connue de l'outillage** : les captures d'écran via l'extension Chrome se font
en onglet masqué, ce qui gèle GSAP et les transitions CSS (`requestAnimationFrame`
throttlé). La vérification visuelle des animations devra passer par le client, ou par une
mesure DOM plutôt que par capture.
