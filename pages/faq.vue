<template>
  <div class="max-w-4xl mx-auto py-16">
    <h2 class="text-2xl font-bold mb-8">Foire aux questions</h2>
    <div class="space-y-6">
      <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 pb-4">
        <h3 class="font-semibold text-lg text-blue-600">{{ faq.question }}</h3>
        <p class="mt-2 text-gray-600">{{ faq.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqs: [
        {
          question: 'What is Vue.js?',
          answer: 'Vue.js is a progressive JavaScript framework used for building user interfaces and single-page applications.'
        },
        {
          question: 'How do I install Vue?',
          answer: 'You can install Vue by using the Vue CLI or by including it directly with a script tag.'
        },
        {
          question: 'What is Nuxt.js?',
          answer: 'Nuxt.js is a higher-level framework that builds on top of Vue. It simplifies the development of universal or single-page Vue apps.'
        },
        // Add more FAQs as needed
      ],
    };
  },
};
</script>
