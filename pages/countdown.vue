<template>
  <div class="mx-4 md:mx-auto">
    <!-- Logo -->
    <div class="h-screen flex flex-col gap-8">
      <!-- gap-[10vh] -->
      <div class="flex  justify-center items-center h-full">
        <div class="md:w-1/3 mx-auto">
          <img
            class="w-8/12 mx-auto md:w-full"
            src="/images/logoBig_roulerPourAider.png"
            alt="Logo lmlccommunication"
          />
        </div>
      </div>

      <!-- Countdown -->
      <div class="my-auto">
        <div
          class="flex relative bg-slate-900 overflow-hidden w-[90%] h-auto md:w-2/3 mx-auto py-[4vh] rounded-[10px] justify-center items-center"
        >
          <!-- <div class="relative monin overflow-hidden w-full h-full"> -->
          <!-- TODO: Black and white ecriture pas d'image client, que les carrès soient plus gros  -->
          <div class="z-10 text-center h-auto w-full relative">
            <div
              class="flex justify-evenly w-full text-3xl md:text-6xl font-medium md:font-bold font-omnes"
            >
              <!-- <div> -->
              <!-- Nouveau code -->

              <!-- <div class="flex items-center justify-between"> -->
              <!-- Début chiffre -->
              <div class="flex items-center flex-col flex-nowrap">
                <span class="time-elem relative shadow-xl" id="days">
                  <span class="top">00</span>
                  <span class="top-back">
                    <span>00</span>
                  </span>
                  <span class="bottom">08</span>
                  <span class="bottom-back">
                    <span>00</span>
                  </span>
                </span>
                <span class="pt-2 text-xl text-white">Days</span>
              </div>

              <div class="flex items-center flex-col flex-nowrap">
                <span class="time-elem relative shadow-xl" id="hours">
                  <span class="top">00</span>
                  <span class="top-back">
                    <span>00</span>
                  </span>
                  <span class="bottom">08</span>
                  <span class="bottom-back">
                    <span>00</span>
                  </span>
                </span>
                <span class="pt-2 text-xl text-white">Hours</span>
              </div>

              <div class="flex items-center flex-col flex-nowrap">
                <span class="time-elem relative shadow-xl" id="minutes">
                  <span class="top">00</span>
                  <span class="top-back">
                    <span>00</span>
                  </span>
                  <span class="bottom">08</span>
                  <span class="bottom-back">
                    <span>00</span>
                  </span>
                </span>
                <span class="pt-2 text-xl text-white">Minutes</span>
              </div>

              <div class="flex items-center flex-col flex-nowrap">
                <span class="time-elem relative shadow-xl" id="seconds">
                  <span class="top">00</span>
                  <span class="top-back">
                    <span>00</span>
                  </span>
                  <span class="bottom">00</span>
                  <span class="bottom-back">
                    <span>00</span>
                  </span>
                </span>
                <span class="pt-2 text-xl text-white">Seconds</span>
              </div>
              <!-- </div> -->
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <!-- <div class="flex flex-1 font-omnes">
        <div class="flex-1"></div>
        <div class="flex-1">
          <p class="font-medium md:font-bold">QUESTION &</p>
          <p class="font-medium md:font-bold">NEW BUISINESS</p>
          <div class="font-thin mt-2 mb-6">
            <a href="mailto: contact@lmlccommunication.fr"
              >contact@lmlccommunication.fr</a
            >
          </div>
          <p class="font-medium md:font-bold">JOB</p>
          <div class="font-thin mt-2">
            <a href="mailto: talents@lmlccommunication.fr"
              >talents@lmlccommunication.fr</a
            >
          </div>
        </div>
        <div class="flex-1"></div>
      </div> -->
      <!-- <div class="flex flex-1 font-omnes"> -->
        <Footer />
        <!-- <div class="xs:max-w-sm lg:w-full mx-auto gap-10">
          <div class="flex flex-wrap items-center -mx-4 mb-18">
            <div class="w-full lg:w-1/3 px-4 mb-12 lg:mb-0">
              <div class="flex items-center lg:justify-center">
                <div
                  class="flex flex-shrink-0 mr-5 sm:mr-8 items-center justify-center p-1 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-primary"
                >
                  <iconsPhone class="text-2xl md:text-4xl" />
                </div>
                <div>
                  <span class="text-lg text-gray-500">Phone</span>
                  <span class="block text-lg font-semibold text-gray-900"
                    ><a href="+33 7 62 54 29 18">+33 7 62 54 29 18</a></span
                  >
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3 px-4 mb-12 lg:mb-0">
              <div class="flex items-center lg:justify-center">
                <div
                  class="flex flex-shrink-0 mr-5 sm:mr-8 items-center justify-center p-1 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-secondary"
                >
                  <iconsEmail class="text-2xl md:text-4xl text-white" />
                </div>
                <div>
                  <span class="text-lg text-gray-500">Email</span>
                  <span class="block text-lg font-semibold text-gray-900"
                    ><a href="mailto:roulerpouraider60@gmail.com"
                      >roulerpouraider60@gmail.com</a
                    ></span
                  >
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3 px-4 mb-12 lg:mb-0">
              <div class="flex items-center lg:justify-center">
                <div
                  class="flex flex-shrink-0 mr-5 sm:mr-8 items-center justify-center p-1 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-yellow-200"
                >
                  <iconsFacebook class="text-2xl md:text-4xl" />
                </div>
                <div>
                  <span class="text-lg text-gray-500">Facebook</span>
                  <span class="block text-lg font-semibold text-gray-900"
                    ><a href="https://www.facebook.com/roulerpouraider"
                      >Rouler pour aider</a
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "maintenance",
});

