# Rouler Pour Aider

## Project Overview

A French charitable cycling association website documenting the money raised for **Hôpital Necker - Enfants malades AP-HP** (Paris children's hospital). Founded in 2019 by students from the Oise.

- **1st edition (2020):** Lille to Nice, 1 327 km, **33 324 €**
- **2nd edition (2024):** Tour de France (3 000 km, 18 stages, July 7-25), **70 523 €**
- **Total handed over:** **103 847 €** on 22 November 2024, in two cheques, from 605 donors, over 4 327 km
- **Status:** Over — no third edition. The site is a memorial ("100 000 merci")

> ⚠️ **Never write "100 000 €" in body copy.** It is the brand tagline, not an
> amount. The real figures are the ones above, taken from the cheques
> photographed on 22/11/2024 (`public/remise-des-fonds/`). See ADR-011 / ADR-015.

## Tech Stack

- **Framework:** Nuxt 3 (v3.9.0), `ssr: true` — prerendered at build time by
  Nitro, served as static HTML by the Vercel CDN. This is NOT a Node server:
  `ssr: true` is what puts the content and the share tags in the delivered
  HTML, which social preview bots need since they don't run JavaScript.
- **UI:** Vue 3 + TypeScript
- **Styling:** Tailwind CSS 3.4 + custom Omnes font family (6 weights, subset
  to latin — see `utils/buildFonts.mjs`)
- **Animations:** GSAP (ScrollTrigger + MotionPathPlugin)
- **Deployment:** Vercel (static, prerendered)
- **Package manager:** pnpm

No Pinia, no Swiper, no @vueuse/motion, and **no third-party scripts at all** —
no analytics, no tag manager. The site loads nothing from an external origin;
keep it that way.

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary (Green) | `#72BC7A` | Buttons, highlights, timeline line |
| Secondary (Blue) | `#2A5FA4` | Text, headers, hero backgrounds |
| Gold | `#D4A843` | Victory accents, year badges, special highlights |
| Warm White | `#FEFCF8` | Page backgrounds |
| Warm Cream | `#FFF8F0` | Section backgrounds |

## Site Structure

```
pages/
  index.vue              # Victory landing page (hero, impact, map, press, closing)
  notre-aventure.vue     # Le récit en 6 actes (2019 → après)
  equipe.vue             # Founders, cyclists, partners, supporters
  presse.vue             # Consolidated press (articles, TV, radio)
  contact.vue            # Static contact info
  cookies.vue            # Cookie policy
  mentions-legales.vue   # Legal notices

components/
  victory/               # Victory-specific components
    HeroVictory.vue      # Full-screen hero with "100 000 merci" counter
    ImpactCards.vue       # What donations achieved (6 goals)
    FranceMap.vue         # SVG France map with GSAP cyclist animation
    RouteStory.vue        # Le récit : rail sticky (la route de TourMap redressée) + 6 chapitres
                          #   contenu dans data/recit.js
    StatCounter.vue       # GSAP animated number counters
    PressHighlights.vue   # Homepage press preview with quotes
    PressFull.vue         # Full press page with tabs
    TeamGrid.vue          # Founders, cyclists, celebrity supporters
    PartnerThanks.vue     # Partners grid with gratitude framing
  icons/                 # SVG icon components
  ui/                    # Base UI components

layouts/
  victory.vue            # Main layout (warm-white bg, simplified nav)
  default.vue            # Fallback layout
  accueil.vue            # Home layout

plugins/
  gsap.client.js         # GSAP ScrollTrigger + MotionPath registration
                         #   (the only plugin — Clarity and GA4 are gone)

composables/
  useScrollAnimation.js  # Reusable GSAP scroll animations (fadeIn, bounceIn, stagger, drawLine)
  useHeaderActiveLink.js # Header nav state

data/
  etapes-2024.js         # Les 18 étapes (source de vérité, → utils/buildMap.mjs)
  recit.js               # Les 6 actes de /notre-aventure (textes, chiffres, photos)
  presse.json            # Retombées presse curées
  partenaires.json       # Partenaires
```

## Key Patterns

- **Fully static:** No CMS, no API calls, no server routes — all content is hardcoded
- **GSAP animations:** ScrollTrigger for reveal-on-scroll, MotionPath for cyclist on France map
- **Animation hooks:** Components use `.timeline-entry`, `.timeline-badge`, `.timeline-card` etc. classes with initial `opacity-0 translate-y-8` for GSAP to animate
- **Respects prefers-reduced-motion:** All GSAP animations check user preference
- **Responsive:** Mobile-first with `md:` and `lg:` breakpoints
- **Navigation:** Simplified 5-item nav (Accueil, Notre Aventure, L'Équipe, Presse, Contact)

## CSS Utilities

- `.section-padding` — consistent responsive section spacing
- `.title-victory` — gold-accented section titles
- `.card-victory` — styled cards with hover effect

## Development

```bash
pnpm install        # Install dependencies
pnpm dev            # Dev server at localhost:3000
pnpm build          # Production build
pnpm preview        # Preview production build
```

⚠️ **Arrêter le serveur de dev proprement.** `nuxt dev` lance un processus enfant
`nuxi.mjs _dev` que `pkill -f "nuxt dev"` ne tue pas. L'orphelin continue de
réécrire `.nuxt` en mode dev, ce qui casse le build suivant (500 au prérendu, ou
`#internal/nitro` en production) et sature les ports 3000-3100.

```bash
pkill -f "nuxi.mjs _dev"
lsof -ti tcp:3000 -sTCP:LISTEN | xargs -r kill -9
rm -rf .nuxt .output   # si un build a déjà été corrompu
```

Ne jamais lancer `pnpm build` pendant qu'un serveur de dev tourne. Voir ADR-017.

## TODOs

- Replace founder/cyclist placeholder photos with real images
- Récupérer le mot signé de clôture de Hugo et Milan (`motFondateurs`, pages/notre-aventure.vue)
- Add remaining partner data (logos, descriptions) from old Strapi database
- Replace placeholder press article URLs with real links
- Fix Yoann Offredo image filename (has leading space)
- Add real video embeds for TV reportages section
