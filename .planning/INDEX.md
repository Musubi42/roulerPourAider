# Rouler Pour Aider - Victory Refactor

> ⚠️ **Document historique — plan de l'équipe d'agents de février 2026.**
> Il a produit la structure `components/victory/`, réutilisable, mais **une grande
> partie du contenu qu'il a généré était fabriquée** (noms de fondateurs, 21 entrées
> de presse inventées, chiffres erronés).
>
> **Documents à jour, à lire en priorité :**
> - [`REFONTE-2026.md`](./REFONTE-2026.md) — le plan en cours
> - [`ADR.md`](./ADR.md) — les décisions et leur justification
> - [`ACTIONS-HUMAINES.md`](./ACTIONS-HUMAINES.md) — ce qui requiert une action humaine

## Mission
Transform the fundraising website into a victory/celebration page showcasing the €100K achievement for Hôpital Necker.

## Team Structure

| Agent | Role | Scope |
|-------|------|-------|
| **orchestrator** | Team Lead | Tracks progress, coordinates agents, resolves conflicts |
| **architect** | Site Restructure | Delete old pages, create new page shells, convert dynamic→static, update config |
| **storyteller** | Content & Narrative | Write all French copy, ensure emotional tone consistency, prepare text content |
| **animator** | Animations & Interactions | GSAP animations, France map cyclist, timeline scroll, micro-interactions |
| **stylist** | Visual Design & UI | shadcn-vue components, color palette update, typography, responsive layouts |

## Phases

### Phase 1: Foundation (architect + storyteller in parallel)
- [ ] Architect: Clean up nuxt.config, remove SSR/dynamic dependencies, set up static generation
- [ ] Architect: Delete deprecated pages (faire-un-don, calendrier, tour)
- [ ] Architect: Create new page shells (home, notre-aventure, equipe, presse)
- [ ] Architect: Install new dependencies (gsap, shadcn-vue, @vueuse/motion)
- [ ] Storyteller: Write all page copy in .planning/content/ markdown files
- [ ] Storyteller: Prepare image/video placement notes

### Phase 2: Structure & Content (architect + stylist)
- [ ] Architect: Build page component structure with placeholder content
- [ ] Stylist: Set up shadcn-vue, update Tailwind config (gold accent, warm palette)
- [ ] Stylist: Design and implement new header/footer (simplified navigation)
- [ ] Stylist: Create base component library (victory cards, stat counters, section layouts)

### Phase 3: Content Integration (storyteller + stylist)
- [ ] Integrate French copy into all pages
- [ ] Place images/videos in correct locations
- [ ] Style all content sections
- [ ] Responsive design pass

### Phase 4: Animations (animator)
- [ ] France SVG map with GSAP MotionPath cyclist animation
- [ ] Documentary timeline with ScrollTrigger
- [ ] Counter animations (0 → 100,000)
- [ ] Page transitions and micro-interactions
- [ ] Hero video background setup

### Phase 5: Polish & Deploy
- [ ] Cross-browser testing
- [ ] Performance optimization (images, fonts, bundle size)
- [ ] SEO meta tags update
- [ ] Final review and deploy

## Key Decisions
- **Static generation**: Remove Strapi dependency, all content hardcoded/static
- **Animation library**: GSAP (ScrollTrigger + MotionPath) as primary
- **UI components**: shadcn-vue for base components
- **France map**: SVG-based (replacing Leaflet) with animated cyclist path
- **Color update**: Keep green + blue, add warm gold (#D4A843) accent
- **Tone**: Emotional & heartfelt - "100 000 merci"

## File Structure (Target)
```
pages/
  index.vue              # Victory landing page
  notre-aventure.vue     # Timeline/documentary page
  equipe.vue             # Team, cyclists, partners page
  presse.vue             # Consolidated press page
  contact.vue            # Keep existing
  cookies.vue            # Keep existing
  mentions-legales.vue   # Keep existing
components/
  victory/               # New victory-specific components
    HeroVictory.vue      # Full-screen video hero
    ImpactCards.vue       # What donations achieved
    FranceMap.vue         # SVG map with cyclist animation
    Timeline.vue          # Documentary scroll timeline
    StatCounter.vue       # Animated number counters
    PressHighlights.vue   # Best press moments
    TeamGrid.vue          # Founder/cyclist/partner profiles
  ui/                    # shadcn-vue components
```
