import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind,
  presetUno,
  transformerDirectives,
} from 'unocss';
import { presetScrollbar } from 'unocss-preset-scrollbar';
import { presetForms } from '@julr/unocss-preset-forms';

export default defineConfig({
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        '**/*.{js,ts}',
      ],
      // exclude files
      // exclude: []
    },
  },
  presets: [
    presetUno(),
    presetWind({ dark: 'class' }),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetScrollbar(),
    presetForms(),
  ],
  transformers: [transformerDirectives()],
});
