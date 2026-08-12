/**
 * Audit Lighthouse du site, sur le BUILD DE PRODUCTION.
 *
 *     pnpm build && node utils/audit.mjs
 *     node utils/audit.mjs --desktop
 *
 * ── DEUX PIÈGES, DEUX RAISONS D'ÊTRE DE CE SCRIPT ────────────────────────
 *
 * 1. NE PAS AUDITER LE SERVEUR DE DEV. En dev, le code n'est ni minifié ni
 *    découpé, le client Vite et l'overlay des devtools s'ajoutent à la page :
 *    les scores n'ont aucun rapport avec ce que verra un visiteur. Ce script
 *    démarre donc le serveur Nitro issu de `.output/`, l'audite, puis l'arrête.
 *
 * 2. NE PAS INSTALLER LIGHTHOUSE DANS LE PROJET. Constaté ici : ajouter
 *    `lighthouse` en devDependency casse le prérendu Nuxt — le build échoue sur
 *    « Cannot read properties of undefined (reading 'startsWith') ». Lighthouse
 *    tire un arbre de dépendances énorme qui perturbe la résolution de modules
 *    de Nitro. On l'exécute donc via `npx`, dans une installation isolée qui ne
 *    touche jamais au `node_modules` du projet.
 *
 * ── CE QUE CES CHIFFRES VALENT ──────────────────────────────────────────
 * En local, `/_vercel/image` renvoie 404 : le provider d'images de Vercel
 * n'existe que sur Vercel. Toutes les images passant par `<NuxtImg>` sont donc
 * absentes pendant l'audit, ce qui dégrade artificiellement le LCP et le CLS.
 * Les scores SEO, accessibilité et bonnes pratiques, eux, sont fiables.
 * Pour une mesure de performance juste, auditer l'URL de préproduction Vercel :
 *     node utils/audit.mjs --url https://xxx.vercel.app
 */

import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 3100;
const desktop = process.argv.includes('--desktop');
const urlArg = process.argv[process.argv.indexOf('--url') + 1];
const base = process.argv.includes('--url') ? urlArg.replace(/\/$/, '') : `http://localhost:${PORT}`;

const CHEMINS = ['/', '/notre-aventure', '/equipe'];

async function demarrerServeur() {
  const proc = spawn('node', [resolve(root, '.output/server/index.mjs')], {
    env: { ...process.env, PORT: String(PORT), NITRO_PORT: String(PORT) },
    stdio: 'ignore',
  });
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      if ((await fetch(`http://localhost:${PORT}/`)).ok) return proc;
    } catch {}
  }
  proc.kill();
  throw new Error(`Aucune réponse sur le port ${PORT}. Avez-vous lancé "pnpm build" ?`);
}

const serveur = process.argv.includes('--url') ? null : await demarrerServeur();
const tmp = mkdtempSync(join(tmpdir(), 'lh-'));

const note = (n) => (n == null ? ' — ' : String(Math.round(n * 100)).padStart(3));
const ms = (v) => (v == null ? '—' : `${Math.round(v)} ms`);
const scores = [];

console.log(`Audit ${desktop ? 'desktop' : 'mobile'} · ${base}\n`);

try {
  for (const chemin of CHEMINS) {
    const sortie = join(tmp, chemin.replace(/\W/g, '_') + '.json');
    const res = spawnSync(
      'npx',
      [
        '--yes',
        'lighthouse',
        base + chemin,
        '--quiet',
        '--output=json',
        `--output-path=${sortie}`,
        `--preset=${desktop ? 'desktop' : ''}`.replace('--preset=', desktop ? '--preset=desktop' : '--form-factor=mobile'),
        '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
      ].filter(Boolean),
      { encoding: 'utf8', stdio: ['ignore', 'ignore', 'pipe'] }
    );

    if (res.status !== 0) {
      console.log(`── ${chemin}\n   échec : ${(res.stderr || '').split('\n')[0]}\n`);
      continue;
    }

    const lhr = JSON.parse(readFileSync(sortie, 'utf8'));
    const c = lhr.categories;
    const a = lhr.audits;
    scores.push(c);

    console.log(`── ${chemin}`);
    console.log(
      `   Perf ${note(c.performance?.score)} · Accessibilité ${note(c.accessibility?.score)} · ` +
        `Bonnes pratiques ${note(c['best-practices']?.score)} · SEO ${note(c.seo?.score)}`
    );
    console.log(
      `   LCP ${ms(a['largest-contentful-paint']?.numericValue)} · TBT ${ms(a['total-blocking-time']?.numericValue)} · ` +
        `CLS ${a['cumulative-layout-shift']?.displayValue ?? '—'}`
    );

    const echecs = Object.values(a).filter(
      (x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode === 'binary'
    );
    for (const e of echecs.slice(0, 6)) console.log(`     · ${e.title}`);
    console.log();
  }
} finally {
  serveur?.kill();
  rmSync(tmp, { recursive: true, force: true });
}

if (scores.length) {
  const moy = (cat) =>
    Math.round((scores.reduce((a, s) => a + (s[cat]?.score ?? 0), 0) / scores.length) * 100);
  console.log(
    `Moyenne sur ${scores.length} pages — Perf ${moy('performance')} · A11y ${moy('accessibility')} · ` +
      `Bonnes pratiques ${moy('best-practices')} · SEO ${moy('seo')}`
  );
}
