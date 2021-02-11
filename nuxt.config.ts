import { build, head } from './config';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head,

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading
  loading: { color: '#cccccc' },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading-indicator/
  loadingIndicator: {
    name: 'three-bounce',
    color: '#cccccc',
    background: '#3d3c3c',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: 'mapbox-gl/dist/mapbox-gl.css', lang: 'css' },
    { src: 'v-mapbox/dist/v-mapbox.css', lang: 'css' },
    { src: '~/assets/css/global.css', lang: 'css' },
    { src: '~/assets/css/fonts.css', lang: 'css' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/click-outside', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://composition-api.nuxtjs.org/getting-started/setup
    '@nuxtjs/composition-api',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://color-mode.nuxtjs.org/#setup
    '@nuxtjs/color-mode',
  ],
  // Tailwind Config
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: true,
    config: {},
    viewer: false,
  },
  // Read more: https://color-mode.nuxtjs.org/#tailwindcss-dark-mode
  colorMode: {
    // remove -mode suffix for Tailwind Dark mode support
    classSuffix: '',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration (https://pwa.nuxtjs.org/setup)
  pwa: {
    // https://pwa.nuxtjs.org/meta
    meta: {
      name: 'MME - Dashboard',
      theme_color: '#3d3c3c',
      author: 'Vinayak Kulkarni',
      lang: 'en',
    },
    // https://pwa.nuxtjs.org/manifest
    manifest: {
      name: 'MME - Dashboard',
      short_name: 'MME',
      categories: ['map expenses', 'geo analyse expenses'],
      description: 'MME :: Dashboard',
      theme_color: '#6a7cfd',
      background_color: '#3d3c3c',
      lang: 'en',
    },
  },

  /**
   * Article: https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/#introducing-the-nuxtjs-runtime-config
   * Docs: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config/
   */
  publicRuntimeConfig: {
    mapToken: process.env.MAP_ACCESS_TOKEN,
    appVersion: process.env.npm_package_version,
  },

  // Read more: https://typescript.nuxtjs.org/guide/lint.html#runtime-lint
  typescript: {
    typeCheck: {
      eslint: {
        enabled: true,
        files: './**/*.{ts,js,vue}',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build,
};
