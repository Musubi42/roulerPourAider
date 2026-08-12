<template>
  <div class="section-padding">
    <div class="max-w-3xl mx-auto">
      <h1 class="title-victory">Mentions légales</h1>

      <div class="mt-10 space-y-10 text-gray-700 leading-relaxed">
        <section>
          <h2 class="text-xl font-bold text-secondary mb-3">Éditeur du site</h2>
          <p>
            <strong>Rouler pour aider</strong>, association régie par la loi du 1<sup>er</sup> juillet
            1901 et le décret du 16 août 1901.
          </p>
          <p class="mt-2">
            Siège social : 10 rue Jean Jaurès, 60550 Verneuil-en-Halatte, France.
          </p>
          <p class="mt-2">
            Courriel :
            <a
              href="mailto:roulerpouraider60@gmail.com"
              class="text-secondary underline underline-offset-4 hover:text-primary transition-colors"
              >roulerpouraider60@gmail.com</a
            >
          </p>
          <p class="mt-2">
            Numéro RNA : <span class="text-gray-500">[à compléter]</span>
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-secondary mb-3">Direction de la publication</h2>
          <p>Hugo Nicaise, président de l'association.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-secondary mb-3">Hébergement</h2>
          <p>
            Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-secondary underline underline-offset-4 hover:text-primary transition-colors"
              >vercel.com</a
            >
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-secondary mb-3">Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site — textes, photographies, illustrations, logotypes et éléments
            graphiques — est protégé par le droit d'auteur. Les photographies des deux éditions sont
            la propriété de l'association ou de leurs auteurs respectifs.
          </p>
          <p class="mt-2">
            Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite
            préalable, est interdite. Les logos des partenaires et le label Grande Cause Nationale
            demeurent la propriété de leurs titulaires et sont reproduits avec leur accord.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-secondary mb-3">Données personnelles</h2>
          <p>
            Ce site est un site d'archive. Il ne comporte aucun formulaire, ne collecte aucune donnée
            personnelle et n'utilise aucun outil de mesure d'audience ni de traceur publicitaire.
            Aucune donnée n'est transmise à un tiers.
          </p>
          <p class="mt-2">
            Conformément au règlement (UE) 2016/679 et à la loi « Informatique et Libertés », vous
            disposez d'un droit d'accès, de rectification et d'effacement des données vous
            concernant. Ces droits s'exercent par courriel à l'adresse indiquée ci-dessus.
          </p>
          <p class="mt-2">
            Voir également notre
            <NuxtLink
              to="/cookies"
              class="text-secondary underline underline-offset-4 hover:text-primary transition-colors"
              >politique relative aux cookies</NuxtLink
            >.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-secondary mb-3">Liens externes</h2>
          <p>
            Ce site renvoie vers des sites tiers, notamment les publications de l'association sur les
            réseaux sociaux et les articles de presse consacrés aux deux éditions. L'association
            n'exerce aucun contrôle sur ces contenus et décline toute responsabilité quant à leur
            disponibilité et à leur exactitude.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-secondary mb-3">Dons</h2>
          <p>
            Les collectes des éditions 2020 et 2024 sont closes. Ce site ne recueille plus aucun don
            et ne comporte aucun moyen de paiement. Les sommes récoltées ont été intégralement
            reversées à l'Hôpital Necker – Enfants malades (AP-HP), via la Fondation Hôpitaux de
            Paris – Hôpitaux de France.
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
  title: 'Mentions légales — Rouler pour aider',
  description:
    "Mentions légales du site de l'association Rouler pour aider : éditeur, direction de la publication, hébergement, propriété intellectuelle et données personnelles.",
  ogTitle: 'Mentions légales — Rouler pour aider',
  ogDescription: "Éditeur, direction de la publication, hébergement et données personnelles du site Rouler pour aider.",
});
</script>
