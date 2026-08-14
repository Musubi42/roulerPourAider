/**
 * Le récit de l'aventure, en six actes. Source de `components/victory/RouteStory.vue`.
 *
 * ── RÈGLES D'ÉCRITURE ────────────────────────────────────────────────────
 * Registre « promesse tenue » (`.planning/REFONTE-2026.md` §2) : tout au passé,
 * des faits et des chiffres, aucun superlatif, aucune citation sans source
 * (ADR-007), aucune donnée inventée là où elle manque (ADR-012).
 *
 * Les montants sont ceux des chèques photographiés le 22/11/2024 :
 * 33 324 € (édition 1) + 70 523 € (édition 2) = 103 847 €. Ne jamais écrire
 * « 100 000 € » en texte courant — c'est l'accroche de marque, pas un montant
 * (ADR-011).
 *
 * ── LE COMPTEUR ──────────────────────────────────────────────────────────
 * `compteur` est affiché en or dans le rail. Il est DISCRET, pas interpolé :
 * ce sont des faits, pas un odomètre. D'où le palier de trois ans à
 * 1 327 km — c'est justement ce qu'il raconte — et le changement d'unité au
 * cinquième acte, quand la route s'arrête et que le chiffre qui reste est en
 * euros.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Chaque acte porte toutes les clés, même vides : le composant les lit sans
 * garde, et une clé absente passerait inaperçue à la relecture.
 *
 * ── LE CADRAGE ───────────────────────────────────────────────────────────
 * `cadrage` est l'`object-position` de la photo dans sa vignette. Où se trouve
 * le sujet est une propriété de la PHOTO, pas de la mise en page : on la note
 * ici plutôt que de recouper les fichiers.
 *
 * Recouper serait doublement faux. `public/steps/*.webp` sert aussi la carte de
 * l'accueil, en silhouette de France — un recadrage pour le récit y ferait des
 * dégâts ; et ces fichiers sont générés par `utils/importSteps.mjs`, donc
 * écrasés au prochain import. Même mot que la prop `cadrage` de `PageHero`.
 *
 * `null` = centré, ce qui convient à la plupart des photos. Ne renseigner que
 * celles dont le sujet n'est pas au centre.
 *
 * ATTENTION — seul le SECOND nombre agit ici. `object-position` ne déplace la
 * photo que sur l'axe où elle déborde de sa vignette, et toutes nos photos sont
 * plus « hautes » que leur cadre (ratios 0,67 à 1,33 pour un cadre 3/2 = 1,5 ou
 * 16/9 = 1,78) : elles sont donc rognées en hauteur, jamais en largeur. Changer
 * le premier nombre ne produit rien. Trois photos ont même le ratio exact de
 * leur cadre (`2020-arrivee-nice`, `nice-celebration`, `fresque`) : aucun des
 * deux axes n'y a d'effet, il n'y a rien à rogner.
 *
 * ── LE ZOOM ──────────────────────────────────────────────────────────────
 * Recadrer horizontalement suppose donc d'agrandir d'abord : `zoom` (un
 * facteur, 1.3 = +30 %) puis `deplacement` (un `translate` CSS, en % du cadre).
 * Au-delà de ±(zoom−1)/2, le déplacement découvre le fond. Et ce que `cadrage`
 * a coupé est perdu : le zoom agrandit la vignette, pas la photo d'origine —
 * s'il manque de la matière en haut, c'est `cadrage` qu'il faut baisser.
 *
 * ── RÉGLER UN CADRAGE, DANS LE NAVIGATEUR ────────────────────────────────
 * Se régler à l'œil plutôt qu'à l'aveugle ici. Sur `/notre-aventure`, console
 * ouverte, coller une fois :
 *
 *   window.cadre = (slug, css) => {
 *     const img = [...document.querySelectorAll('img')]
 *       .find(i => (i.currentSrc || i.src).includes(slug));
 *     if (!img) return console.warn('pas trouvée :', slug);
 *     Object.assign(img.style, css);
 *     img.scrollIntoView({ block: 'center', behavior: 'smooth' });
 *     return img;
 *   };
 *
 * puis itérer, flèche haut, en changeant un chiffre :
 *
 *   cadre('plateau-de-beille', { objectPosition: '50% 0%', scale: '1.3', translate: '-15% 15%' })
 *
 * Les trois propriétés CSS portent le même nom que les trois clés ci-dessus,
 * dans le même ordre. Un piège : les photos sont en `loading="lazy"`, il faut
 * avoir scrollé jusqu'à l'acte pour que la sienne soit dans le DOM.
 *
 * Même méthode pour les photos de la carte d'accueil, avec un outil différent :
 * cf. `data/etapes-2024.js`.
 *
 * @typedef {{ src: string, alt: string, legende: string | null, cadrage?: string, zoom?: number, deplacement?: string }} Photo
 * @typedef {{ texte: string, source: string, date: string | null, url: string | null }} Citation
 */

