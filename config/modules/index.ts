import type { NuxtConfig } from 'nuxt/schema';
import { plausible } from './plausible';
import { unocss } from './unocss';

const modules: NuxtConfig['modules'] = [
  // https://pinia.esm.dev/ssr/nuxt.html#nuxt-js
  '@pinia/nuxt',
  // https://vueuse.org/guide/#nuxt
  '@vueuse/nuxt',
  // https://github.com/nuxt-modules/plausible#setup
  ['@nuxtjs/plausible', plausible],
  // https://unocss.dev/integrations/nuxt
  ['@unocss/nuxt', unocss],
];

export { modules };
