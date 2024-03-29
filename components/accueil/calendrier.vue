<template>
  <section class="mt-10" >
    <div class="flex flex-row gap-4 mx-6 overflow-x-auto" >
      <div class="flex flex-1 justify-center text-primary font-medium py-3 px-5 rounded-xl cursor-pointer border border-primary"
        v-for="(mounth, index) in eventMounth"
        :key="index"
        @click="chooseMounth(index)"
        :class="{'bg-primary': selectedMounth[index], 'text-white': selectedMounth[index]}" >
        {{ mounth }}
      </div>
    </div>

    <div class="flex flex-col items-center" >
      <div>
      <!--  v-if="selectedMounth[index]" -->
          <div class="flex flex-col gap-4 mt-4" >
            <div class="flex flex-col gap-2" v-for="(event, index) in events[mounth]" :key="index" >
              <div class="text-primary font-medium" >
                {{ event.title }}
              </div>
              <div class="text-gray-500" >
                {{ event.date }} - {{ event.location }}
              </div>
              <a :href="googleCalendarUrl" class="text-primary underline" >
                Ajouter à mon calendrier
              </a>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
const eventMounth = ["Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre"];

const events = {
  Mars: [
    {
      title: "Événement 1",
      date: "2024-03-01",
      location: "123 Rue Exemple, Ville",
    },
    {
      title: "Événement 2",
      date: "2024-03-15",
      location: "123 Rue Exemple, Ville",
    },
  ],
  Avril: [
    {
      title: "Événement 3",
      date: "2024-04-01",
      location: "123 Rue Exemple, Ville",
    },
    {
      title: "Événement 4",
      date: "2024-04-15",
      location: "123 Rue Exemple, Ville",
    },
  ],

}

const selectedMounth = ref([true, false, false, false, false, false, false]);
const mounth = ref("Mars");

const chooseMounth = (index: number) => {
  selectedMounth.value = Array(eventMounth.length).fill(false);
  selectedMounth.value[index] = true;

  mounth.value = eventMounth[index];
}

const eventTitle = encodeURIComponent("Mon Événement");
const eventDetails = encodeURIComponent("Voici les détails de l'événement");
const eventLocation = encodeURIComponent("123 Rue Exemple, Ville");
const startDate = "20240430T090000Z"; // Format: YYYYMMDDThhmmssZ
const endDate = "20240430T110000Z";

const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDetails}&location=${eventLocation}&sf=true&output=xml`;

// Utilisez googleCalendarUrl comme l'attribut href de votre lien



</script>