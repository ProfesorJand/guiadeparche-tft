/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly API_KEY: string;
  // más variables de entorno...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
