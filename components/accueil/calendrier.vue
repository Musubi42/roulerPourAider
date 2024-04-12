<template>
  <section class="mt-10" >
    <div class="flex flex-row gap-4 -mx-6 px-4 md:px-6 py-6 bg-secondary/20 overflow-x-auto" >
      <div class="flex flex-1 justify-center text-primary font-medium py-3 px-5 rounded-xl cursor-pointer border border-primary"
        v-for="(mounth, index) in eventMounth"
        :key="index"
        @click="chooseMounth(index)"
        :class="{'bg-primary': selectedMounth[index], 'text-white': selectedMounth[index]}" >
        {{ mounth }}
      </div>
    </div>

    <div class="flex flex-wrap items-center">
      <div class="w-full sm:w-1/2 md:w-1/3 p-4" v-for="(event, index) in events[mounth]" :key="index">
        <div class="flex flex-col gap-2 border-primary border p-4 rounded-xl">
          <div class="text-primary font-semibold">
            {{ event.title }}
          </div>
          <div class="text-gray-500 text-ellipsis line-clamp-3 whitespace-break-spaces overflow-hidden min-h-[70px]">
            {{ event.description }} 
          </div>
          <a :href="buildGoogleCalendarLink(event.title, event.description, event.location, event.start, event.end)" class="text-primary underline">
            Ajouter à mon calendrier
          </a>
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
      title: "Mercredi 27 Mars",
      description: "Lancement du projet et communication au grand public",
    },
    {
      title: "Dimanche 31 Mars",
      description: "Participation à l’événement Pâques Hachette à Beauvais"
    },
  ],
  Avril: [
    {
      title: "Samedi 6 Avril",
      description: "Tombola au village Olympique de Beauvais",
    },
    {
      title: "Du 12 au 21 Avril",
      description: "participation à la Course croisière EDHEC en tant qu’association partenaire de la journée handisport",
      location: "24 Av. Gustave Delory, 59100 Roubaix",
    },
    {
      title: "Samedi 13 Avril",
      description: "Participation à l’opération « Savoir rouler » à Senlis",
      location: "Senlis, 60300, France"
    },
    {
      title: "Dimanche 14 Avril",
      description: "Participation au triathlon de Senlis",
      location: "Senlis, 60300, France"
    },
    {
      title: "Samedi 27 Avril",
      description: "organisation d’une tombola à Cora de Saint-Maximin",
      location: "Rue de la Mardelle, 60740 Saint-Maximin"
    },
    {
      title: "Dimanche 28 Avril",
      description: "participation à la brocante de Verneuil-en-Halatte",
      location: "Verneuil-en-Halatte, 60550",
      start: "20240428T090000Z",
      end: "20240428T110000Z"
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
const eventLocation = encodeURIComponent("Senlis, 60300 Senlis, France");
const startDate = "20240430T090000Z"; // Format: YYYYMMDDThhmmssZ
const endDate = "20240430T110000Z";

const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDetails}&location=${eventLocation}&sf=true&output=xml`;

// Utilisez googleCalendarUrl comme l'attribut href de votre lien
const buildGoogleCalendarLink = (title, description, location, startDate, endDate) => {
  const eventTitle = encodeURIComponent(title);
  const eventDetails = encodeURIComponent(description);
  const eventLocation = encodeURIComponent(location);
  const formattedStartDate = encodeURIComponent(startDate);
  const formattedEndDate = encodeURIComponent(endDate);

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${formattedStartDate}/${formattedEndDate}&details=${eventDetails}&location=${eventLocation}&sf=true&output=xml`;
};



</script>