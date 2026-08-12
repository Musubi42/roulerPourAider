# Rouler pour aider — Refonte de clôture (2026)

> Document de travail. On y pose la structure, le storytelling, les données et leurs sources.
> Statut : **en discussion** — rien n'est figé.

---

## 1. Le cadrage

### Ce qu'on fait
On transforme un site de campagne (qui appelait au don, en temps réel) en **mémorial de projet** : un site figé, au passé, qui documente ce qui a été accompli.

### Pourquoi
Trois audiences, dans cet ordre de priorité :

1. **Vitrine / portfolio pour Hugo, Milan et le développeur.** C'est l'objectif n°1. Le site doit donner envie de bosser avec eux. Il doit être beau, rapide, crédible, et donner à voir la compétence — associative pour eux, technique pour le dev.
2. **Redevabilité envers les 605 donateurs.** Ils ont donné, ils ont droit à un bilan clair de ce que leur argent a financé.
3. **Trace publique** pour la presse, les partenaires, l'hôpital.

### Contraintes de durée de vie
Le site doit tenir **plusieurs années sans maintenance**. Ce qui implique :

- ❌ Zéro dépendance à un service externe vivant (l'API de dons est déjà morte — c'est la preuve par l'exemple)
- ❌ Zéro compteur relatif au temps ("jours restants", "il y a X mois")
- ❌ Zéro date future, zéro CTA d'urgence
- ✅ Année de copyright figée, ou absente
- ✅ Build 100 % statique, aucune route serveur
- ✅ Les liens externes vont mourir (articles de presse dépubliés) → prévoir un fallback dès maintenant

### Pas d'édition 3
Décidé. On assume une clôture définitive. Pas d'architecture "réactivable", pas de "à suivre…", pas de newsletter.

---

## 2. Le storytelling

### Le fil rouge
> **Deux éditions, cinq ans, 103 782 €. Une promesse tenue.**

L'angle n'est pas le tire-larmes ("ceux qui ne peuvent plus courir"). L'angle est **la promesse tenue** : des étudiants ont annoncé un truc dingue, ils l'ont fait, et voici la preuve chiffrée. C'est plus sobre, plus adulte, et infiniment plus efficace en portfolio.

L'émotion vient des faits et des images, pas des adjectifs.

### L'arc narratif en 5 actes
Chaque acte est une section sur la home, et se déplie en page dédiée.

| Acte | Question à laquelle on répond | Où |
|---|---|---|
| **1. Le résultat** | Qu'est-ce que ça a donné ? | Home hero |
| **2. La preuve** | Où est allé l'argent ? | Home + `/notre-aventure` |
| **3. Le parcours** | Comment ils l'ont fait ? | Home (carte) + `/notre-aventure` |
| **4. Les gens** | Qui l'a fait ? | Home (aperçu) + `/equipe` |
| **5. La trace** | Qui l'a raconté ? | Home (aperçu) + `/presse` |

### La règle de ton
- Tout au **passé composé / imparfait**. Aucun futur, aucun impératif.
- On dit "nous avons", pas "aidez-nous".
- Un chiffre vaut mieux qu'un adjectif. « 605 donateurs » > « une immense générosité ».
- Pas de superlatif non sourcé.

### ⚠️ Le "100 000 merci"
L'accroche est bonne, **à condition de l'énoncer comme un cumul** :

```
33 324 € (édition 1) + 70 458 € (édition 2) = 103 782 €
```

Formulation validée : « **100 000 merci** — deux éditions, cinq ans, 103 782 € récoltés pour l'Hôpital Necker. »

À ne jamais faire : attribuer 100 000 € à la seule édition 2024.

---

## 3. La structure du site

### Navigation (5 entrées, inchangée)
`Accueil` · `Notre aventure` · `L'équipe` · `Presse` · `Contact`

Hors nav : `/mentions-legales`, `/cookies` (footer).

---

### 📄 `/` — Accueil

Rôle : **le résumé exécutif**. Quelqu'un qui ne lit que cette page doit avoir compris l'essentiel.

| # | Section | Contenu | Données nécessaires | Source |
|---|---|---|---|---|
| 1 | **Hero** | "100 000 merci" + sous-titre cumul + photo/vidéo de fond du tour | 1 visuel fort du tour 2024 | ❌ à fournir |
| 2 | **Le bilan en chiffres** | 103 782 € · 605 donateurs · 4 327 km · 2 éditions · 5 ans | Chiffres | ✅ vérifiés (sauf km) |
| 3 | **Les deux éditions** | 2 blocs côte à côte : 2019/20 Lille→Nice 1 327 km 33 324 € — 2024 Tour de France 3 000 km 70 458 € | Dates, km, montants | ⚠️ date éd. 1 à trancher |
| 4 | **Ce que vos dons ont financé** | Les 4 projets Necker, barres à 100 %, au passé | Libellés + montants réels | ⚠️ à confirmer avec l'asso |
| 5 | **La carte** | Le tour 2024, 18 étapes, animation auto (voir §4) | GeoJSON + étapes + distances réelles | ⚠️ distances placeholder |
| 6 | **Les gens** | Aperçu : fondateurs + compteur bénévoles/partenaires → lien `/equipe` | Photos | ❌ Strapi |
| 7 | **La presse** | 3 logos de médias + 1 citation *sourcée* → lien `/presse` | Articles réels | ❌ Strapi |
| 8 | **Clôture** | "L'aventure est terminée." + lien discret cagnotte AP-HP + lien Necker | — | ✅ |

**Ce qui disparaît de la home actuelle (prod) :** le compteur de cagnotte du header, le calendrier des manifestations, le CTA "Faites un don", le compte à rebours.

---

### 📄 `/notre-aventure` — Le récit

Rôle : **le documentaire**. La page où on prend le temps.

| # | Section | Contenu | Source |
|---|---|---|---|
| 1 | Hero | "De Lille à Nice, puis tout autour de la France" | ❌ visuel |
| 2 | **Timeline 2019 → 2024** | 6-8 jalons datés : création de l'asso, édition 1, label Grande Cause Nationale, préparation éd. 2, le tour, la remise des fonds | ⚠️ dates à valider |
| 3 | **Édition 1 en détail** | Lille→Nice, 1 327 km, 33 324 €, les 3 fondateurs de l'époque | ✅ partiel |
| 4 | **Édition 2 en détail** | Tour de France, 18 étapes, galerie des 20 photos d'étapes | ✅ photos OK |
| 5 | **L'impact à Necker** | Les 4 projets, en détail, avec photos si possible | ❌ photos hôpital |
| 6 | **Les coulisses** | Ce que ça demande d'organiser ça : partenaires, logistique, bénévoles. ← **section portfolio** | ⚠️ à écrire |

---

### 📄 `/equipe` — Les gens

Rôle : **mettre les visages en avant**. C'est la page portfolio par excellence.

| # | Section | Contenu | Source |
|---|---|---|---|
| 1 | **Les fondateurs** | **Hugo Nicaise** et **Milan Hrmo**. Photos réelles, rôle, mot personnel | ⚠️ photos + bios |
| 2 | **Les cyclistes édition 1** | Les 3 de Lille→Nice | ❌ vrais noms |
| 3 | **Les cyclistes édition 2** | Ceux du Tour de France | ❌ vrais noms |
| 4 | **Les bénévoles** | ~40 personnes. Liste de noms ou visuel collectif | ❌ Strapi |
| 5 | **Les soutiens** | Nelson Monfort, Stella Akakpo, Steve Chainel, Yoann Offredo | ✅ 4 photos (1 à renommer) |
| 6 | **Les partenaires** | ~8 partenaires, logos + une ligne chacun | ❌ Strapi |
| 7 | **Ceux qui ont construit le site** | ← **NOUVEAU. Crédit développeur.** | ⚠️ à cadrer avec toi |

> 🔴 **C'est ici que se joue l'essentiel du contenu manquant.** Sans Strapi, cette page reste à moitié vide.

---

### 📄 `/presse` — La trace

Rôle : **la crédibilité par la preuve tierce**.

| # | Section | Contenu | Source |
|---|---|---|---|
| 1 | **Label Grande Cause Nationale** | Mis en avant en haut. C'est le plus fort argument de crédibilité | ✅ |
| 2 | **Articles de presse** | Média, date, titre, lien, extrait *attribué* | ❌ Strapi |
| 3 | **Passages TV** | Chaîne, émission, date, embed ou capture | ❌ Strapi |
| 4 | **Radio** | Station, émission, date, lecteur audio | ❌ Strapi |

**Règles non négociables sur cette page :**
- ❌ Aucune citation sans **auteur + média + date + lien**. (Les 3 citations actuelles de `PressHighlights.vue` n'ont aucun de ces champs — à sourcer ou à supprimer.)
- ✅ Prévoir un fallback quand un lien externe meurt : garder titre + média + date affichés même si le lien 404.
- ✅ Envisager d'archiver chaque article sur Wayback Machine et de lier vers l'archive en secours.

---

### 📄 `/contact`
Rôle réduit : l'asso est en sommeil. Une adresse mail, les réseaux sociaux, et une phrase honnête du type « L'association ne mène plus d'action. Vous pouvez toujours nous écrire. »

---

## 4. La carte de France

### Le problème actuel
Le composant `victory/FranceMap.vue` dessine le contour de la France avec un `<path>` écrit à la main (ligne 121) : c'est une patate, pas la France. Le tracé de la route est un simple `L` (segments droits) entre 18 points, sans rapport avec les routes réelles. Les labels se chevauchent (« Verneuil » écrase « Paris »).

### La solution
1. **Contour** : utiliser `assets/france-geojson-metropole.json`, déjà présent.
2. **Projection** : `geoConicConformal()` (Lambert-93, la projection officielle française) — la France y a sa vraie silhouette hexagonale. Via `d3-geo` (léger, tree-shakable) ou pré-calculé au build pour zéro dépendance runtime.
3. **Tracé** : courbes lissées entre étapes plutôt que segments droits, pour évoquer une route.
4. **Animation** : lecture **automatique** au scroll (pas de hover). Le cycliste parcourt le tracé, et l'étape courante s'illumine + la carte latérale se met à jour toute seule. Contrôles discrets (pause / étape suivante).
5. **Mobile** : le hover n'existe pas → la lecture auto règle le problème. Étapes tapables.
6. **Labels** : n'afficher que l'étape active + quelques villes repères, pour éliminer les collisions.
7. **Clin d'œil** : le logo de l'asso *est* une silhouette de France verte avec un cycliste. Aligner le style de la carte sur le logo (même vert, même trait) pour créer une cohérence de marque.

---

## 5. Direction artistique

### Le problème de contraste
Constaté sur les captures : les liens du header sont en **bleu `#2A5FA4` sur un hero bleu foncé** → quasi illisible. Même famille de bleu au premier plan et au fond.

### Les correctifs
- **Header** : texte blanc quand il est au-dessus d'un hero sombre, texte bleu quand il est scrollé sur fond clair. Bascule pilotée par `isScrolled` (la logique existe déjà, elle n'est juste pas appliquée à la couleur du texte).
- **Heroes** : passer d'un bleu plat à un **navy nettement plus sombre** (ou une photo assombrie), pour que le blanc et l'or ressortent franchement.
- **Palette de rôles**, à discipliner :
  - Navy foncé → fonds de heroes
  - Blanc cassé / crème → fonds de sections
  - Vert `#72BC7A` → la route, le mouvement, le logo
  - Or `#D4A843` → **uniquement** les chiffres du bilan et les accents de victoire. C'est ce qui doit rester rare pour rester fort.
- **Typo** : la police d'affichage (Omnes, très ronde) fonctionne bien sur les gros titres. À ne pas descendre dans le corps de texte.

---

## 6. Inventaire des données

### ✅ Vérifié (source : page Fondation AP-HP + repo)
| Donnée | Valeur |
|---|---|
| Fondateurs restants | Hugo Nicaise, Milan Hrmo |
| Nombre initial de fondateurs | 3 (un est parti) |
| Édition 1 | Lille → Nice, **1 327 km**, **33 324 €** |
| Édition 2 | Tour de France, 18 étapes, **70 458 €**, 7–25 juillet 2024 |
| Donateurs | **605** |
| Objectif éd. 2 | 60 000 € → atteint à **117 %** |
| Label | Grande Cause Nationale (Ministère des Sports et des JOP) |
| Bénéficiaire | Hôpital Necker – Enfants malades, AP-HP |
| Photos d'étapes | 20 fichiers `.webp` |
| Soutiens | 4 photos |

### ⚠️ À trancher / confirmer
- **Date de l'édition 1** : tu dis 2019, la page AP-HP dit « lancé pour la première fois en 2020 ». Asso créée en 2019, tour en 2020 ? À valider.
- **Distances des étapes** : les 18 valent « 250km » dans `data/locations.js` = placeholder.
- **Les 4 projets Necker** : libellés issus de l'ancien site (10 fauteuils-lits 10 k€ · 2 semaines d'animation 10 k€ · 2 services décorés 10 k€ · salon des parents 30 k€). Ont-ils été réalisés tels quels ? Seule l'asso peut confirmer.
- **Les 3 citations de presse** : à sourcer (auteur + média + date + lien) ou à supprimer.

