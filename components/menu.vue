
<template>
  <div class="cursor-none z-50">
    <div
      class="h-full bg-secondary w-10 md:w-80 right-0 fixed z-[20] transform translate-x-full"
      :class="{ animate: !isMenuOpen }"
      id="separation" ></div>
    <div
      class="bg-close h-screen bg-secondary flex flex-row items-center fixed z-[20] right-0 w-full md:w-1/2 transform translate-x-full"
      aria-label="menu"
      id="bg" >
      <div
        class="top-10 relative md:absolute md:right-0 z-auto md:transform md:translate-x-full flex flex-col items-center md:block ml-[20%] md:ml-0"
        id="title"
        :class="{ animate: !isMenuOpen }" >

        <div
          class="text-2xl text-white font-semibold my-auto flex flex-col place-content-between gap-6"
        >
            <div class="z-10 relative">
              <NuxtLink
                to="/"
                class="block hover:text-gold transition-colors"
                @click="goToPage"
                >Accueil</NuxtLink
              >
            </div>
            <div class="z-10 relative">
              <NuxtLink
                to="/notre-aventure"
                class="block hover:text-gold transition-colors"
                @click="goToPage"
                >Notre Aventure</NuxtLink
              >
            </div>
            <div class="z-10 relative">
              <NuxtLink
                to="/equipe"
                class="block hover:text-gold transition-colors"
                @click="goToPage"
                >L'équipe</NuxtLink
              >
            </div>
            <div class="z-10 relative">
              <NuxtLink
                to="/presse"
                class="block hover:text-gold transition-colors"
                @click="goToPage"
                >Presse</NuxtLink
              >
            </div>
            <div class="z-10 relative">
              <NuxtLink
                to="/contact"
                class="block hover:text-gold transition-colors"
                @click="goToPage"
                >Contact</NuxtLink
              >
            </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#separation {
  transition: all 0.1s ease-in-out;
}

#separation.animate {
  transform: translateX(100%);
}

#title {
  transition: all 0.5s ease-in-out;
}

#title.animate {
  transform: translateX(100%);
}

#bg {
  transition: all 0.5s cubic-bezier(0.89, 0.06, 0.45, 0.97);
}

#bg.animate {
  transform: translateX(100%);
}

.bg-close {
  transform: translateX(100%);
}

.bg-open {
  transform: translateX(0px);
}
</style>

<script>
export default {
  props: ["isMenuOpen"],
  watch: {
    isMenuOpen() {
      this.isMenuOpen ? this.openMenu() : this.closeMenu();
    },
  },
  methods: {
    goToPage() {
      this.closeMenu();
      this.$emit("update:isMenuOpen", !this.isMenuOpen);
    },
    openMenu() {
      const separationWidth = (window.innerWidth / 2) * 0.2;
      document.getElementById("separation").style.width = `${separationWidth}px`;

      document.getElementById("separation").style.transform = "translateX(0)";
      document.getElementById("separation").style.transition = "all 0.1s ease-in-out";

      setTimeout(function () {
        document.getElementById(
          "title"
        ).style.transform = `translateX(-${separationWidth}px)`;
        document.getElementById("title").style.transition = "all 0.5s ease-in-out";
      }, 0);

      document.getElementById("bg").classList.remove("bg-close");
      document.getElementById("bg").classList.add("bg-open");
      document.getElementById("bg").style.transition =
        "transform 0.5s cubic-bezier(0, 0.75, 0.83, 0.67)";
    },
    closeMenu() {
      document.getElementById("separation").style.display = "block";

      setTimeout(function () {
        document.getElementById("separation").style.transform = "translateX(100%)";
        document.getElementById("separation").style.transition = "all 0.1s ease-in-out";
      }, 400);

      document.getElementById("title").style.transform = "translateX(100%)";
      document.getElementById("title").style.transition = "all 0.5s ease-in-out";

      setTimeout(function () {
        document.getElementById("bg").classList.remove("bg-open");
        document.getElementById("bg").classList.add("bg-close");
      }, 100);
    },
  },
};
</script>
