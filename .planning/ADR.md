# Décisions d'architecture (ADR)

Pourquoi les choses sont comme elles sont. À lire avant de « corriger » quelque chose
qui semble bizarre — c'est probablement volontaire.

Format : une décision par section. Contexte → Décision → Conséquences.

---

## ADR-001 — Le site devient un mémorial figé, pas un site en veille

**Date** : 2026-08-11

**Contexte.** L'association a mené deux éditions (2020 et 2024) et a cessé son activité.
Le site tournait encore en mode « campagne en cours » : compteur de cagnotte en temps
réel, compte à rebours, calendrier de manifestations, CTA « Faites un don ». L'API de
dons (`donation-api.roulerpouraider.fr`) est morte, donc tous les montants affichaient
0 € et le compte à rebours affichait « -681 jours ».

**Décision.** On transforme le site en mémorial de projet : tout au passé, aucun appel à
l'action, aucune donnée temps réel. Objectif : servir de vitrine/portfolio aux fondateurs
et au développeur, et de bilan pour les 605 donateurs. **Pas d'édition 3 prévue** — on
n'entretient donc aucune architecture « réactivable ».

**Conséquences.**
- Aucune dépendance à un service externe vivant. La mort de l'API de dons est la preuve
  par l'exemple de ce qui arrive sinon.
- Aucune valeur calculée relativement à la date du jour (d'où l'ADR-004).
- Le site doit pouvoir rester en ligne des années sans maintenance.

---

## ADR-002 — Les données Strapi sont figées en JSON statique

**Date** : 2026-08-11

**Contexte.** Le backoffice Strapi (`backoffice.roulerpouraider.fr`) contenait le contenu
réel : partenaires, presse, reportages TV, contacts. L'ancien site le consommait à
l'exécution. Un backoffice qu'il faut maintenir, payer et sécuriser pendant des années
pour un contenu qui ne changera plus est une dette pure — et un point de panne unique.

**Décision.** Export ponctuel via `utils/exportStrapi.mjs` vers `data/strapi/*.json`, et
rapatriement des médias dans `public/backoffice/`. Le site ne parle plus jamais à Strapi.

**Conséquences.**
- Une fois l'export validé, **le token peut être révoqué et le backoffice éteint**.
- Le script attend du **Strapi v5** (champs à plat, `documentId`). L'ancien
  `utils/fetchBackoffice.js` visait la v4 (données imbriquées sous `attributes`), ne
  fonctionnait plus, **et contenait un token API en dur** : il a été supprimé. Le token
  reste présent dans l'historique git, d'où la nécessité de le révoquer.
- Toute correction de contenu se fait désormais dans les fichiers JSON, pas dans Strapi.

**Chaîne de données.** `Strapi → data/strapi/*.json` (export brut, non édité) →
`data/partenaires.json` et `data/presse.json` (fichiers curés, **source de vérité des
composants**) → composants. Les fichiers curés sont éditables à la main : c'est là qu'on
ajoute la presse 2024, les URL d'archive et les corrections.

---

## ADR-003 — Le header change de couleur selon la page, via `heroHeader`

**Date** : 2026-08-11

**Contexte.** Les liens de navigation étaient en `secondary` (`#2A5FA4`) posés sur des
heroes de la même famille de bleu : contraste quasi nul. Passer simplement le texte en
blanc cassait `/contact`, `/cookies` et `/mentions-legales`, qui n'ont pas de hero et
affichent un fond clair dès le haut de page.

**Décision.** Les pages à hero sombre déclarent `heroHeader: true` dans `definePageMeta`.
Le header est transparent à texte blanc **uniquement** sur celles-ci, et opaque à texte
bleu partout ailleurs. Le layout `victory.vue` ajoute `pt-16` quand il n'y a pas de hero,
pour compenser la hauteur du header `fixed`.

**Conséquences.**
- Toute nouvelle page avec un hero sombre **doit** déclarer `heroHeader: true`, sinon son
  header sera blanc opaque par-dessus le hero.
- Toute nouvelle page sans hero ne doit **pas** le déclarer, sinon son texte de nav sera
  blanc sur fond clair, donc invisible.

---

## ADR-004 — L'année du copyright est écrite en dur

**Date** : 2026-08-11

**Contexte.** Le footer calculait `new Date().getFullYear()`, ce qui affichait
« © 2026 » sur un site dont l'activité s'est arrêtée en 2024. Un site qui vieillit doit
assumer sa date, pas prétendre être à jour.

**Décision.** « © 2019–2024 » en dur. 2019 = création de l'association, 2024 = dernière
édition.

**Conséquences.** Ne pas « réparer » ça en le rendant dynamique. C'est le comportement voulu.

---

## ADR-005 — Le navy est un token dédié aux fonds de heroes

**Date** : 2026-08-11

