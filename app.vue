<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup>
// Metadonnees communes a toutes les pages : lang, apercu de partage, canonique.
useSiteSeo();

// Repli sans JavaScript. Les revelations au scroll posent `opacity-0` sur le
// contenu et comptent sur GSAP pour le devoiler : sans JS, la page est servie
// complete mais reste blanche a l'ecran. Un site memorial doit rester lisible
// meme quand son JavaScript ne se charge plus.
//
// Ce bloc passe par `useHead` et non par le template : le compilateur Vue
// ignore les balises a effet de bord (`<script>`, `<style>`) dans un template
// de composant, le `<noscript><style>` y etait donc silencieusement supprime
// avant d'atteindre le HTML prerendu.
useHead({
  noscript: [
    {
      children:
        '<style>.opacity-0{opacity:1!important}.translate-y-8{transform:none!important}</style>',
    },
  ],
});
</script>
