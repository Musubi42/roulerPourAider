<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h2 class="text-2xl font-bold mb-4">Qui sommes-nous?</h2>
    <p class="text-gray-600 mb-6">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    
    <!-- Regular Image under the section -->
    <div>
      <img src="~/assets/images/example1.jpg" alt="Our Team" class="w-full h-auto object-cover rounded-lg shadow-lg">
    </div>
  </div>
</template>

<script>
export default {
  // Page Metadata for SEO, adjust as needed
  head() {
    return {
      title: 'Qui sommes-nous - Your Company Name',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Learn about our company, our values, and our mission.'
        }
      ]
    };
  },
};
</script>
