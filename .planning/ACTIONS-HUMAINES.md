# Reste à faire — action humaine requise

Ce que je ne peux pas faire à ta place. Coche au fur et à mesure.

Les sections **« À remplir »** sont des gabarits : complète directement dans ce fichier,
je m'occupe ensuite de l'intégration. Pour les images, indique soit un chemin local
(`public/...`), soit une URL — les deux me vont.

Légende : 🔴 bloquant · 🟠 important · 🟢 confort

---

## 🔴 Sécurité — à faire vite

- [ ] **Révoquer le token Strapi read-only fourni le 11/08/2026.**
  Il a servi à l'export, il est dans `.env` (non commité) **et dans l'historique de la
  conversation**. Les données sont figées dans `data/strapi/`, le site n'en a plus besoin.

- [ ] **Révoquer l'ancien token** qui était en dur dans `utils/fetchBackoffice.js`.
  J'ai supprimé le fichier, mais **le token reste dans l'historique git** — la suppression
  ne suffit pas.

- [ ] **Décider du sort du backoffice Strapi.** Plus rien ne le consomme. L'éteindre
  supprime un coût d'hébergement et une surface d'attaque (ADR-002).

---

## 🔴 À remplir — Photos de l'équipe

Aucune photo de personne n'existe dans les assets, hors `public/Avatar-hugo.png` et
`public/PP_hugo.jpg` (Hugo uniquement, qualité et cadrage à vérifier). Les cartes
affichent donc des initiales sur aplat de couleur.

Idéalement : portrait cadré serré, format carré, 600 × 600 px minimum.

| Personne | Rôle | Photo (chemin ou URL) |
|---|---|---|
| Hugo Nicaise | Président, co-fondateur | `                                    ` |
| Milan Hrmo | Co-président, co-fondateur |
| Alexandre Ioos | Co-président, co-fondateur |`                                    ` |
| Yves Gérard | Trésorier | `                                    ` |

## ✅ Résolu — Le troisième cycliste de 2020 : Alexandre Ioos

L'association l'a nommé elle-même dans sa publication de novembre 2024 :
« nous y associons Alexandre Ioos avec qui nous avons partagé la première édition
de Rouler pour aider ». **Validé pour publication le 13/08/2026.**

Il figure dans `cyclists2020` (`TeamGrid.vue`) et dans le récit
(`data/recit.js`, acte 2020).

Il figure désormais aussi dans **« Les fondateurs »** sur `/equipe`, avec le
libellé `Co-fondateur`.

- [ ] **Demander à Hugo la position exacte d'Alexandre.** Il n'apparaît pas dans
  `data/strapi/contacts.json`, qui ne liste que le bureau en fin de vie de
  l'association (Hugo président, Milan co-président, Yves trésorier).
  « Co-fondateur » est le libellé le plus sûr en attendant — à corriger dans
  `TeamGrid.vue` (`founders`) si ce n'est pas le bon.
- [ ] Une photo de lui.

## 🔴 À demander à Hugo — Le nombre de donateurs de l'édition 2020

**605 donateurs, c'est l'édition 2024 uniquement.** Le décompte de 2020 n'a jamais
été retrouvé : la cagnotte est close et son API est morte.

Tant qu'il manque, le site écrit partout « **605 donateurs en 2024** », jamais
« 605 donateurs » tout court — présenté comme un cumul, ce chiffre serait **faux
par défaut** (il sous-estime le total) et affirmerait ce qu'on ne sait pas.

| Donnée | À compléter |
|---|---|
| Donateurs édition 2020 | `                    ` |
| Donateurs, cumul des deux éditions | `                    ` |

- [ ] **Faire relire tous les chiffres par Hugo**, pas seulement celui-ci :
  33 324 € · 70 523 € · 103 847 € · 1 327 km · 3 000 km · 4 327 km · 18 étapes ·
  605 donateurs · objectif 60 000 €. Ils sont affichés partout et servent
  d'argument de redevabilité envers les donateurs : une erreur y coûte plus cher
  qu'ailleurs.

## 🔴 À remplir — Le mot de clôture des fondateurs

`pages/notre-aventure.vue` réserve l'emplacement (`motFondateurs`, aujourd'hui
`null`). Tant qu'il est vide, la page affiche le texte de remerciement générique,
et un repère en pointillés apparaît **en développement uniquement**.

Deux ou trois phrases signées de Hugo et Milan, sur ce que le projet leur laisse.
C'est ce qui manque le plus à la page.

