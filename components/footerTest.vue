<template>
  <footer class="font-extralight text-sm text-secondary">
    <div class="mx-auto">
      <div class="flex justify-center">
        <NuxtLink to="/" class="block">
          <img src="/images/logoBig_roulerPourAider.png" alt="logo" class="w-32 h-32" />
        </NuxtLink>
        <nav class="ml-[5vw]">
          <ul class="list-none">
            <li class="inline-block"></li>
          </ul>
        </nav>
      </div>
      <div class="ml-[5vw] mt-8 pl-8">
        <h2 class="mb-2">Nous suivre</h2>
        <div>
          <NuxtLink to="/facebook" class="mr-4">
            <IconsFacebook class="text-4xl" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-300 mt-32 py-6">
      <div class="flex justify-center flex-row my-auto">
        <div class="flex items-center cursor-default">Rouler pour aider © 2024</div>
        <nav class="">
          <ul class="list-none flex">
            <li class="">
              <NuxtLink to="/cookies" class="mt-4 mb-6 cursor-pointer hover:text-primary">Cookies</NuxtLink>
            </li>
            <li class="">
              <NuxtLink to="/mentions-legales" class="mt-4 mb-6 cursor-pointer hover:text-primary"
                >Mentions légales</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
ul > li::before {
  content: "•";
  margin-left: 1rem;
  margin-right: 0.5rem;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
