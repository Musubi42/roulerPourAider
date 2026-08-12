import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Animations au scroll, reutilisables.
 *
 * Toutes respectent prefers-reduced-motion, et tous les ScrollTrigger crees
 * sont detruits quand le composant est demonte : sans ca ils s'accumulaient a
 * chaque navigation SPA.
 */
export function useScrollAnimation() {
  // Lu de maniere synchrone plutot que dans onMounted : les fonctions ci-dessous
  // sont appelees depuis le onMounted des composants, donc apres celui du
  // composable, mais dependre de cet ordre etait fragile.
  const prefersReducedMotion = ref(
    import.meta.client
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const triggers = [];

  /** Memorise un ScrollTrigger pour pouvoir le tuer au demontage. */
  function track(tween) {
    const st = tween?.scrollTrigger;
    if (st) triggers.push(st);
    return tween;
  }

  onScopeDispose(() => {
    triggers.forEach((st) => st.kill());
    triggers.length = 0;
  });

  /**
   * Fait apparaitre les elements en fondu quand ils entrent dans le viewport.
   * Les elements doivent porter `opacity-0 translate-y-8` au depart.
   *
   * Chaque element a son propre declencheur : la cascade se fait naturellement
   * au fil du scroll. `stagger` n'ajoute un decalage que si on le demande
   * explicitement (l'ancienne version appliquait `stagger * i` sur l'index
   * global, si bien que le dernier element d'une longue liste attendait
   * plusieurs secondes apres etre devenu visible).
   */
  function fadeInOnScroll(selector, { container = null, stagger = 0, y = 32, duration = 0.8, start = 'top 85%' } = {}) {
    if (prefersReducedMotion.value) {
      gsap.set(selector, { opacity: 1, y: 0 });
      return;
    }

    gsap.utils.toArray(selector, container).forEach((el, i) => {
      track(
        gsap.fromTo(el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay: stagger * i,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start, once: true },
          }
        )
      );
    });
  }

  /**
   * Apparition en rebond, pour les pastilles / badges.
   */
  function bounceIn(selector, { start = 'top 85%' } = {}) {
    if (prefersReducedMotion.value) {
      gsap.set(selector, { scale: 1, opacity: 1 });
      return;
    }

    gsap.utils.toArray(selector).forEach((el) => {
      track(
        gsap.fromTo(el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: el, start, once: true },
          }
        )
      );
    });
  }

  /**
   * Trace une ligne progressivement au scroll.
   */
  function drawLineOnScroll(lineEl, { start = 'top 80%', end = 'bottom 20%' } = {}) {
    if (prefersReducedMotion.value || !lineEl) return;

    track(
      gsap.fromTo(lineEl,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: lineEl, start, end, scrub: 1 },
        }
      )
    );
  }

  /**
   * Fait monter des cartes en cascade, par groupe visible.
   *
   * Utilise ScrollTrigger.batch : seules les cartes reellement a l'ecran
   * s'animent. L'ancienne version declenchait toute la grille depuis la
   * premiere carte, donc les cartes du bas s'animaient avant d'etre vues.
   */
  function staggerCards(selector, { stagger = 0.1, y = 40, duration = 0.7, start = 'top 85%' } = {}) {
    if (prefersReducedMotion.value) {
      gsap.set(selector, { opacity: 1, y: 0 });
      return;
    }

    const elements = gsap.utils.toArray(selector);
    if (elements.length === 0) return;

    const batched = ScrollTrigger.batch(elements, {
      start,
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(batch,
          { opacity: 0, y },
          { opacity: 1, y: 0, duration, stagger, ease: 'power2.out', overwrite: true }
        ),
    });

    batched.forEach((st) => triggers.push(st));
  }

  /**
   * Compteur chiffre anime, declenche a l'entree dans le viewport.
   * Formate en fr-FR et accepte un suffixe (ex. "+").
   */
  function countUpOnScroll(el, target, { suffix = '', duration = 2.5, start = 'top 80%' } = {}) {
    if (!el) return;

    const render = (v) => {
      el.textContent = Math.round(v).toLocaleString('fr-FR') + suffix;
    };

    if (prefersReducedMotion.value) {
      render(target);
      return;
    }

    const counter = { value: 0 };
    track(
      gsap.to(counter, {
        value: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start, once: true },
        onUpdate: () => render(counter.value),
      })
    );
  }

  return {
    prefersReducedMotion,
    fadeInOnScroll,
    bounceIn,
    drawLineOnScroll,
    staggerCards,
    countUpOnScroll,
  };
}
