import {
  NuxtOptionsLoading,
  NuxtOptionsLoadingIndicator,
} from '@nuxt/types/config/loading';
import { NuxtOptionsPlugin } from '@nuxt/types/config/plugin';
import { NuxtOptionsRuntimeConfig } from '@nuxt/types/config/runtime';
import { buildModules } from './buildModules';
import { modules } from './modules';

const typescript = {
  typeCheck: {
    eslint: {
      enabled: true,
      files: [
        '@types/**/*.{ts,js}',
        // 'assets/**/*.{ts,js}',
        'components/**/*.{ts,js,vue}',
        'config/**/*.{ts,js}',
        'layouts/**/*.{ts,js,vue}',
        'pages/**/*.{ts,js,vue}',
        'plugins/**/*.{ts,js}',
      ],
    },
  },
};

const publicRuntimeConfig: NuxtOptionsRuntimeConfig = {
  mapToken: process.env.MAP_ACCESS_TOKEN,
  appVersion: process.env.npm_package_version,
};

const css: string[] = [
  'mapbox-gl/dist/mapbox-gl.css',
  'v-mapbox/dist/v-mapbox.css',
  '~/assets/css/global.css',
  '~/assets/css/fonts.css',
];

const plugins: NuxtOptionsPlugin[] = [
  { src: '~/plugins/click-outside', mode: 'client' },
];

const loading: NuxtOptionsLoading = { color: '#cccccc' };

const loadingIndicator: NuxtOptionsLoadingIndicator = {
  name: 'pulse',
  color: '#cccccc',
  color2: '#F4F4F4',
  background: 'rgba(17, 24, 39)',
};

export { build } from './build';
export { head } from './head';
export {
  css,
  loading,
  loadingIndicator,
  plugins,
  typescript,
  publicRuntimeConfig,
  buildModules,
  modules,
};
