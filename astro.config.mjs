import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://tft.guiadeparche.com', // site: 'https://profesorjand.github.io'
  image: {
    domains: ['astro.build'],
  },
  redirects: {
    '/': '/composiciones-tft/mejores-composiciones-de-teamfight-tactics/',
  },
});
