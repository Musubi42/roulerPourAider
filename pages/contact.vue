<template>
  <section class="overflow-hidden bg-slate-300">
    <div class="container px-4 mx-auto pt-16 pb-20">
      <div class="flex flex-wrap -mx-4">
        <!-- Côté gauche -->
        <div class="w-full lg:w-1/2 p-4">
          <div class="max-w-xl mx-auto gap-5 flex flex-col text-white">
            <div class="bg-secondary p-4 rounded-3xl">
              <p class="text-orange-50 mb-10">
                Submit your info and we&rsquo;ll get back to you as soon as possible.
              </p>
              <h2 class="text-white text-xl font-bold font-heading pb-5">
                Association Rouler pour aider
              </h2>

              <div class="flex flex-nowrap items-start gap-3 mb-4">
                <div class="bg-orange-50 rounded-xl p-2 text-black">
                  <IconsHome />
                </div>
                <p class="text-white">10 rue Jean Jaurès, 60550 Verneuil-en-Halatte</p>
              </div>

              <div class="flex flex-nowrap items-start gap-3 mb-4">
                <div class="bg-orange-50 rounded-xl p-2 text-black">
                  <IconsEmail />
                </div>
                <p class="text-white">roulerpouraider60@gmail.com</p>
              </div>
            </div>

            <!-- Contact Yves Gerard -->
            <div v-for="(contact, index) in contacts"
              class="rounded-3xl bg-primary shadow-sm py-8" >
              <div class="relative">
                <div class="absolute top-0 left-0 bg-orange-50 w-1 h-8"></div>
                <div class="flex flex-col md:flex-row justify-between items-center">
                  <div class="px-8">
                    <h2 class="text-white text-xl font-medium font-heading mb-6">
                      {{ contact.prenom }} {{ contact.nom }}, {{ contact.role }}
                    </h2>
                    <!-- Ajouter sur deux lignes le mail et le numéro, quand on clique dessus on est redirigé vers le mailing ou appel -->
                    <span class="flex flex-row items-end gap-5 text-xl cursor-pointer">
                      <IconsPhone />
                      <a :href="`tel:${contact.telephone}`" class="hover:underline">{{ contact.telephone }}</a>
                    </span>
                    <span class="flex flex-row items-end gap-5 text-xl cursor-pointer">
                      <IconsEmail />
                      <a :href="`mailto:${contact.email}`" class="hover:underline">{{ contact.email }}</a>
                    </span>
                  </div>
                  <!-- Avatar -->
                  <div class="mt-10 md:mt-0 md:pr-8">
                    <img
                      class="w-24 h-24 rounded-full object-cover"
                      :src="contact.contactPhotoUrl"
                      alt="Avatar"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>

        <!-- Côté droit -->
        <div class="w-full lg:w-1/2 p-4">
          <form class="h-full" action="" @submit.prevent>
            <div
              class="h-full border border-gray-100 bg-white rounded-3xl p-6 max-w-xl mx-auto"
            >
              <h2 class="text-3xl text-center font-bold font-heading mb-4">
                Get in touch
              </h2>
              <p class="text-center text-gray-600 mb-16">
                Fill out the form to connect with a member of our team.
              </p>
              <div class="flex flex-wrap -mx-4">
                <div class="w-full lg:w-1/2 p-4">
                  <label class="text-sm font-medium mb-2 block" for="firstName"
                    >Prénom</label
                  >
                  <input
                    class="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200"
                    v-model="firstName"
                    type="text"
                    placeholder="Prénom"
                  />
                </div>
              </div>
              <label class="text-sm font-medium mb-2 block" for="textInput3">Email</label>
              <input
                class="w-full mb-4 rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200"
                v-model="email"
                type="text"
                placeholder="john@email.com"
              />
              <label class="text-sm font-medium mb-2 block" for="textInput4"
                >Message</label
              >
              <textarea
                class="resize-none w-full h-[220px] rounded-3xl p-4 mb-8 outline-none border border-gray-100 placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200"
                v-model="message"
                rows="5"
                placeholder="Écrivez votre message ici..."
              ></textarea>
              <button
                class="py-4 px-6 rounded-full w-full h-14 inline-flex items-center justify-center text-center mb-8 bg-primary/90 border border-primary font-bold font-heading text-white hover:bg-primary focus:ring focus:ring-primary transition duration-200"
                @click.prevent="sendEmail"
              >
                Envoyer
              </button>
              <p class="text-gray-500 text-sm">
                <span>We process your information in accordance with our </span>
                <span class="text-secondary text-sm font-semibold">Privacy Policy</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import nodemailer from "nodemailer";
const mail = useMail();

const firstName = ref("");
const email = ref("");
const message = ref("");

const sendEmail = () => {
  const messageBody = `---\nPrénom: ${firstName.value}\nEmail: ${email.value}\n---\n\n${message.value}`;
  mail.send({
    from: "",
    subject: "Contact form submission",
    text: messageBody,
  });
};

interface contact {
  contactPhotolUrl: string;
  prenom: string;
  nom: string;
  role: string;
  description: string;
  telephone: string;
  email: string;
}

const contacts = ref<contact[]>([]);

const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken } } = runtimeConfig;

const transformContactObject = (contactData) => {
  return contactData.map((data) => {
    const { photo, prenom, nom, telephone, ...otherAttributes } = data.attributes;
    const telephoneString = telephone.toString();
    const telephoneTransformed = `+33 ${telephoneString.charAt(0)} ${telephoneString.slice(1).match(/.{1,2}/g).join(' ')}`;
    return {
      ...otherAttributes,
      prenom: capitalizePrenom(prenom),
      nom: nom.toUpperCase(),
      telephone: telephoneTransformed,
      contactPhotoUrl: strapiBaseUrl + photo.data.attributes.url,
    };
  });
};

const getContacts = async () => {
  const url = `${strapiBaseUrl}/api/contacts?populate=*`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  if (!error.value && !pending.value && data.value) {
    contacts.value = transformContactObject(data.value.data);
  } else {
    console.error(error.value);
  }

  console.log("contacts", contacts.value);
};

const capitalizePrenom = (prenom: string) => {
  return prenom.charAt(0).toUpperCase() + prenom.slice(1);
};

onMounted(async () => {
  await getContacts();
});
</script>
