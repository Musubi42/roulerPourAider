# Rouler pour aider

Le site mémoriel de l'association **Rouler pour aider**, qui a pédalé de 2019 à
2024 pour les enfants de l'**Hôpital Necker – Enfants malades (AP-HP)**.

🌍 **[www.roulerpouraider.fr](https://www.roulerpouraider.fr)**

## L'aventure en chiffres

|  |  |
|---|---|
| **1ʳᵉ édition, 2020** | Lille → Nice, 1 327 km, **33 324 €** |
| **2ᵉ édition, 2024** | Tour de France, 3 000 km, 18 étapes, **70 523 €** |
| **Remis à Necker** | **103 847 €**, le 22 novembre 2024, en deux chèques |
| **Au total** | 4 327 km, 605 donateurs pour la seule édition 2024 |

> ⚠️ **Ne jamais écrire « 100 000 € » dans un texte du site.**
> « 100 000 merci » est l'accroche de la marque, pas un montant. Les vrais
> chiffres sont ceux du tableau, lus sur les chèques photographiés le 22/11/2024
> (`public/remise-des-fonds/`). Un site qui annonce un montant faux à une
> association caritative, c'est le seul bug qui compte vraiment ici.

L'association ne repartira pas sur les routes. **Le site est une trace, pas une
campagne** : il n'y a plus de collecte, plus de compte à rebours, rien à mettre à
jour au fil de l'eau. Il est fait pour tenir des années sans maintenance.

## Les pages

| Page | Ce qu'on y trouve |
|---|---|
| `/` | L'accueil : le compteur, la carte des 18 étapes, la presse |
| `/notre-aventure` | Le récit en six actes, de 2019 à l'après |
| `/equipe` | Fondateurs, cyclistes, partenaires, soutiens |
| `/presse` | Les 25 retombées presse des deux éditions |
| `/contact` | Les coordonnées de l'association |
| `/cookies`, `/mentions-legales` | Mentions légales |

## Démarrer

Il faut **Node 24** et **pnpm 8.6.11** (versions figées, voir
[Versions](#versions-figées-et-montée-de-version)).

```bash
corepack enable  # installe la version de pnpm déclarée dans package.json
pnpm install     # installer les dépendances
pnpm dev         # le site sur http://localhost:3000
```

Et c'est tout. Pas de base de données, pas de clé d'API, pas de fichier `.env` :
tout le contenu est dans le dépôt.

### ⚠️ Arrêter le serveur de développement proprement

`pnpm dev` laisse tourner un processus enfant que `Ctrl+C` ne tue pas toujours.
S'il survit, il corrompt le build suivant. Pour être sûr :

```bash
pkill -f "nuxi.mjs _dev"
```

Ne jamais lancer `pnpm build` pendant qu'un serveur de développement tourne.

## Mettre le site à jour

**Le contenu ne se modifie pas dans une interface d'administration — il n'y en a
pas.** Tout est écrit dans le dépôt, et c'est volontaire : un site qui dépend
d'un serveur, d'un CMS ou d'un abonnement finit par tomber le jour où plus
personne ne paie la facture. Ici, tant que le dépôt existe, le site peut être
reconstruit.

Où se trouve quoi :

| Pour modifier | Fichier |
|---|---|
| Le récit de `/notre-aventure` | `data/recit.js` |
| Les 18 étapes et la carte | `data/etapes-2024.js` |
| Les retombées presse | `data/presse.json` |
| Les partenaires | `data/partenaires.json` |
| L'équipe, les chiffres, les textes | directement dans `components/victory/` |

Après avoir touché `data/etapes-2024.js`, il faut régénérer la carte :

```bash
pnpm build:map
```

### Publier

Pousser sur `main`. **Vercel reconstruit et met en ligne tout seul.** Il n'y a
rien d'autre à faire — pas de commande de déploiement à lancer à la main.

Ce lien n'a rien de magique : il tient à un réglage, *Settings → Git →
Production Branch*, dans le projet Vercel. S'il pointe vers une autre branche,
pousser sur `main` ne produit qu'un déploiement de *preview* et le site public
ne bouge pas — un silence facile à prendre pour une réussite. C'est la première
chose à vérifier si une mise en ligne semble ne rien changer.

## Reprendre le projet dans deux ans

C'est le scénario pour lequel ce dépôt est rangé comme il l'est. Dans l'ordre :

1. **`CLAUDE.md`** — la fiche technique : la pile, la palette, les conventions,
   les pièges. À lire en premier.
2. **`.planning/ADR.md`** — *pourquoi* le site est fait comme ça. Chaque décision
   qui pourrait surprendre y est expliquée, avec son contexte et ce qu'elle
   coûte. C'est le document qui évite de refaire une erreur déjà écartée.
3. **`.planning/ACTIONS-HUMAINES.md`** — ce qui reste en attente d'une réponse de
   l'association, par exemple le nombre de donateurs de l'édition 2020. Ces trous
   sont **assumés et documentés** : on préfère ne rien afficher plutôt qu'inventer.

**Tout est dans le dépôt.** Il n'y a rien à récupérer ailleurs : pas de `.env`,
pas de base de données, pas de backoffice (l'ancien Strapi est éteint), pas
d'originaux d'images à retrouver. Un `git clone` suffit.

Pour pouvoir redéployer depuis ta machine (facultatif, pousser sur `main`
suffit) : `pnpm dlx vercel link`, puis choisir le projet existant. Ça recrée le
dossier `.vercel/`, ignoré de Git.

### Versions figées et montée de version

Le site a été construit et vérifié le 15/09/2026 avec :

| Outil | Version | Où elle est fixée |
|---|---|---|
| Node | 24.x (testé en 24.16) | `.nvmrc` et `engines.node` de `package.json` — **Vercel lit ce dernier** |
| pnpm | 8.6.11 | `packageManager` de `package.json`, lockfile au format v6 |
| Nuxt | 3.9.0 (Nitro 2.8.1) | `pnpm-lock.yaml` |
| Vue | 3.4.3 | `pnpm-lock.yaml` |
| Tailwind CSS | 3.4.0 | `pnpm-lock.yaml` |
| GSAP | 3.14.2 | `pnpm-lock.yaml` |

`package.json` déclare des plages (`^3.9.0`) : ce sont les **versions du
lockfile** qui sont réellement installées. Ne pas supprimer `pnpm-lock.yaml`.

**Le site en ligne ne casse pas avec le temps** : c'est du HTML statique déjà
construit. Ce qui peut casser, c'est le **prochain build**, quand Vercel ne
proposera plus Node 24. Symptôme : le déploiement échoue avec un message sur la
version de Node. Dans ce cas, dans l'ordre et un changement à la fois :

1. **Node** — passer `.nvmrc` et `engines.node` à la version LTS proposée par
   Vercel (*Settings → Build and Deployment → Node.js Version* liste les
   versions disponibles). Lancer `pnpm install && pnpm build` en local avec
   cette version. Si ça passe, pousser : c'est souvent suffisant.
2. **pnpm** — si l'installation échoue : `corepack use pnpm@latest-9` (ou la
   version courante), puis `pnpm install` régénère le lockfile. Commiter
   `package.json` et `pnpm-lock.yaml` ensemble.
3. **Nuxt 3** — rester sur Nuxt 3 : `pnpm up nuxt@^3 @nuxt/image@^1 @nuxt/devtools`
   puis `pnpm build`. Nuxt 4 est une migration, pas une mise à jour : à ne faire
   que si Nuxt 3 ne s'installe plus.
4. **Vérifier** avant de pousser : `pnpm build`, puis `pnpm preview` et un tour
   des pages (carte animée de l'accueil, `/equipe`, `/presse`). Pousser sur une
   **branche** d'abord : Vercel en fait un déploiement de *preview* à tester
   avant de fusionner dans `main`.

### Les fichiers qui se régénèrent

Trois fichiers du dépôt sont produits par un script, pas écrits à la main. Le
résultat est versionné, donc **le déploiement n'exécute jamais ces scripts** —
on ne les relance que si la source change.

```bash
pnpm build:fonts     # les polices Omnes, sous-ensemblées au latin
pnpm build:favicon   # le favicon, depuis assets/favicon/
pnpm build:map       # la carte, depuis data/etapes-2024.js
```

## Sous le capot

Nuxt 3 en **prérendu** : les pages sont générées en HTML au moment du build et
servies telles quelles par le CDN de Vercel. Il n'y a pas de serveur qui tourne.
C'est ce qui rend le site rapide, robuste, et presque gratuit à héberger.

Le site ne charge **aucun script tiers** — pas d'analytics, pas de tag manager,
pas de cookie de suivi. C'est un choix, et il explique une bonne part de ses
performances. Merci de le garder ainsi.

Le reste — Vue 3, Tailwind, GSAP pour les animations — est décrit dans
`CLAUDE.md`.

---

Fait avec beaucoup de gratitude pour les 605 donateurs, les partenaires, les
équipes de Necker, et les trois cyclistes qui ont fait les 4 327 kilomètres.
