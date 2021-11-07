import { NuxtOptionsPlugin } from '@nuxt/types/config/plugin';
import { NuxtOptionsRuntimeConfig } from '@nuxt/types/config/runtime';

const publicRuntimeConfig: NuxtOptionsRuntimeConfig = {
  mapToken: process.env.MAP_TOKEN,
  appVersion: process.env.npm_package_version,
};

const css: string[] = [
  'mapbox-gl/dist/mapbox-gl.css',
  '~/assets/css/global.css',
  '~/assets/css/fonts.css',
];

const plugins: NuxtOptionsPlugin[] = [];

export { meta } from './meta';
export { css, plugins, publicRuntimeConfig };
