module.exports = {
  installCommand: () => 'npm i --prefer-offline --no-audit --omit=optional',
  buildCommand: () => null,
  publishCommand: ({ tag }) =>
    `echo "Releasing ${tag} version of Expenses frontend webapp"`,
};
