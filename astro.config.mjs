import { defineConfig, squooshImageService } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

import react from "@astrojs/react";

// https://astro.build/config
// export default defineConfig({
//   site: 'https://guiadeparche.com', // para guiadeparche
//   //site: 'https://profesorjand.github.io', // para github page
//   //base: '/guiadeparche-tft', // para github page
//   //trailingSlash: "always", //para github page
//   redirects: {
//     '/': '/tft/composiciones-tft/mejores-composiciones-de-teamfight-tactics/' // github page '/guiadeparche-tft/composiciones-tft/mejores-composiciones-de-teamfight-tactics/'
//   },
//   output: 'static', // Cambiado a 'static' para asegurarse de que se genera contenido estático para deploy
//   //output: 'server',
//   // adapter: node({
//   //   mode: '@astrojs/node',
//   // }),
//   adapter: node({
//     mode: 'standalone',
//   }),
//   image: {
//     // remotePatterns: [{ protocol: "https" }],
//     service: squooshImageService(),
//     domains: ['astro.build'],
//   },
//   integrations: [db(), react(), sitemap()]
// });

// Cargar reglas de exclusión configuradas desde el Panel Admin (SEO → Indexación Google)
const defaultExcludedRules = [
  { pattern: '/admin', match_type: 'prefix' },
  { pattern: '/perfil', match_type: 'prefix' },
  { pattern: '/login', match_type: 'prefix' },
];

let seoExcludedRules = defaultExcludedRules;
try {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  const resp = await fetch('https://api.guiadeparche.com/seo/manage_exclusions.php', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
      'Origin': 'https://guiadeparche.com',
      'Referer': 'https://guiadeparche.com/',
      ...(process.env?.BUILD_API_SECRET || process.env?.API_KEY
        ? { 'X-Build-Secret': process.env.BUILD_API_SECRET || process.env.API_KEY }
        : {}),
    },
    signal: controller.signal,
  });
  clearTimeout(timer);
  if (resp.ok) {
    const json = await resp.json();
    if (json && Array.isArray(json.rules) && json.rules.length > 0) {
      seoExcludedRules = json.rules;
    }
  }
} catch {
  // Si el build corre offline o el endpoint aún no está subido, usar las reglas por defecto
}

const isSitemapPageExcluded = (pageUrl) => {
  let pathname = '/';
  try {
    pathname = new URL(pageUrl).pathname;
  } catch {
    pathname = String(pageUrl || '/');
  }
  const cleanPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';

  return seoExcludedRules.some((rule) => {
    const rawPattern = typeof rule === 'string' ? rule : rule?.pattern;
    const matchType = typeof rule === 'object' ? (rule?.match_type || 'prefix') : 'prefix';
    if (!rawPattern) return false;
    const cleanPattern = String(rawPattern).toLowerCase().replace(/\/+$/, '') || '/';
    if (cleanPattern === '/') return false;
    if (matchType === 'exact') return cleanPath === cleanPattern;
    return cleanPath === cleanPattern || cleanPath.startsWith(cleanPattern + '/');
  });
};

export default defineConfig({
  site: 'https://guiadeparche.com',
  base: '/', // muy importante que NO tenga subcarpetas
  output: 'static', // <-- Muy importante
  redirects: {
    '/tft/meta-comps-tier-list-teamfight-tactics/bel-veth/': '/tft/meta-comps-tier-list-teamfight-tactics/belveth/',
    '/tft/meta-comps-tier-list-teamfight-tactics/Akali/': '/tft/meta-comps-tier-list-teamfight-tactics/akali/',
    '/tft/meta-comps-tier-list-teamfight-tactics/Caitlyn/': '/tft/meta-comps-tier-list-teamfight-tactics/caitlyn/',
    '/tft/meta-comps-tier-list-teamfight-tactics/master-Yi/': '/tft/meta-comps-tier-list-teamfight-tactics/master-yi/',
    '/tft/meta-comps-tier-list-teamfight-tactics/Nidalee/': '/tft/meta-comps-tier-list-teamfight-tactics/nidalee/',
    '/tft/meta-comps-tier-list-teamfight-tactics/SivirGnar/': '/tft/meta-comps-tier-list-teamfight-tactics/sivir/',
    '/tft/meta-comps-tier-list-teamfight-tactics/Soraka/': '/tft/meta-comps-tier-list-teamfight-tactics/soraka/',
    '/tft/meta-comps-tier-list-teamfight-tactics/Xayah/': '/tft/meta-comps-tier-list-teamfight-tactics/xayah/',
    '/tft/meta-comps-tier-list-teamfight-tactics/fuegorrpido/': '/tft/meta-comps-tier-list-teamfight-tactics/fuegorapido/',
    //'/tft/meta-comps-tier-list-teamfight-tactics/Zyra/': '/tft/meta-comps-tier-list-teamfight-tactics/zyra/',
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !isSitemapPageExcluded(page)
    })
  ]
});