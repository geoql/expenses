const windicss = {
  scan: {
    dirs: ['./'],
    exclude: ['node_modules', 'dist', '.git', '.github', '.nuxt', '.vscode'],
  },
  preflight: {
    alias: {
      'nuxt-link': 'a',
      'nuxt-img': 'img',
    },
  },
};

export { windicss };
