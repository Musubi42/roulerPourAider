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
      <div class="w-full sm:w-1/2 md:w-1/3 p-4" v-for="(event, index) in evenements[mounth]" :key="index">
        <div class="relative" >
        <!-- :style="{ 'border-color': event?.isPast ? 'gray' : 'lawngreen' }" -->
          <div class="flex flex-col gap-2 border p-4 rounded-xl ombre"
            :class="{'border-primary': !event.isPast, 'border-gray-300': event.isPast, 'cursor-not-allowed': event?.isPast }">
            <div class="flex flex-row place-content-between items-center">
              <div class="text-primary font-semibold">
                {{ event.titre }}
              </div>
              <div v-if="event?.isPast" class="p-2 rounded-md text-sm bg-primary text-white z-10" >
                événement passé
              </div>
            </div>
            <div class="text-gray-500 text-ellipsis line-clamp-3 whitespace-break-spaces overflow-hidden min-h-[70px]">
              {{ event.description }} 
            </div>
            <a :href="buildGoogleCalendarLink(event.titre, event.description, event.localisation, event.debut, event.fin)" class="text-primary underline">
              Ajouter à mon calendrier
            </a>
          </div>
          <!-- TODO: Calculer si l'event est passé v-if="event.isPast" -->
          <!-- inset-0 bg-gray-200/10 m-[1px] backdrop-blur-[1px]  -->
          <div v-if="event?.isPast" class="absolute glassmorphism inset-0 rounded-xl" :class="{ 'cursor-not-allowed': event?.isPast }"></div>
          <!-- <div v-if="event?.isPast" class="absolute inset-0 bg-gray-200/10 m-[1px] backdrop-blur-[1px] rounded-xl"></div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.glassmorphism {
  background: rgba( 255, 255, 255, 0.25 );
  /* box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ); */
  backdrop-filter: blur( 1px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  /* border: 1px solid rgba( 255, 255, 255, 0.18 ); */
  margin: 2px;
}

.ombre {
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
}
</style>


<script setup lang="ts">
let monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const eventMounth = ["Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre"];

const events = {
  Mars: [
    {
      isPast: true,
      title: "Mercredi 27 Mars",
      description: "Lancement du projet et communication au grand public",
    },
    {
      isPast: false,
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

const evenements = ref<[]>([]);

const runtimeConfig = useRuntimeConfig();
const {
  public: { strapiBaseUrl, strapiToken },
} = runtimeConfig;

const transformEvenementsObject = (partenaireData) => {
  let eventsByMonth = {};

  partenaireData.forEach((data) => {
    const { titre, description, localisation, debut, fin } = data.attributes;
    let mois = monthNames[new Date(debut).getMonth()];

    let event = {
      titre,
      description,
      localisation,
      debut: new Date(debut).toISOString().replace(/-|:|\.\d\d\d/g,""),
      fin: new Date(fin).toISOString().replace(/-|:|\.\d\d\d/g,""),
      isPast: new Date(debut) < new Date(),
    };

    if (!eventsByMonth[mois]) {
      eventsByMonth[mois] = [];
    }

    eventsByMonth[mois].push(event);
  });

  return eventsByMonth;
};

const getEvenements = async () => {
  const url = `${strapiBaseUrl}/api/evenements`;
  // if (process.env.GENERATE) {
    const { data, pending, error } = useAsyncData("evenements", () => {
      return $fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${strapiToken}`,
        },
      });
    });

    if (!error.value && !pending.value && data.value) {
      evenements.value = transformEvenementsObject(data.value.data);
    } else {
      console.error("oui" + error.value);
    }
  // }
};

getEvenements();

</script>