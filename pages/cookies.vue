<template>
  <div class="section-padding">
    <div class="max-w-3xl mx-auto">
      <h1 class="title-victory">Cookies</h1>

      <div class="mt-10 space-y-10 text-gray-700 leading-relaxed">
        <section>
          <p class="text-lg">
            <strong class="text-secondary">Ce site ne dépose aucun cookie.</strong>
          </p>
          <p class="mt-3">
            Ni cookie de mesure d'audience, ni cookie publicitaire, ni cookie de réseau social, ni
            cookie de personnalisation. Il n'y a donc pas de bandeau de consentement à afficher :
            rien ne nécessite votre accord, puisque rien n'est collecté.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-secondary mb-3">Pourquoi</h2>
          <p>
            Rouler pour aider a mené deux éditions, en 2020 et 2024, puis a cessé son activité. Ce
            site en est l'archive. Il n'a rien à mesurer, rien à vendre et personne à recibler.
          </p>
          <p class="mt-2">
            Les outils de mesure d'audience qui équipaient la version précédente du site ont été
            retirés lors de sa refonte. Aucune donnée de navigation n'est collectée depuis.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-secondary mb-3">Ce qui reste techniquement nécessaire</h2>
          <p>
            L'hébergeur du site, Vercel, traite les requêtes reçues par ses serveurs et peut
            conserver des journaux techniques — adresse IP, date et heure, page demandée. Ce
            traitement relève de la sécurité et du bon fonctionnement du service, il ne donne lieu à
            aucun cookie déposé sur votre appareil ni à aucun profilage.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-secondary mb-3">Les liens vers l'extérieur</h2>
          <p>
            Certaines pages renvoient vers des sites tiers : les publications de l'association sur
            Facebook, Instagram, LinkedIn et YouTube, ainsi que les articles de presse consacrés aux
            deux éditions.
          </p>
          <p class="mt-2">
            Aucun de ces contenus n'est intégré dans nos pages — ce sont de simples liens. Tant que
            vous ne cliquez pas, aucun de ces services ne sait que vous êtes ici. En revanche, dès
            que vous suivez un lien, c'est la politique de cookies du site de destination qui
            s'applique.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-secondary mb-3">Une question</h2>
          <p>
            Écrivez-nous à
            <a
              href="mailto:roulerpouraider60@gmail.com"
              class="text-secondary underline underline-offset-4 hover:text-primary transition-colors"
              >roulerpouraider60@gmail.com</a
            >. Voir également nos
            <NuxtLink
              to="/mentions-legales"
              class="text-secondary underline underline-offset-4 hover:text-primary transition-colors"
              >mentions légales</NuxtLink
            >.
          </p>
        </section>
      </div>

      <p class="mt-12 text-sm text-gray-500">Dernière mise à jour : août 2026.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'victory' });

useSeoMeta({
  title: 'Cookies — Rouler pour aider',
  description:
    "Ce site ne dépose aucun cookie : ni mesure d'audience, ni publicité, ni réseau social. Aucune donnée de navigation n'est collectée.",
  ogTitle: 'Cookies — Rouler pour aider',
  ogDescription: "Ce site ne dépose aucun cookie : ni mesure d'audience, ni publicité, ni réseau social.",
});
</script>
