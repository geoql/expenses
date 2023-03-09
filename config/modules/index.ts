import type { NuxtConfig } from 'nuxt/schema';

const modules: NuxtConfig['modules'] = [
  // https://pinia.esm.dev/ssr/nuxt.html#nuxt-js
  '@pinia/nuxt',
  // https://windicss.org/guide/
  'nuxt-windicss',
  // https://vueuse.org/guide/#nuxt
  '@vueuse/nuxt',
];

export { modules };
