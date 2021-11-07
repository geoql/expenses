import { defineNuxtConfig } from 'nuxt3';
import { css, meta, publicRuntimeConfig } from './config';
import { buildModules } from './config/buildModules';

export default defineNuxtConfig({
  ssr: false,
  // https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#meta
  meta,
  // https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#css
  css,
  // https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#publicruntimeconfig
  publicRuntimeConfig,
  // https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#buildmodules
  buildModules,
});
