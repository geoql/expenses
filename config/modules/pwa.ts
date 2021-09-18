const pwaConfig = {
  // https://pwa.nuxtjs.org/meta
  meta: {
    name: 'MME - Dashboard',
    theme_color: '#3d3c3c',
    author: 'Vinayak Kulkarni',
    lang: 'en',
  },
  // https://pwa.nuxtjs.org/manifest
  manifest: {
    name: 'MME - Dashboard',
    short_name: 'MME',
    categories: ['map expenses', 'geo analyse expenses'],
    description: 'MME :: Dashboard',
    theme_color: '#6a7cfd',
    background_color: '#3d3c3c',
    lang: 'en',
  },
};

export { pwaConfig as pwa };
