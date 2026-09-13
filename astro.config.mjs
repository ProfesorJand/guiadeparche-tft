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
    //'/tft/meta-comps-tier-list-teamfight-tactics/KogMaw/': '/tft/meta-comps-tier-list-teamfight-tactics/kogmaw/',
    //'/tft/meta-comps-tier-list-teamfight-tactics/Zyra/': '/tft/meta-comps-tier-list-teamfight-tactics/zyra/',
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => 
        !page.includes('/admin') && 
        !page.includes('/perfil') && 
        !page.includes('/login')
    })
  ]
});