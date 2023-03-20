import type { NuxtAppConfig } from 'nuxt/schema';

const head: NuxtAppConfig['head'] = {
  title: 'Map My Expenses :: Dashboard',
  meta: [
    {
      charset: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    { hid: 'title', name: 'title', content: 'Map My Expenses' },
    {
      hid: 'description',
      name: 'description',
      content: 'Visualize all your expenses on the map',
    },
    { hid: 'og:title', property: 'og:title', content: 'Map My Expenses.' },
    {
      hid: 'og:description',
      property: 'og:title',
      content: 'Quickly map all your expenses',
    },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: 'Map My Expenses',
    },
    {
      hid: 'twitter:description',
      property: 'og:site_name',
      content: 'Quickly map all your expenses',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
  noscript: [
    {
      innerHTML: 'This application requires JavaScript.',
    },
  ],
};

export { head };
