import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
});
