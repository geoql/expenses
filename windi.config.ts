import colors from 'windicss/colors';
import { defineConfig } from 'windicss/helpers';
import defaultTheme from 'windicss/defaultTheme';

const extract = {
  include: ['**/*.{vue,html,jsx,tsx,md}'],
  exclude: ['node_modules', '.git'],
};

const theme = {
  extend: {
    colors: {
      ...colors,
      gray: colors.stone,
      transparent: 'transparent',
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    typography: {
      DEFAULT: {
        css: {
          pre: {
            backgroundColor: colors.stone[200],
          },
        },
      },
      DARK: {
        css: {
          pre: {
            backgroundColor: colors.stone[800],
          },
        },
      },
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
    rtl: true,
    className: 'prose',
  }),
];

export default defineConfig({
  darkMode: 'class',
  extract,
  theme,
  plugins,
});