/**
 * @type {Array<{
 *   id: string, jalon: string, date: string, titre: string,
 *   compteur: string, compteurLegende: string,
 *   chiffres: string[] | null, paragraphes: string[],
 *   citation: Citation | null, photos: Photo[],
 * }>}
 */
export const actes = [
  {
    id: 'acte-2019',
    jalon: '2019',
    date: '2019',
    titre: "L'association est créée",
    compteur: '0 km',
    compteurLegende: 'au compteur, au départ',
    chiffres: ['3 étudiants', '0 kilomètre'],
    paragraphes: [
      "Rouler pour aider est créée en 2019 par des étudiants de l'Oise, avec un objet simple : se servir du vélo pour récolter des dons au profit de l'Hôpital Necker – Enfants malades AP-HP.",
      "Le premier défi est annoncé avant d'être préparé — traverser la France du nord au sud, de Lille à Nice. À ce moment-là, l'association n'a ni partenaire, ni budget, ni un kilomètre à son compteur.",
    ],
    citation: null,
    photos: [],
  },

  {
    id: 'acte-2020',
    jalon: '2020',
    date: 'Été 2020',
    titre: 'Lille → Nice',
    compteur: '1 327 km',
    compteurLegende: 'première édition',
    chiffres: ['1 327 km', '33 324 €', '3 cyclistes'],
    paragraphes: [
      "Première édition. Hugo Nicaise, Milan Hrmo et Alexandre Ioos relient Lille à Nice à vélo : 1 327 kilomètres du nord au sud.",
      "La presse régionale suit le trajet — France 3, le Courrier picard, L'Est éclair, Nice-Matin. À l'arrivée sur la promenade des Anglais, la collecte atteint 33 324 €, destinés à l'Hôpital Necker.",
      "La deuxième édition ne partira que quatre ans plus tard. Entre les deux, tout reste à construire.",
    ],
    citation: null,
    photos: [
      {
        src: '/1ere-edition/depart-lille.webp',
        alt: 'Le départ de la première édition, depuis Lille, en 2020',
        legende: 'Le départ de Lille.',
      },
      {
        src: '/1ere-edition/2020-arrivee-nice.webp',
        alt: 'Les trois cyclistes et leurs vélos devant le panneau #ILoveNICE, à l’arrivée',
        legende: "L'arrivée à Nice, au terme des 1 327 kilomètres.",
      },
      {
        src: '/1ere-edition/nice-celebration.webp',
        alt: "Deux cyclistes s'étreignent à l'arrivée, à Nice",
        legende: "La joie d'avoir atteint l'objectif.",
      },
    ],
  },

  {
    id: 'acte-2021-2023',
    jalon: '2021–23',
    date: '2021 – 2023',
    titre: 'Trois ans sans un kilomètre',
    compteur: '1 327 km',
    compteurLegende: 'toujours : aucun kilomètre en trois ans',
    chiffres: ['3 ans', '0 kilomètre parcouru'],
    paragraphes: [
      "Entre les deux éditions, l'association ne roule pas. Elle se structure : partenaires, budget, logistique, autorisations. C'est la partie du projet que personne ne voit passer.",
      "Pendant ce temps, les 33 324 € de la première édition prennent une forme concrète à Necker : des fauteuils-lits pour que les parents dorment auprès de leur enfant, des semaines d'animation, des services redécorés.",
      "Le ministère des Sports finit par labelliser le projet Grande Cause Nationale. La deuxième édition peut être annoncée — cette fois, un tour de France complet, en boucle.",
    ],
    citation: null,
    photos: [
      {
        src: '/hopital-necker-visite/fauteuil-lit.webp',
        // photo en portrait, le fauteuil occupe la moitié basse
        cadrage: '50% 60%',
        alt: "Un fauteuil-lit installé dans une chambre de l'hôpital",
        legende: 'Un fauteuil-lit, dans une chambre de Necker.',
      },
      {
        src: '/hopital-necker-visite/fresque.webp',
        alt: "Un membre de l'association devant une fresque murale, dans un couloir de l'hôpital",
        legende: "Une visite de l'association à l'hôpital, après la première édition.",
      },
    ],
  },

  {
    id: 'acte-2024-tour',
    jalon: 'Juil. 2024',
    date: '7 – 25 juillet 2024',
    titre: 'Le tour de France, en boucle',
    compteur: '4 327 km',
    compteurLegende: 'cumulés sur les deux éditions',
    chiffres: ['18 étapes', '3 000 km', '19 jours'],
    paragraphes: [
      "Deuxième édition : dix-huit étapes en boucle, au départ et à l'arrivée de Verneuil-en-Halatte, du 7 au 25 juillet 2024. Le tracé complet, étape par étape, est sur la page d'accueil.",
      "L'objectif de collecte est fixé à 60 000 €.",
      "Dix-neuf jours plus tard, le compteur des deux éditions affiche 4 327 kilomètres.",
    ],
    citation: null,
    photos: [
      {
        // Le fichier porte le slug de l'étape 1 (c'est la carte de l'accueil qui
        // le nomme), mais la photo est prise devant l'Hôpital Necker, à Paris.
        // Cf. .planning/ACTIONS-HUMAINES.md : à trancher pour la carte.
        src: '/steps/verneuil-en-halatte.webp',
        alt: "Le groupe devant la porte de l'Hôpital Necker – Enfants malades, à Paris",
        legende: "Devant l'Hôpital Necker, à Paris.",
        // Cadrage haut : centrée, la vignette 3/2 coupait l'inscription
        // « HOPITAL NECKER » gravée au fronton. À 20 %, on garde le fronton ET
        // le groupe, qui se tient tout en bas — la fenêtre est prise entre les
        // deux, il n'y a pas de latitude pour resserrer sur les visages.
        // Le 50 % est là par convention d'écriture : l'axe horizontal n'a aucun
        // effet ici (cf. l'avertissement en tête de fichier).
        cadrage: '50% 20%',
      },
      {
        src: '/steps/plateau-de-beille.webp',
        // Les deux coureurs sont dans la moitié droite, avec une large bande de
        // route vide à gauche. On prend la photo par le haut (les casques y
        // sont), on agrandit, et on ramène les coureurs au centre.
        cadrage: '50% 0%',
        zoom: 1.3,
        deplacement: '-15% 15%',
        alt: 'Ascension du plateau de Beille',
        legende: 'Le plateau de Beille.',
      },
      {
        src: '/steps/lourdes.webp',
        // Le sujet — les deux coureurs, le vélo brandi, le panneau du col —
        // tient dans la moitié gauche ; le reste est du ciel de pluie.
        cadrage: '40% 30%',
        zoom: 1.35,
        deplacement: '15% 0%',
        alt: 'Étape de Lourdes',
        legende: 'Lourdes.',
      },
      { src: '/steps/annecy.webp', alt: "Étape d'Annecy", legende: 'Annecy.' },
    ],
  },

  {
    id: 'acte-remise',
    jalon: 'Nov. 2024',
    date: '22 novembre 2024',
    titre: 'Deux chèques à Necker',
    compteur: '103 847 €',
    compteurLegende: 'remis à Necker, en deux chèques',
    chiffres: ['70 523 €', '103 847 €', '605 donateurs en 2024'],
    paragraphes: [
      "Le 22 novembre 2024, l'association remet à la directrice et aux équipes de l'Hôpital Necker – Enfants malades AP-HP le chèque de la deuxième édition : 70 523 €. L'objectif de 60 000 € est dépassé de 10 523 €.",
      "Un second chèque est signé le même jour, de 103 847 € : le cumul des deux éditions. L'association y associe Alexandre Ioos, avec qui elle avait partagé la première.",
      "Les fonds vont au bien-être des enfants hospitalisés et de leurs familles. La collecte de 2024 a réuni 605 donateurs.",
    ],
    citation: {
      // Publication de l'association, novembre 2024. Ce sont ses propres mots,
      // pas ceux d'un journaliste : la mention le dit explicitement (ADR-007).
      texte:
        "Ça n'est qu'1 % du Z Event ou 0,1 % du Téléthon, mais regardez qui nous sommes : personne.",
      source: "Rouler pour aider, publication de l'association",
      date: 'novembre 2024',
      url: null,
    },
    photos: [
      {
        src: '/remise-des-fonds/cheque-103847-fondateurs.webp',
        // sans ça, la vignette 16/9 ne montrait que les torses et le chèque, pas les visages
        cadrage: '50% 5%',
        alt: "Hugo Nicaise et Milan Hrmo remettent le chèque de 103 847 € à l'Hôpital Necker",
        legende:
          'Le chèque des deux éditions, 103 847 €, remis à l’Hôpital Necker – Enfants malades AP-HP.',
      },
      {
        src: '/remise-des-fonds/cheque-70523-equipes-necker.webp',
        alt: "La remise du chèque de 70 523 € aux équipes de l'hôpital",
        legende: 'Le chèque de la deuxième édition, 70 523 €, remis aux équipes.',
      },
      {
        src: '/remise-des-fonds/les-deux-cheques.webp',
        alt: 'Les deux chèques signés, posés sur une table',
        legende: 'Les deux chèques, signés et datés du 22 novembre 2024.',
      },
    ],
  },

  {
    id: 'acte-apres',
    jalon: 'Après',
    date: 'Décembre 2024',
    titre: 'Pas de troisième édition',
    compteur: '103 847 €',
    compteurLegende: 'remis à Necker, en deux chèques',
    chiffres: ['2 éditions', '4 327 km', '103 847 €'],
    paragraphes: [
      "Rouler pour aider s'arrête après l'édition 2024. Il n'y aura pas de troisième traversée.",
      // Distinction confirmée par l'association. Le lien de l'article annonçant
      // le résultat manque encore (le Courrier picard bloque les robots) :
      // cf. .planning/ACTIONS-HUMAINES.md. La formulation reste factuelle et
      // sans superlatif tant que la source n'est pas au dossier.
      "En fin d'année, le Courrier picard classe l'association première de ses « héros du quotidien » 2024.",
      "Ce que l'association laisse tient en trois chiffres et une preuve : deux éditions, 4 327 kilomètres, 103 847 € remis à un hôpital. Le reste — les partenaires, les bénévoles, les inconnus rencontrés au bord des routes — n'a pas de compteur.",
    ],
    citation: {
      texte: 'Qui sauve une vie, sauve l’humanité tout entière.',
      source: 'Grande Cause Nationale',
      date: '13 décembre 2024',
      url: 'https://archive.grandecause-sport.fr/actu/rouler-pour-aider-quand-le-sport-se-met-au-service-des-enfants-malades',
    },
    photos: [],
  },
];
