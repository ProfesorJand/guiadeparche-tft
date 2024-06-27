import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import db from "@astrojs/db";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  //site: 'https://tft.guiadeparche.com',
  site: 'https://profesorjand.github.io',
  // image: {
  //   domains: ['astro.build'],
  // },
  redirects: {
    '/': '/composiciones-tft/mejores-composiciones-de-teamfight-tactics/'
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  image: {
    remotePatterns: [{ protocol: "https" }],
  },

  integrations: [db(), react()]
});