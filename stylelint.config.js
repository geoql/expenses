module.exports = {
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-recommended-vue',
    'stylelint-config-standard',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'color-no-invalid-hex': true,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['font-named-instance'],
      },
    ],
  },
};
