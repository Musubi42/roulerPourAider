<template>
  <!-- Layout nu : aucun header, aucun footer, aucune marge. Sert aux pages de
       test où l'on veut juger un composant seul.

       `<NuxtPage />` et non `<slot />` : c'est la convention des autres layouts
       du projet (`default.vue`, `victory.vue`), imposée par un `app.vue` qui ne
       contient qu'un `<NuxtLayout />`. Avec un `<slot />`, la page ne s'injecte
       nulle part et l'écran reste blanc. -->
  <NuxtPage />
</template>
