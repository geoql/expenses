import {
  build,
  buildModules,
  css,
  head,
  loading,
  loadingIndicator,
  modules,
  plugins,
  publicRuntimeConfig,
  typescript,
} from './config';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head,

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading
  loading,

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading-indicator/
  loadingIndicator,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins,

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules,

  // Docs: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config/
  publicRuntimeConfig,

  // Read more: https://typescript.nuxtjs.org/guide/lint.html#runtime-lint
  typescript,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build,
};
