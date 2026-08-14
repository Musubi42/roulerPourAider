/**
 * Métadonnées communes à toutes les pages : identité du site, langue, aperçu
 * de partage par défaut, et URL canonique dérivée de la route.
 *
 * Appelé une seule fois, depuis `app.vue`. Les pages ne redéfinissent ensuite
 * que ce qui leur est propre — `title`, `description`, et une `ogImage` si
 * elles en ont une meilleure que celle par défaut.
 *
 * Ces balises ne servent à rien si elles ne sont pas dans le HTML livré : les
 * robots d'aperçu social (WhatsApp, Facebook, LinkedIn, Slack, iMessage)
 * n'exécutent pas de JavaScript. C'est pourquoi le site est prérendu
 * (`ssr: true` + `nitro.prerender` dans nuxt.config.ts).
 */

export const SITE_URL = 'https://roulerpouraider.fr';
export const SITE_NAME = 'Rouler pour aider';
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function useSiteSeo() {
  const route = useRoute();

  useHead({
    htmlAttrs: { lang: 'fr' },
    link: [
      // Canonique : sans elle, roulerpouraider.fr, www.roulerpouraider.fr et le
      // domaine *.vercel.app seraient trois versions concurrentes du même site.
      { rel: 'canonical', href: () => SITE_URL + (route.path === '/' ? '/' : route.path) },
    ],
  });

  useSeoMeta({
    ogSiteName: SITE_NAME,
    ogLocale: 'fr_FR',
    ogType: 'website',
    ogUrl: () => SITE_URL + (route.path === '/' ? '/' : route.path),
    ogImage: OG_IMAGE,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
    ogImageAlt:
      "Rouler pour aider — 103 847 € récoltés pour l'hôpital Necker, 4 327 km à vélo",
    // Sans `summary_large_image`, X affiche une vignette carrée minuscule au
    // lieu d'une bannière.
    twitterCard: 'summary_large_image',
  });
}
