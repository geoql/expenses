import { NuxtOptionsModule } from '@nuxt/types/config/module';
import { axios } from './axios';
import { pwa } from './pwa';

const modules: NuxtOptionsModule[] = [
  // https://go.nuxtjs.dev/axios
  ['@nuxtjs/axios', axios],
  // https://go.nuxtjs.dev/pwa
  ['@nuxtjs/pwa', pwa],
];

export { modules };