**Contexte.** Les heroes utilisaient `secondary` (`#2A5FA4`), sur lequel ni le blanc ni
l'or ne ressortaient franchement, et par-dessus lequel un aplat `bg-black/50` écrasait
tout.

**Décision.** Nouveau token `navy: #12294A`, réservé aux fonds de heroes. Ratios de
contraste mesurés : blanc 14,6:1 et or 6,6:1 — au-dessus du seuil WCAG AA. Les aplats
noirs sont remplacés par un dégradé, qui conserve la profondeur et fonctionnera aussi
quand de vraies photos seront placées en fond.

**Conséquences.**
- `secondary` reste le bleu du texte et des aplats clairs. Ne pas les confondre.
- **L'or est réservé aux chiffres du bilan, aux années et au souligné des titres.**
  Il perd tout son impact s'il sert aussi de couleur décorative — c'est pour ça qu'il a
  été retiré des bordures de cartes, pastilles et libellés de rôle.

---

## ADR-006 — Les centrages ne passent pas par `translate` sur les éléments animés

**Date** : 2026-08-11

**Contexte.** Dans `Timeline.vue`, le badge d'année portait `-translate-x-1/2` et la ligne
verticale `-translate-x-px` (classes Tailwind). GSAP anime la propriété `transform`
(`scale`, `scaleY`) : il écrase donc entièrement ces classes, et les éléments se
décalaient visiblement au démarrage de l'animation.

**Décision.** Sur tout élément animé par GSAP, le centrage passe par des **marges**
(`-ml-7`, `md:ml-px`), jamais par une classe `translate-*`.

**Conséquences.** Si un élément animé se décale, chercher un conflit `transform` avant
toute autre piste. La règle vaut pour tout nouveau composant animé.

---

## ADR-007 — Aucune citation de presse sans source vérifiable

**Date** : 2026-08-11

**Contexte.** Le refactor de février contenait 21 entrées de presse entièrement inventées
(9 articles, 6 TV, 6 radio), attribuées nommément au Parisien, TF1, L'Équipe, France
Inter… avec des dates précises et des URL pointant vers les pages d'accueil des médias
sous le libellé « Lire sur *media*.fr ». Toutes datées 2023, alors que le tour a eu lieu
en 2024. Publier ça sur le site d'une association labellisée Grande Cause Nationale
représentait un risque réputationnel réel.

**Décision.** Toute citation ou entrée de presse affichée doit avoir **auteur/média +
date + lien vérifiable**. À défaut, elle ne s'affiche pas.

*Nuance actée avec le client* : les trois phrases d'accroche de `PressHighlights.vue`
sont factuellement exactes et sont conservées, mais **présentées comme du texte éditorial
assumé** — sans guillemets, hors de toute section « presse » — pour qu'elles ne se lisent
pas comme des citations de journalistes.

**Conséquences.** Les données de `data/strapi/articles.json` et `reportage-tvs.json`
(export du backoffice) sont la seule source légitime pour la page presse.

---

## ADR-008 — Stratégie anti-pourrissement des liens externes

**Date** : 2026-08-11

