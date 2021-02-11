module.exports = {
  buildCommand: () => null,
  publishCommand: ({ tag }) =>
    `echo "Releasing ${tag} version of Expenses frontend webapp"`,
};
