import type { NuxtConfig } from 'nuxt/schema';
import { head } from './head';

const app: NuxtConfig['app'] = {
  head,
};

const components: NuxtConfig['components'] = false;

const css: NuxtConfig['css'] = [
  'maplibre-gl/dist/maplibre-gl.css',
  'v-mapbox/dist/v-mapbox.css',
  '~/assets/css/global.css',
  '~/assets/css/fonts.css',
];

const nitro: NuxtConfig['nitro'] = {
  preset: 'netlify',
};

const plugins: NuxtConfig['plugins'] = [
  { src: '~/plugins/v-click-outside.ts', mode: 'client' },
  { src: '~/plugins/v-mapbox.ts', mode: 'client' },
  { src: '~/plugins/v-web-workers.ts', mode: 'client' },
];

const routeRules: NuxtConfig['routeRules'] = {
  // Homepage pre-rendered at build time
  '/': { prerender: true },
};

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

const ssr: NuxtConfig['ssr'] = false;

const typescript: NuxtConfig['typescript'] = {
  strict: true,
  shim: false,
};

export { modules } from './modules';
export {
  app,
  components,
  css,
  nitro,
  plugins,
  routeRules,
  runtimeConfig,
  ssr,
  typescript,
};