| Champ | À compléter |
|---|---|
| Texte | `                                    ` |
| Signature | `Hugo Nicaise et Milan Hrmo` ? |

## ✅ Résolu — Courrier picard, « 1er héros du quotidien 2024 »

Sourcé : la vidéo « Étoiles picardes 2024 — Hugo Nicaise, catégorie héros du
quotidien » remplace la page de vote dans `data/presse.json`, avec le visuel du
palmarès. Le fait est écrit dans le dernier acte de `/notre-aventure`.


## 🔴 À faire par toi — Renommer les photos d'étape

`public/steps/` a un problème de nommage : plusieurs fichiers ne correspondent
pas à l'étape dont ils portent le slug. Le cas repéré, mais il y en a sûrement
d'autres :

- **`verneuil-en-halatte.webp`** montre le groupe devant la porte de l'**Hôpital
  Necker, à Paris** (fronton « HOPITAL NECKER » lisible) — c'est pourtant ce
  fichier que la **carte de l'accueil** affiche pour l'étape 1.
- **`paris.webp`** (l'Arc de Triomphe) n'est référencé nulle part : le tour ne
  compte pas Paris parmi ses 18 étapes.

- [ ] **Renommer les photos et les aligner sur les bonnes étapes.** Le slug
  attendu pour chaque étape est celui de `data/etapes-2024.js` (champ `slug`),
  et `utils/importSteps.mjs` sait faire le renommage à partir de fichiers
  numérotés `1.jpg`, `02-versailles.png`, etc.

> ⚠️ **Je ne touche plus à `public/steps/`** — c'est ton chantier. Le récit, lui,
> pointe volontairement sur `verneuil-en-halatte.webp` pour la photo de Necker,
> avec une légende honnête. À corriger une fois le renommage fait.

## 🟠 Décidé — Les deux vidéos Facebook de juillet 2024

Deux publications Facebook de juillet 2024 ne sont pas des retombées presse et
n'ont donc pas leur place sur `/presse`. Elles valent mieux qu'un oubli :

- **David Gaudu** (Groupama-FDJ) apporte son soutien, 13/07/2024 —
  `facebook.com/reel/1021657266243602`. Sa place est dans « Nos soutiens »
  (`/equipe`), aux côtés de Nelson Monfort. Il faudrait une photo, et savoir si
  vous voulez l'y faire figurer.
- **La directrice de l'Hôpital Necker** adresse un message à l'association,
  05/07/2024 — `fb.watch/IZew1Zm2OX/`. C'est le meilleur témoignage tiers du
  projet : il aurait sa place sur la page d'accueil.

**Décidé le 13/08/2026 :** ni l'une ni l'autre ne va sur `/presse` — ce ne sont
pas des retombées presse. David Gaudu n'est pas repris ailleurs non plus.

Reste le **message de la directrice de Necker** : le meilleur témoignage tiers du
projet, et le seul contenu du lot qui vaut d'être publié. Modalités à arrêter,
cf. la section suivante.

## 🟠 En discussion — Le message de la directrice de Necker

Vidéo Facebook du 05/07/2024, plus de 2 minutes. C'est le meilleur témoignage
tiers du projet : la directrice de l'hôpital bénéficiaire s'adresse directement à
l'association. Sa place est sur la **page d'accueil**.

**Ce que je recommande : un extrait court, hébergé par nous, pas un embed.**

- L'embed Facebook rapporte des scripts tiers et des cookies, que l'ADR-010 a
  précisément supprimés du site. Il casserait aussi le « aucun traceur » des
  mentions légales.
- Un lien vers Facebook est le support le plus fragile qui soit (ADR-008), sur un
  site prévu pour tenir des années sans maintenance (ADR-001).
- Deux minutes, personne ne les regarde sur une page de bilan. **20 à 40 secondes**
  bien choisies, oui.

Donc : tu télécharges la vidéo en bonne qualité, je garde **l'intégrale dans
`archives/`** (source de vérité, hors build) et je publie **un extrait** en
`<video>` auto-hébergé — affiche de démarrage, contrôles visibles, pas de lecture
automatique, sous-titré si possible. Et je double le tout d'une **citation écrite**
de la phrase forte, attribuée et datée : elle porte le message même sans lecture,
et elle survivra à tout.

- [ ] Télécharger la vidéo en bonne qualité et me la déposer.
- [ ] Me dire quel passage retenir (timecodes), ou me laisser proposer.
- [ ] ⚠️ **Vérifier l'accord de la directrice** pour une publication sur le site.
  Son accord pour une story Facebook de l'association n'en vaut pas un pour une
  page publique pérenne.

## ✅ Résolu — Logos des médias

Les 18 logos déposés dans `public/medias/logos/` sont normalisés (160 px de haut,
webp, transparence conservée, renommés en minuscules sans accent) et branchés sur
le carrousel « Ils en ont parlé » de l'accueil.

**« France 3 » sans région n'y figure pas** (arbitrage du 13/08/2026 : pas de logo
générique à fournir). Le carrousel n'affiche que les médias qui ont un logo — un
nom en toutes lettres au milieu de quinze logos se lit comme une image cassée,
pas comme un choix. **Ses trois retombées de 2020 restent sur `/presse`** : c'est
le carrousel que France 3 quitte, pas la revue de presse.

