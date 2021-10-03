import { NuxtOptionsModule } from '@nuxt/types/config/module';
import { image } from './image';
import { windicss } from './windicss';

const buildModules: NuxtOptionsModule[] = [
  // https://go.nuxtjs.dev/typescript
  '@nuxt/typescript-build',
  // https://go.nuxtjs.dev/stylelint
  '@nuxtjs/stylelint-module',
  // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
  '@nuxtjs/composition-api/module',
  // https://image.nuxtjs.org/getting-started/installation
  ['@nuxt/image', image],
  // https://windicss.org/integrations/nuxt.html
  ['nuxt-windicss', windicss],
  // https://github.com/robcresswell/nuxt-compress
  'nuxt-compress',
];

export { buildModules };
