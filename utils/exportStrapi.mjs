/**
 * Export ponctuel du contenu Strapi vers des fichiers JSON statiques.
 *
 * Le site est un memorial : il ne doit JAMAIS dependre de Strapi a l'execution.
 * Ce script fige le contenu dans data/strapi/ et rapatrie les medias dans
 * public/medias/, une bonne fois pour toutes. Une fois l'export valide,
 * le token peut etre revoque et le backoffice eteint.
 *
 * Usage : node --env-file=.env utils/exportStrapi.mjs
 *
 * Note : le backoffice tourne en Strapi v5 (champs a plat + documentId),
 * contrairement a l'ancien utils/fetchBackoffice.js ecrit pour la v4
 * (donnees imbriquees sous `attributes`).
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.STRAPI_URL;
const TOKEN = process.env.STRAPI_TOKEN;

if (!BASE || !TOKEN) {
  console.error('STRAPI_URL et STRAPI_TOKEN sont requis (voir .env.example).');
  process.exit(1);
}

const COLLECTIONS = [
  'partenaires',
  'contacts',
  'articles',
  'podcasts',
  'reportage-tvs',
  'heroes',
];

const OUT_DATA = 'data/strapi';
const OUT_MEDIA = 'public/medias';

async function api(pathname) {
  const res = await fetch(`${BASE}${pathname}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} sur ${pathname}`);
  return res.json();
}

/** Telecharge un media s'il n'est pas deja present, et renvoie son chemin local. */
async function downloadMedia(url) {
  const absolute = url.startsWith('http') ? url : `${BASE}${url}`;
  const name = path.basename(new URL(absolute).pathname);
  const dest = path.join(OUT_MEDIA, name);

  try {
    await fs.access(dest);
    return `/medias/${name}`;
  } catch {
    // pas encore telecharge
  }

  const res = await fetch(absolute);
  if (!res.ok) {
    console.warn(`  ! media injoignable (${res.status}) : ${absolute}`);
    return null;
  }
  await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
  return `/medias/${name}`;
}

/**
 * Parcourt recursivement une entree et remplace les objets media Strapi
 * par le chemin local du fichier telecharge.
 */
async function localiseMedia(node) {
  if (Array.isArray(node)) {
    return Promise.all(node.map(localiseMedia));
  }
  if (node && typeof node === 'object') {
    // Un media Strapi v5 se reconnait a ses champs url + mime
    if (typeof node.url === 'string' && typeof node.mime === 'string') {
      const local = await downloadMedia(node.url);
      return { url: local, mime: node.mime, name: node.name ?? null, alt: node.alternativeText ?? null };
    }
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = await localiseMedia(v);
    return out;
  }
  return node;
}

async function main() {
  await fs.mkdir(OUT_DATA, { recursive: true });
  await fs.mkdir(OUT_MEDIA, { recursive: true });

  const summary = {};

  for (const name of COLLECTIONS) {
    try {
      const json = await api(`/api/${name}?populate=*&pagination[pageSize]=200`);
      const rows = await localiseMedia(json.data ?? []);
      await fs.writeFile(
        path.join(OUT_DATA, `${name}.json`),
        JSON.stringify(rows, null, 2) + '\n'
      );
      summary[name] = rows.length;
      console.log(`${name.padEnd(16)} ${String(rows.length).padStart(3)} entrees`);
    } catch (err) {
      summary[name] = `ERREUR : ${err.message}`;
      console.warn(`${name.padEnd(16)} ${err.message}`);
    }
  }

  await fs.writeFile(
    path.join(OUT_DATA, '_export.json'),
    JSON.stringify({ source: BASE, collections: summary }, null, 2) + '\n'
  );
  console.log('\nExport termine dans data/strapi/ et public/medias/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
