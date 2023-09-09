import {
  app,
  components,
  css,
  modules,
  nitro,
  plugins,
  routeRules,
  runtimeConfig,
  ssr,
  typescript,
} from './config';

export default defineNuxtConfig({
  app,
  components,
  css,
  devtools: { enabled: true },
  experimental: {
    typescriptBundlerResolution: true,
    externalVue: true,
  },
  vue: {
    runtimeCompiler: true,
  },
  ssr,
  modules,
  nitro,
  plugins,
  routeRules,
  runtimeConfig,
  typescript,
});
