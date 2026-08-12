<template>
  <header class="fixed block w-full z-50 transition-colors duration-300"
    :class="isSolid ? 'bg-white shadow-lg' : 'bg-transparent'">
    <nav class="z-[1000]">
      <div class="px-4 md:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo. h-12 dans une barre de h-16 : il respire au lieu de la remplir
               bord a bord, et `items-center` le centre verticalement. -->
          <NuxtLink class="flex items-center" to="/" aria-label="Rouler pour aider — accueil">
            <!-- `width` explicite : sans lui, le provider Vercel retombe sur
                 la plus grande valeur de `screens` (1536 px) et sert 121 Ko
                 pour un logo affiché en 48 px de haut. 320 est la plus petite
                 largeur du jeu par defaut. -->
            <NuxtImg
              width="320"
              quality="80"
              class="h-12 w-auto cursor-pointer"
              src="/images/logoBig_roulerPourAider.png"
              alt="Logo Rouler pour aider"
            />
          </NuxtLink>

          <!-- Menu burger pour mobile -->
          <div class="lg:hidden ml-auto z-50">
            <button
              aria-label="Menu"
              class="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              @click="toggleMobileMenu">
              <span class="block w-7 h-0.5 transition-all duration-300"
                :class="[barColor, { 'rotate-45 translate-y-2': isMobileMenuOpen }]"></span>
              <span class="block w-7 h-0.5 transition-all duration-300"
                :class="[barColor, { 'opacity-0': isMobileMenuOpen }]"></span>
              <span class="block w-7 h-0.5 transition-all duration-300"
                :class="[barColor, { '-rotate-45 -translate-y-2': isMobileMenuOpen }]"></span>
            </button>
          </div>

          <!-- Desktop nav -->
          <ul class="hidden lg:flex lg:space-x-8 items-center font-medium transition-colors duration-300"
            :class="navColor">
            <li v-for="link in links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="nav-link hover:text-primary transition-colors"
                :class="{ 'is-active': estActif(link.to) }"
                :aria-current="estActif(link.to) ? 'page' : undefined"
              >{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="lg:hidden bg-white shadow-lg">
        <ul class="flex flex-col items-center py-6 space-y-4 text-secondary font-medium">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="nav-link hover:text-primary"
              :class="{ 'is-active': estActif(link.to) }"
              :aria-current="estActif(link.to) ? 'page' : undefined"
              @click="closeMobileMenu"
            >{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/*
  Surlignage de navigation.
  Le trait vert se deploie de la gauche vers la droite au survol, et reste
  deploye sur la page courante — c'est ce qui signale ou l'on se trouve.
  Anime via scaleX plutot que via width : la transformation est composee par le
  GPU, la largeur declencherait un reflow a chaque frame.
*/
.nav-link {
  position: relative;
  padding-bottom: 0.35rem;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: theme("colors.primary");
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

.nav-link:hover::after,
.nav-link:focus-visible::after,
.nav-link.is-active::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .nav-link::after {
    transition: none;
  }
}
</style>

<script setup lang="ts">
const route = useRoute();

const links = [
  { to: "/", label: "Accueil" },
  { to: "/notre-aventure", label: "Notre aventure" },
  { to: "/equipe", label: "L'équipe" },
  { to: "/presse", label: "Presse" },
  { to: "/contact", label: "Contact" },
];

// `/` doit correspondre exactement, sinon l'accueil resterait actif sur toutes
// les pages. Les autres acceptent les sous-routes eventuelles.
const estActif = (to: string) =>
  to === '/' ? route.path === '/' : route.path.startsWith(to);

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// Les pages a hero sombre (`heroHeader: true` dans definePageMeta) tolerent un
// header transparent a texte blanc. Les autres (contact, cookies, mentions)
// ont un fond clair des le haut : le header doit y etre opaque d'emblee,
// sinon le texte blanc devient invisible.
const isOverHero = computed(() => route.meta.heroHeader === true);
const isSolid = computed(() => isScrolled.value || !isOverHero.value);

const navColor = computed(() => (isSolid.value ? "text-secondary" : "text-white"));
const barColor = computed(() => (isSolid.value ? "bg-secondary" : "bg-white"));

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : '';
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

const checkScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  checkScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>
