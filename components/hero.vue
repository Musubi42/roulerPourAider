<template>
  <div class="hero-container">
    <div class="breadcrumb-container">
      <!-- You would import your breadcrumb component and include it here -->
      <BreadcrumbComponent />
    </div>
    <div class="content-container">
      <h1 class="title">News</h1>
      <button class="cta">Contact the press office</button>
    </div>
  </div>
</template>

<script setup>
// Import your breadcrumb component
// import BreadcrumbComponent from '~/components/BreadcrumbComponent.vue';
</script>

<style scoped>
.hero-container {
  display: flex;
  width: 100%;
  height: 80vh; /* Adjust the height as needed */
  background-image: url('/hero.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.breadcrumb-container {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content-container {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 2em;
  margin-bottom: 20px;
}

.cta {
  padding: 10px 20px;
  background-color: red; /* Example color, adjust as needed */
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta:hover {
  background-color: darkred; /* Example hover state color, adjust as needed */
}
</style>