- [ ] Si un jour tu retrouves de quelle région relève chacune de ces trois
  retombées, dis-le moi : elles rejoindront un logo existant, et France 3
  reviendra dans le carrousel.

## 🔴 À remplir — Retombées presse de l'édition 2024

**Il n'existe aucune retombée 2024 dans le backoffice.** Les 15 entrées récupérées portent
toutes sur l'édition 2020 (juin 2020 → octobre 2021). Une entrée datée « 05/08/2024 » s'est
révélée être un **doublon** de l'article France 3 du 05/08/**2020** — même URL, date erronée
dans Strapi.

**Dix entrées 2024 ont depuis été ajoutées** à `data/presse.json` : Grande Cause
Nationale, Le Parisien, Oise Hebdo, Sud Ouest, La Dépêche, Courrier picard (×2),
et trois reportages télé (France 2, France 3 Poitou-Charentes, France 3 Picardie)
hébergés sur Facebook. La section « Édition 2024 » de `/presse` n'est plus vide.

⚠️ Les vidéos Facebook sont **le support le plus fragile** de toute la revue de
presse (ADR-008). À archiver ailleurs si vous tenez à les conserver.

Ajoute une ligne par retombée supplémentaire :

| Média | Date | Titre | URL | Type | Image |
|---|---|---|---|---|---|
| Courrier picard | 2025-01-11 | Étoiles Picardes 2024 — le résultat | `                    ` | article | `          ` |
| France 3 Picardie | 2024-05-02 | Reportage pendant la préparation | `                    ` | tv | `          ` |
| `            ` | `          ` | `                    ` | `                    ` | article / tv / radio | `          ` |
| `            ` | `          ` | `                    ` | `                    ` | article / tv / radio | `          ` |

### Ce que j'ai trouvé sur Facebook, et ce que je n'ai pas pu voir

**Trouvé** — la page `facebook.com/roulerpouraider` (3,4 K abonnés) est lisible sans
authentification, et le **texte des posts ainsi que leurs dates s'extraient correctement**.
Le premier post visible est daté du **11 janvier 2025** : *« Très honorés d'avoir été
sélectionnés par le Courrier picard pour peut-être devenir une des Étoiles Picardes
2024 »*, avec un lien vers `courrier-picard.fr` et un commentaire de l'Hôpital
Necker-Enfants malades. C'est la seule retombée 2024-2025 identifiée à ce jour.

**Pas pu voir** — je n'ai lu que le haut de la page. Un inventaire complet demande de
faire défiler la page par paliers successifs et d'extraire à chaque palier, ce qui est long
et que je n'ai pas mené à son terme. **Les photos, elles, ne se récupèrent pas** par ce
biais : l'onglet Photos ne renvoie aucune image exploitable, seulement la coquille de la
page. Il faudra exporter l'album à la main.

Deux options : soit tu exportes toi-même, soit je consacre une passe dédiée à la récolte
Facebook — dis-moi.

## 🟠 À remplir — Photos de hero et visuels du Tour 2024

Les heroes actuels utilisent ce dont on dispose, tout provient de **l'édition 2020** :

| Page | Photo actuelle | Remplacement souhaité |
|---|---|---|
| Accueil | `1ere-edition/2020-arrivee-nice.webp` (arrivée à Nice) | `                    ` |
| Notre aventure | `1ere-edition/depart-lille.webp` (départ de Lille) | `                    ` |
| L'équipe | vignette presse Le Parisien (les 3 cyclistes) | `                    ` |
| Presse | capture d'un reportage France 3 | `                    ` |
| Contact | aucune — page utilitaire, volontairement sans hero | — |

