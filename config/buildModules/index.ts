import { NuxtOptionsModule } from '@nuxt/types/config/module';
import { colorMode } from './color-mode';
import { tailwindcss } from './tailwindcss';

const buildModules: NuxtOptionsModule[] = [
  // https://go.nuxtjs.dev/typescript
  '@nuxt/typescript-build',
  // https://go.nuxtjs.dev/stylelint
  '@nuxtjs/stylelint-module',
  // https://go.nuxtjs.dev/tailwindcss
  ['@nuxtjs/tailwindcss', tailwindcss],
  // https://color-mode.nuxtjs.org/#setup
  ['@nuxtjs/color-mode', colorMode],
  // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
  '@nuxtjs/composition-api/module',
];

export { buildModules };
