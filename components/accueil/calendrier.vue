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

    <div class="flex flex-col items-center" >
      <div>
      <!--  v-if="selectedMounth[index]" -->
          <div class="flex flex-col gap-4 mt-4" >
            <div class="flex flex-col gap-2" v-for="(event, index) in events[mounth]" :key="index" >
              <div class="text-primary font-medium" >
                {{ event.title }}
              </div>
              <div class="text-gray-500" >
                {{ event.description }} 
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
    },
    {
      title: "Samedi 13 Avril",
      description: "Participation à l’opération « Savoir rouler » à Senlis",
    },
    {
      title: "Dimanche 14 Avril",
      description: "Participation au triathlon de Senlis",
    },
    {
      title: "Samedi 27 Avril",
      description: "organisation d’une tombola à Cora de Saint- Maximin",
    },
    {
      title: "Dimanche 28 Avril",
      description: "participation à la brocante de Verneuil-en- Halatte",
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