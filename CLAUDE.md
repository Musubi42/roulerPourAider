# Rouler Pour Aider

## Project Overview

A French charitable cycling association website celebrating the successful €100K fundraiser for **Hôpital Necker - Enfants malades AP-HP** (Paris children's hospital). Founded in 2019 by two students from Oise.

- **1st edition (2020):** Lille to Nice, raised €33,000+
- **2nd edition (2024):** Tour de France (3,000 km, 18 stages, July 7-25), raised €100,000+
- **Status:** Campaign completed - site is a victory/celebration page ("100 000 merci")

## Tech Stack

- **Framework:** Nuxt 3 (v3.9.0) - SPA mode (`ssr: false`)
- **UI:** Vue 3 + TypeScript
- **Styling:** Tailwind CSS 3.4 + custom Omnes font family (8 weights)
- **Animations:** GSAP (ScrollTrigger + MotionPathPlugin) + @vueuse/motion
- **Carousel:** Swiper (nuxt-swiper)
- **State:** Pinia
- **Deployment:** Vercel (static SPA)
- **Package manager:** pnpm

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
  notre-aventure.vue     # Documentary timeline (2019-2024)
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
    Timeline.vue          # Vertical scroll timeline (5 milestones)
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
  clarity-plugin.js      # Microsoft Clarity
  google-analytics.client.js  # GA4

composables/
  useScrollAnimation.js  # Reusable GSAP scroll animations (fadeIn, bounceIn, stagger, drawLine)
  useHeaderActiveLink.js # Header nav state

data/
  locations.js           # 18 cycling stages with coordinates
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

## TODOs

- Replace founder/cyclist placeholder photos with real images
- Add real 2024 cyclist names
- Add remaining partner data (logos, descriptions) from old Strapi database
- Replace placeholder press article URLs with real links
- Fix Yoann Offredo image filename (has leading space)
- Add real video embeds for TV reportages section