### ✅ Récupéré depuis Strapi le 11/08/2026 (figé dans `data/strapi/`)

| Collection | Contenu réel |
|---|---|
| `contacts` (3) | **Hugo Nicaise** président · **Milan Hrmo** co-président · **Yves Gérard** trésorier ⚠️ contient des emails/téléphones personnels, cf. ADR-009 |
| `partenaires` (9) | Kit'atelier · Grande Cause Nationale · Weldom · Banagrumes · Ermaflux · McDonald's (Forbach, Creutzwald, Forges-Les-Eaux) · Au cœur du Malt · Nissan Compiègne Gueudet · Toyota Gueudet Compiègne — **avec logos et descriptions** |
| `articles` (8) | Courrier picard · France 3 Hauts-de-France · L'Est éclair · Le Parisien · France 3 PACA · Nice-Matin · EPF Troyes — **tous sur l'édition 2020** |
| `reportage-tvs` (8) | France 3 (×4) · BFM Grand Lille · Canal 32 · Être étudiant — **tous sur l'édition 2020** |
| `podcasts` | **0 entrée** — aucune archive radio |
| `heroes` (11) | Titres/descriptions de heroes de l'ancien site |
| Médias | **31 fichiers** rapatriés dans `public/backoffice/` |

**Constat majeur : l'archive presse s'arrête à l'édition 2020.** Rien sur le Tour de
France 2024. Santé des liens vérifiée : 1 mort (Canal 32, 404), 4 bloquent les robots
(Le Parisien, Courrier picard, L'Est éclair, Nice-Matin), le reste répond.

### ❌ Manquant — bloque la rédaction
- Vrais noms des cyclistes éd. 1 et éd. 2
- Photos des fondateurs, des cyclistes, du tour
- Liste + logos des partenaires (~8)
- Liste des articles / TV / radio avec liens
- Photos de l'impact à Necker
- Un visuel fort (photo ou vidéo) par hero

> **Statut Strapi : récupération en cours.** C'est le chemin critique du projet.

### 🗑️ Faux — à purger du WIP de février
| Où | Quoi |
|---|---|
| `TeamGrid.vue:208-221` | « Hugo Petrucci », « Maxence Gil » → recombinaison des données de démo `Petrucci`/`Gil` de l'ancien `Edition1/lesCyclistes.vue` avec les vrais prénoms |
| `TeamGrid.vue:225-229` | « David Petrucci », « Malika Gil », « Erika Newton » présentés comme cyclistes 2020 → données de démo |
| `PressHighlights.vue:32-42` | 3 citations sans auteur ni média |
| `.planning/content/home.md` | « tablettes tactiles » et « fresques murales » → 2 projets Necker qui n'apparaissent nulle part dans les sources |
| Partout | « 100 000 € » attribués à l'édition 2024 seule |
| `FranceMap.vue:121` | Contour de France dessiné à la main |

---

## 7. Dette technique à traiter

| Sujet | Détail |
|---|---|
| `nuxt.config.ts` | `plugins: ['/plugins/...']` en chemins absolus → ne résolvent pas. Nuxt auto-charge déjà le dossier. À supprimer. |
| `nuxt.config.ts` | `nuxt-svgo` pointe vers `assets/icons/` qui n'existe pas |
| Modules | `@nuxtjs/i18n` et `nuxt-swiper` encore chargés — utiles ? Le site est monolingue |
| Fichier | `public/soutiens/" Yoann-Offredo.jpeg"` — espace en début de nom |
| Suppressions | `server/api/`, `stores/refreshDonation.ts`, tout le code de cagnotte live |
| Perf | Images en `webp` ✅, mais poids et `loading="lazy"` à auditer |
| SEO | Redirections 301 des anciennes URLs (`/faire-un-don`, `/calendrier`, `/nos-partenaires`, `/premiere-edition`, `/nos-retombees-presse/*`) vers les nouvelles |
| Accessibilité | Contrastes (cf. §5), `prefers-reduced-motion` déjà géré ✅ |

---

## 8. Questions ouvertes

1. Édition 1 : **2019 ou 2020** ?
2. Comment veux-tu apparaître dans la section "crédits" — nom, photo, lien portfolio, quel niveau de mise en avant ?
3. Les 3 citations de presse : tu les reconnais, ou on les supprime ?
4. A-t-on des photos du tour 2024 exploitables en hero plein écran ?
5. Le lien vers la cagnotte AP-HP : discret en pied de page, ou une vraie section « soutenir Necker » ?
6. Est-ce qu'on peut solliciter Hugo et Milan pour un mot personnel de clôture (2-3 phrases signées) ? Ça donnerait beaucoup au site.
