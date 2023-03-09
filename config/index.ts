import type { NuxtConfig } from 'nuxt/schema';
import { head } from './head';

const css: NuxtConfig['css'] = [
  'mapbox-gl/dist/mapbox-gl.css',
  'v-mapbox/dist/v-mapbox.css',
  '~/assets/css/global.css',
  '~/assets/css/fonts.css',
];

const plugins: NuxtConfig['plugins'] = [
  '~/plugins/v-mapbox.ts',
  '~/plugins/v-click-outside.ts',
];

const runtimeConfig: NuxtConfig['runtimeConfig'] = {
  public: {
    map: {
      aws: {
        region: 'ap-south-1',
        key: process.env.AWS_MAP_TOKEN,
      },
      mapbox: {
        key: process.env.MAPBOX_MAP_TOKEN,
      },
    },
    appVersion: process.env.npm_package_version,
  },
};
const app: NuxtConfig['app'] = {
  baseURL: '/',
  head,
};

const ssr: NuxtConfig['ssr'] = false;

export { modules } from './modules';
export { app, css, plugins, runtimeConfig, ssr };
