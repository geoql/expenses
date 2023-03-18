import type { NuxtConfig } from 'nuxt/schema';
import { plausible } from './plausible';
import { windicss } from './windicss';

const modules: NuxtConfig['modules'] = [
  // https://pinia.esm.dev/ssr/nuxt.html#nuxt-js
  '@pinia/nuxt',
  // https://vueuse.org/guide/#nuxt
  '@vueuse/nuxt',
  // https://windicss.org/guide/
  ['nuxt-windicss', windicss],
  // https://github.com/nuxt-modules/plausible#setup
  ['@nuxtjs/plausible', plausible],
];

export { modules };
