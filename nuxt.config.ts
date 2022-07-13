import { defineNuxtConfig } from 'nuxt';
import { css, meta, modules, publicRuntimeConfig } from './config';

export default defineNuxtConfig({
  ssr: false,
  modern: 'client',
  target: 'static',
  meta,
  css,
  publicRuntimeConfig,
  modules,
});
