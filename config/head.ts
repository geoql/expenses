import type { NuxtOptionsHead } from '@nuxt/types/config/head';

const head: NuxtOptionsHead = {
  title: 'Map My Expenses :: Dashboard',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Quickly map all your expenses',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
};

export { head };
