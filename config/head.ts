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
      hid: 'description',
      name: 'description',
      content: 'Quickly map all your expenses',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
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