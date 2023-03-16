import colors from 'windicss/colors';
import { defineConfig } from 'windicss/helpers';

const extract = {
  include: ['**/*.{vue,html,jsx,tsx}'],
  exclude: ['node_modules', '.git'],
};

const theme = {
  extend: {
    colors: {
      ...colors,
      gray: colors.slate,
      transparent: 'transparent',
    },
    fontFamily: {
      sans: ['Inter var', ...require('windicss/defaultTheme').fontFamily.sans],
    },
  },
};
const plugins = [
  require('windicss/plugin/filters'),
  require('windicss/plugin/forms'),
  require('windicss/plugin/aspect-ratio'),
  require('windicss/plugin/line-clamp'),
  require('windicss/plugin/scroll-snap'),
  require('@windicss/plugin-scrollbar'),
  require('@windicss/plugin-animations'),
  require('windicss/plugin/typography')({
    dark: true,
    modifiers: ['DEFAULT', 'sm', 'lg', 'red'],
  }),
];

export default defineConfig({
  darkMode: 'class',
  extract,
  theme,
  plugins,
});
