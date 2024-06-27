import { defineConfig, squooshImageService } from 'astro/config';
import node from '@astrojs/node';
import db from "@astrojs/db";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://tft.guiadeparche.com',
  //site: 'https://profesorjand.github.io',
  redirects: {
    '/': '/composiciones-tft/mejores-composiciones-de-teamfight-tactics/'
  },
  output: 'static', // Cambiado a 'static' para asegurarse de que se genera contenido estático para deploy
  //output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  image: {
    // remotePatterns: [{ protocol: "https" }],
    service: squooshImageService(),
    domains: ['astro.build'],
  },

  integrations: [db(), react()]
});
