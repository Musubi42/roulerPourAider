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
| Milan Hrmo | Co-président, co-fondateur | `                                    ` |
| Yves Gérard | Trésorier | `                                    ` |

## 🔴 À remplir — Le troisième cycliste de 2020

Ils étaient trois sur Lille → Nice. Hugo et Milan sont identifiés, **le troisième n'est
nommé nulle part** dans les sources récupérées. La presse de 2020 parle bien de « trois
étudiants » sans toujours les nommer.

Indices : l'article du **Courrier picard** du 23/06/2020 évoque « un étudiant d'Amiens »,
celui de **L'Est éclair** du 11/07/2020 « un étudiant troyen », et celui d'**EPF Troyes**
du 14/10/2021 « un étudiant EPF ». Il s'agit probablement de la même personne.

| Champ | À compléter |
|---|---|
| Prénom et nom | `                                    ` |
| Rôle / mention souhaitée | `                                    ` |
| Photo | `                                    ` |
| Le fait-on figurer ? | ☐ oui ☐ non |

> Tant que ce champ est vide, la page affiche « Un troisième cycliste a participé à cette
> première édition. » — on n'invente pas de nom (ADR-012).

## 🟠 À remplir — Logos des médias

Tu as raison sur le principe : citer un média qui a parlé de vous relève de l'usage
nominatif, c'est l'usage courant dans les revues de presse. Je n'avais simplement **pas
les fichiers** — les vignettes de l'export sont des photos des cyclistes, pas des logos.

Le carrousel de la page d'accueil affiche donc les noms en typographie. **Dès qu'un logo
est renseigné, il remplace automatiquement le nom** : il suffit d'ajouter un champ `logo`
dans `data/presse.json`.

Format idéal : SVG ou PNG détouré sur fond transparent, hauteur 80 px minimum.
Source habituelle : la rubrique « espace presse » ou « kit média » de chaque site.

| Média | Logo (chemin ou URL) |
|---|---|
| Le Parisien | `                                    ` |
| Courrier picard | `                                    ` |
| France 3 (Hauts-de-France, Picardie, PACA, Alpes-Côte d'Azur) | `                                    ` |
| Nice-Matin | `                                    ` |
| L'Est éclair | `                                    ` |
| BFM Grand Lille | `                                    ` |
| Canal 32 | `                                    ` |
| Être étudiant | `                                    ` |
| EPF Troyes | `                                    ` |

## 🔴 À remplir — Retombées presse de l'édition 2024

**Il n'existe aucune retombée 2024 dans le backoffice.** Les 15 entrées récupérées portent
toutes sur l'édition 2020 (juin 2020 → octobre 2021). Une entrée datée « 05/08/2024 » s'est
révélée être un **doublon** de l'article France 3 du 05/08/**2020** — même URL, date erronée
dans Strapi.

La page presse affiche donc, sous « Édition 2024 » : *« Les retombées de cette édition
n'ont pas encore été rassemblées ici. »*

Ajoute une ligne par retombée :

| Média | Date | Titre | URL | Type | Image |
|---|---|---|---|---|---|
| Courrier picard | 2025-01-11 | Étoiles Picardes 2024 | `                    ` | article | `          ` |
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
