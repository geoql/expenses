const purge = {
  enabled: process.env.NODE_ENV === 'production',
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js',
    // TypeScript
    'plugins/**/*.ts',
    'nuxt.config.ts',
  ],
};

const theme = {
  colors: {
    transparent: 'transparent',
    ...require('tailwindcss/colors'), // https://tailwindcss.com/docs/customizing-colors#color-palette-reference
  },
  extend: {
    fontFamily: {
      sans: [
        'Inter var',
        ...require('tailwindcss/defaultTheme').fontFamily.sans,
      ],
    },
  },
};

const { variantOrder } = require('tailwindcss/defaultConfig');

const variants = {
  extend: {
    ...require('tailwindcss/defaultConfig').variants,
    backgroundColor: ['checked'],
    backgroundImage: ['checked'],
    borderColor: ['checked'],
    scale: ['group-hover'],
  },
};

const plugins = [
  require('@tailwindcss/line-clamp'),
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
  require('@tailwindcss/aspect-ratio'),
];

module.exports = {
  mode: 'jit',
  purge,
  darkMode: 'class',
  theme,
  variantOrder,
  variants,
  plugins,
};