**Contexte.** Sur un site prévu pour rester en ligne des années, les articles de presse
seront dépubliés un à un. Vérification faite sur les 16 liens réels de l'export :
1 est **déjà mort** (Canal 32, 404) et 4 bloquent les robots (Le Parisien, Courrier
picard, L'Est éclair, Nice-Matin). Plusieurs reportages TV pointent vers des vidéos
Facebook, particulièrement fragiles.

**Décision.**
1. La page presse affiche **média + date + titre même quand le lien est mort**. Le lien
   est un bonus, jamais le support de l'information.
2. Chaque source est archivée sur Wayback Machine, et l'URL d'archive stockée à côté de
   l'URL d'origine, comme lien de secours.

**Conséquences.** Le modèle de données presse doit porter un champ `archiveUrl` en plus
de l'URL d'origine.

---

## ADR-010 — Suppression de Microsoft Clarity et Google Analytics

**Date** : 2026-08-11

**Contexte.** Le site chargeait deux traceurs tiers (`plugins/clarity-plugin.js` →
`clarity.ms/tag/lmdfvteip5`, et `plugins/google-analytics.client.js` → GA4
`G-79LN69ERRS`), sans aucun bandeau de consentement. Sur un site qui n'a plus d'objectif
de conversion ni de campagne à optimiser, l'audience mesurée ne sert aucune décision.

**Décision.** Les deux plugins sont supprimés. Aucun traceur, aucun cookie non essentiel.

**Conséquences.**
- Plus besoin de bandeau de consentement, ce qui simplifie considérablement la page
  cookies et les mentions légales.
- L'historique GA reste consultable côté Google, mais plus aucune donnée n'est collectée.
- Le suivi d'indexation passe désormais par la Search Console + `sitemap.xml` +
  `robots.txt`, qui n'exigent aucun traceur côté visiteur.

---

## ADR-011 — Les chiffres affichés sont les montants réels, pas l'accroche

**Date** : 2026-08-11

**Contexte.** Le refactor affichait « 100 000 € » un peu partout, y compris attribués à la
seule édition 2024. Or la réalité est : **33 324 €** en 2020 (Lille → Nice, 1 327 km) et
**70 458 €** en 2024 (Tour de France, 3 000 km, 18 étapes, 117 % d'un objectif de
60 000 €), soit **103 782 € cumulés** auprès de **605 donateurs** sur **4 327 km**.

**Décision.** Tous les chiffres affichés sont les montants réels.
**« 100 000 merci » reste l'accroche de marque** (titre de la home, `<title>` SEO) — c'est
une formule, pas un montant. Partout ailleurs, on écrit 103 782 €.

**Conséquences.** Ne jamais réintroduire « 100 000 euros récoltés » dans un texte courant.
Si un chiffre doit changer, le corriger dans `StatCounter.vue`, `HeroVictory.vue`,
`TeamGrid.vue` et les `useSeoMeta` des pages.

---

## ADR-012 — Le contenu absent n'est pas comblé par du placeholder

**Date** : 2026-08-11

**Contexte.** Les noms réels des cyclistes des deux éditions ne figurent dans aucune source
récupérée. Le refactor affichait à leur place les données de démo de l'ancien site
(« David Petrucci », « Malika Gil », « Erika Newton »).

**Décision.** Quand une donnée manque, on affiche une **mention honnête** à la place
(ex. « 1 327 kilomètres parcourus par trois étudiants »), jamais une carte vide ni un nom
inventé. Le composant teste la liste et bascule sur un résumé factuel si elle est vide.

**Conséquences.** Les tableaux `cyclists2020` / `cyclists2024` de `TeamGrid.vue` sont
volontairement vides. Les remplir avec les vrais noms fera apparaître les grilles
automatiquement, sans autre modification.

---

## ADR-013 — Photos en duotone navy, et heroes hiérarchisés

**Date** : 2026-08-11

**Contexte.** La photo d'arrivée à Nice mise en fond de hero entrait en concurrence avec le
titre : le panneau « #ILoveNICE » y forme des lettres géantes rouges, blanches et bleues
qui se battaient avec la typographie. Un simple voile noir, lui, écrasait la photo au point
de la faire disparaître.

**Décision.**
1. Toutes les photos de hero passent en **duotone navy** —
   `grayscale(1) contrast(1.05) brightness(.62)`, une teinte navy en `multiply` à 55 %,
   puis un dégradé plus dense en haut et en bas. La photo devient une atmosphère, la
   typographie reste au premier plan, et le bleu rejoint la palette au lieu de la
   contredire.
2. Le traitement est centralisé dans `components/victory/PageHero.vue`, réutilisé par les
   pages intérieures.
3. **Seule la page d'accueil a un hero pleine hauteur** (`100svh`) : le chiffre *est* le
   message. Les pages intérieures utilisent un hero court (`py-28 md:py-36`) — occuper tout
   l'écran y retarderait l'accès au contenu sans rien ajouter. `/contact` n'a
   volontairement aucun hero : c'est une page utilitaire.

**Conséquences.** Une nouvelle page à hero utilise `PageHero` plutôt que de redéfinir les
calques. Sans `image`, le composant retombe sur l'aplat navy — aucune page ne casse.

---

## ADR-014 — Le surlignage de navigation signale la page courante

**Date** : 2026-08-11

**Contexte.** Rien n'indiquait sur quelle page on se trouvait : les liens du header
changeaient seulement de couleur au survol.

**Décision.** Chaque lien porte un trait vert (`primary`) en `::after`, qui se déploie de
la gauche vers la droite au survol et **reste déployé sur la page courante**. Le lien actif
porte aussi `aria-current="page"`.

L'animation passe par `transform: scaleX()` et non par `width` : la transformation est
composée par le GPU, alors qu'animer la largeur déclencherait un reflow à chaque frame.
La correspondance est **exacte pour `/`** — sinon « Accueil » resterait actif partout.

**Conséquences.** Ajouter une entrée de nav suffit : le surlignage suit automatiquement.

---

## ADR-009 — Les coordonnées personnelles ne sont pas publiées

**Date** : 2026-08-11

**Contexte.** `data/strapi/contacts.json` contient les **emails personnels et numéros de
téléphone** de Hugo Nicaise, Milan Hrmo et Yves Gérard, tels que saisis dans le
backoffice.

**Décision.** Ces champs servent uniquement à identifier les rôles (président,
co-président, trésorier). **Seule l'adresse générique `roulerpouraider60@gmail.com` est
publiée.** Aucun email ni téléphone personnel ne doit apparaître dans le rendu.

**Conséquences.** Attention en branchant `contacts.json` sur la page équipe : ne mapper
que `prenom`, `nom`, `role`. Le fichier étant commité, ne jamais l'exposer tel quel via
une route ou un endpoint.
