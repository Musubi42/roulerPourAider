<template>
  <div class="pt-32 mx-auto max-w-7xl">
    <h2 class="text-2xl font-bold mb-4">Accueil</h2>
    <div class="flex flex-row items-center justify-center gap-4 mb-8">
      <div class="flex-1">
        <nuxt-img :src="images[currentImage]" alt="Carousel Image" class="w-full h-auto object-cover" />
      </div>
      <div class="flex-1 max-w-md">
        <p>Your existing text here...</p>
      </div>
    </div>

    <!-- Adjusted Grid layout for sections including the Classic Div under the right panel -->
    <div class="grid grid-cols-3 gap-4 mb-8">
      <!-- Left sections stacked -->
      <div class="col-span-1 space-y-4">
        <!-- Section 1 -->
        <div class="p-4 bg-gray-100 rounded-lg shadow">
          <h3 class="text-lg font-semibold">Section 1 Title</h3>
          <p>Random content for section 1...</p>
        </div>

        <!-- Section 2 -->
        <div class="p-4 bg-gray-200 rounded-lg shadow">
          <h3 class="text-lg font-semibold">Section 2 Title</h3>
          <p>Random content for section 2...</p>
        </div>
      </div>

      <!-- Right section twice the height -->
      <div class="col-span-2 row-span-2 bg-gray-300 rounded-lg shadow">
        <div class="p-4 h-full">
          <h3 class="text-lg font-semibold">Right Panel</h3>
          <p>Content for the right panel, which is twice the height of the two left ones.</p>
        </div>
      </div>
    </div>
        <!-- Classic Section, now outside the grid to match width with Data Section -->
    <div class="mb-8 p-4 bg-gray-100 rounded-lg shadow">
      <h3 class="text-lg font-semibold">Classic Section</h3>
      <p>This is a classic section with standard content.</p>
    </div>
    <!-- Div with Data as a separate section outside the grid -->
    <div class="p-4 bg-gray-200 rounded-lg shadow">
      <h3 class="text-lg font-semibold">Data Section</h3>
      <ul class="list-disc pl-5">
        <li>Data Point 1</li>
        <li>Data Point 2</li>
        <li>Data Point 3</li>
      </ul>
    </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      images: [
        '~/assets/images/example1.jpeg',
        '~/assets/images/example2.jpeg'
      ],


      currentImage: 0,
      interval: null
    }
  },
  methods: {
    nextImage() {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    }
  },
  mounted() {
    this.interval = setInterval(this.nextImage, 30000); // Set the interval to 30 seconds
  },
  beforeDestroy() {
    clearInterval(this.interval); // Clear the interval when the component is destroyed
  }
}
</script>
