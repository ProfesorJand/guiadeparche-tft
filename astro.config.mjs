import { defineConfig, squooshImageService } from 'astro/config';
import node from '@astrojs/node';
import db from "@astrojs/db";
import sitemap from '@astrojs/sitemap';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://tft.guiadeparche.com', // para guiadeparche
  //site: 'https://profesorjand.github.io', // para github page
  //base: '/guiadeparche-tft', // para github page
  //trailingSlash: "always", //para github page
  redirects: {
    '/': '/composiciones-tft/mejores-composiciones-de-teamfight-tactics/' // github page '/guiadeparche-tft/composiciones-tft/mejores-composiciones-de-teamfight-tactics/'
  },
  output: 'server', // Cambiado a 'static' para asegurarse de que se genera contenido estático para deploy
  //output: 'server',
  adapter: node({
    mode: '@astrojs/node',
  }),
  // adapter: node({
  //   mode: 'standalone',
  // }),
  image: {
    // remotePatterns: [{ protocol: "https" }],
    service: squooshImageService(),
    domains: ['astro.build'],
  },
  integrations: [db(), react(), sitemap()]
});