Il manque **tout visuel de l'édition 2024**. Les 20 photos d'étapes (`public/steps/`)
existent mais sont des photos de villes, pas de l'équipe en action.

---

## 🟠 À demander à Hugo et Milan

- [ ] **Un mot de clôture signé**, 2-3 phrases, pour le bas de la page d'accueil.
      L'encart est prêt à l'accueillir. C'est la seule chose que personne d'autre ne peut
      écrire.

- [ ] **Valider les projets financés à Necker.** L'ancien site listait 4 projets
      (10 fauteuils-lits 10 k€ · 2 semaines d'animation 10 k€ · 2 services décorés 10 k€ ·
      salon des parents 30 k€). Le site en affiche 6, avec en plus « tablettes tactiles »
      et « fresques murales » — pour lesquelles de vraies photos existent
      (`public/hopital-necker-visite/`), donc elles ont probablement eu lieu. Seule
      l'association peut confirmer la liste et les montants exacts.

- [ ] **Confirmer les rôles.** L'export donne Hugo *président*, Milan *co-président*,
      Yves Gérard *trésorier*. Yves apparaît désormais dans une section « Le bureau »,
      distincte des fondateurs, et comme cycliste de l'édition 2024.

- [ ] **Distances réelles des 18 étapes** — `data/locations.js` indique « 250 km » pour
      toutes (18 × 250 = 4 500 km, alors que le tour fait 3 000 km). Piste :
      `public/Rouler_pour_aider_dossier.pdf`.

- [ ] **Liste des ~40 bénévoles** — les afficher ou non, et avec quel consentement.

  ⚠️ Ne jamais publier les emails et téléphones personnels présents dans
  `data/strapi/contacts.json` (ADR-009).

---

## 🟠 Mentions légales et cookies

`pages/cookies.vue` et `pages/mentions-legales.vue` sont encore des stubs d'un mot, alors
qu'elles sont liées depuis le footer et **légalement obligatoires**.

Bonne nouvelle : **plus aucun traceur** (Clarity et GA supprimés, ADR-010), donc plus
besoin de bandeau de consentement. La page cookies peut se limiter à constater qu'aucun
cookie non essentiel n'est déposé.

| Champ | À compléter |
|---|---|
| Dénomination exacte de l'association | `                                    ` |
| Numéro RNA (W…) ou SIRET | `                                    ` |
| Adresse du siège *(le site indique 10 rue Jean Jaurès, 60550 Verneuil-en-Halatte)* | `                                    ` |
| Directeur de la publication | `                                    ` |
| Hébergeur *(Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — à confirmer)* | `                                    ` |

---

## 🟢 Confort et vérifications

- [ ] **Search Console** — après mise en production, soumettre
      `https://roulerpouraider.fr/sitemap.xml` et demander l'indexation. Vérifier que les
      15 redirections 301 de `vercel.json` sont prises en compte : ce sont les anciennes
      URL qui portent les backlinks presse.

- [ ] **`brew install poppler`** — pour que je puisse lire
      `public/Rouler_pour_aider_dossier.pdf` (4,8 Mo, probablement partenaires, équipe,
      parcours et distances).

- [ ] **Vérifier le rendu mobile à l'œil.** Le redimensionnement de fenêtre ne fonctionne
      pas via mon outil Chrome, les captures restent en 1456 px. Le desktop est vérifié.

- [ ] **Vérifier les 4 liens presse qui bloquent les robots** (Le Parisien, Courrier
      picard, L'Est éclair, Nice-Matin) : ils renvoient 403/406 aux scripts mais sont
      probablement vivants dans un navigateur.

- [ ] **Canal 32 est mort (404).** La carte s'affiche en niveaux de gris sans lien, média
      et date préservés (ADR-008). Reste à retrouver une archive si elle existe.

- [ ] **Archivage Wayback** — l'API m'a renvoyé un 429 (trop de requêtes). À reprendre en
      différé pour remplir le champ `archiveUrl` de `data/presse.json`.

- [ ] **Commiter le travail.** Le refactor est resté non commité depuis février et
      s'est beaucoup enrichi depuis. Les fichiers `components/victory/`, `data/` et
      `.planning/` sont *untracked* : irrécupérables en cas de fausse manip.
