import type { NuxtOptionsBuild } from '@nuxt/types/config/build';
import type { Configuration } from 'webpack';

// Build Configuration (https://go.nuxtjs.dev/config-build)
const build: NuxtOptionsBuild = {
  corejs: 3,
  terser: {
    cache: true,
    parallel: true,
    sourceMap: true,
    terserOptions: {
      ecma: 2020,
      mangle: true,
      module: true,
      sourceMap: true,
    },
  },
  babel: {
    babelrc: false,
    presets() {
      return [
        '@babel/preset-env',
        ['@nuxt/babel-preset-app', { corejs: { version: 3 } }],
      ];
    },
  },
  extend(config: Configuration) {
    if (config && config.module) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      });
      config.node = {
        fs: 'empty',
      };
    }
  },
};

export { build };
