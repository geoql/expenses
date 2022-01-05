import { NuxtOptionsModule } from '@nuxt/types/config/module';

const buildModules: NuxtOptionsModule[] = [
  // https://pinia.esm.dev/ssr/nuxt.html#nuxt-js
  '@pinia/nuxt',
  // https://windicss.org/guide/
  'nuxt-windicss',
  // https://vueuse.org/guide/#nuxt
  '@vueuse/nuxt',
];

export { buildModules };
