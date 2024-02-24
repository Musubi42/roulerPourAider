<template>
  <div class="max-w-4xl mx-auto py-16">
    <h2 class="text-2xl font-bold mb-6">Contactez nous!</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
        <input type="text" id="name" v-model="form.name" class="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm" required>
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" v-model="form.email" class="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm" required>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" v-model="form.description" rows="4" class="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm" required></textarea>
      </div>

      <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Send Message
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        description: '',
      },
    };
  },
  methods: {
    submitForm() {
      // Here you would handle the form submission.
      console.log("Form submitted:", this.form);
      // For example, send the form data to an API endpoint.
      // This part is left as an exercise.
    },
  },
};
</script>