import gsap from "gsap";
import { Quart } from "gsap/gsap-core";

onMounted(() => {
  const runtimeConfig = useRuntimeConfig();
  const isMaintenance = runtimeConfig.public.MAINTENANCE;
  console.log(isMaintenance);
  time();
});
const time = () => {
  // window.addEventListener("load", () => {
  let birthday = "2024/01/17";

  (function () {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const countDown = new Date(birthday).getTime();
    var x = setInterval(function () {
      const now = new Date().getTime();
      const distance = countDown - now;

      document.getElementById("days").innerText = setNumber(distance / day);

      document.getElementById("hours").innerText = setNumber((distance % day) / hour);
      document.getElementById("minutes").innerText = setNumber(
        (distance % hour) / minute
      );
      animateFlip(seconds, Math.floor((distance % minute) / second));

      //do something later when date is reached
      if (distance < 0) {
        let headline = document.getElementById("headline"),
          countdown = document.getElementById("countdown"),
          content = document.getElementById("content");

        headline.innerText = "It's my birthday!";
        countdown.style.display = "none";
        content.style.display = "block";

        clearInterval(x);
      }
    }, 1000);
  })();

  function animateFlip(element, value) {
    const valueInDom = element.querySelector(".bottom-back").innerText;
    const currentValue = value < 10 ? "0" + value : "" + value;

    if (valueInDom === currentValue) return;

    element.querySelector(".top-back span").innerText = currentValue;
    element.querySelector(".bottom-back span").innerText = currentValue;

    gsap.to(element.querySelector(".top"), 0.7, {
      rotationX: "-180deg",
      transformPerspective: 300,
      ease: Quart.easeOut,
      onComplete: function () {
        element.querySelector(".top").innerText = currentValue;
        element.querySelector(".bottom").innerText = currentValue;
        gsap.set(element.querySelector(".top"), { rotationX: 0 });
      },
    });

    gsap.to(element.querySelector(".top-back"), 0.7, {
      rotationX: 0,
      transformPerspective: 300,
      ease: Quart.easeOut,
      clearProps: "all",
    });
  }

  function setNumber(num) {
    const res = Math.floor(num);
    return res >= 10 ? res : `0${res}`;
  }
  // });
};
</script>
