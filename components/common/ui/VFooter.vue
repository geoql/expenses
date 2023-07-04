<template>
  <div
    class="h-10 w-full flex items-center justify-between border-t border-gray-300 px-4 dark:border-gray-700"
  >
    <p class="text-sm">
      Made with <span class="animate-pulse">❤️</span> by
      <a href="https://vinayakkulkarni.dev">@Vinayak</a> &copy;
      {{ state.date }}
    </p>
    <div
      class="flex items-center justify-center space-x-2 lg:space-x-4 md:space-x-3"
    >
      <span class="text-sm font-light opacity-75">
        (v{{ state.appVersion }})
      </span>
      <a
        href="https://github.com/geoql/expenses"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="GitHub"
        class="transition-colors duration-100 ease-linear hover:text-gray-700"
      >
        <svg viewBox="0 0 32 32" class="h-4 fill-current">
          <title id="github" lang="en">GitHub</title>
          <path
            d="M16 0.395c-8.836 0-16 7.163-16 16 0 7.069 4.585 13.067 10.942 15.182 0.8 0.148 1.094-0.347 1.094-0.77 0-0.381-0.015-1.642-0.022-2.979-4.452 0.968-5.391-1.888-5.391-1.888-0.728-1.849-1.776-2.341-1.776-2.341-1.452-0.993 0.11-0.973 0.11-0.973 1.606 0.113 2.452 1.649 2.452 1.649 1.427 2.446 3.743 1.739 4.656 1.33 0.143-1.034 0.558-1.74 1.016-2.14-3.554-0.404-7.29-1.777-7.29-7.907 0-1.747 0.625-3.174 1.649-4.295-0.166-0.403-0.714-2.030 0.155-4.234 0 0 1.344-0.43 4.401 1.64 1.276-0.355 2.645-0.532 4.005-0.539 1.359 0.006 2.729 0.184 4.008 0.539 3.054-2.070 4.395-1.64 4.395-1.64 0.871 2.204 0.323 3.831 0.157 4.234 1.026 1.12 1.647 2.548 1.647 4.295 0 6.145-3.743 7.498-7.306 7.895 0.574 0.497 1.085 1.47 1.085 2.963 0 2.141-0.019 3.864-0.019 4.391 0 0.426 0.288 0.925 1.099 0.768 6.354-2.118 10.933-8.113 10.933-15.18 0-8.837-7.164-16-16-16z"
          />
        </svg>
      </a>
      <a
        href="https://twitter.com/_vinayak_k"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Twitter"
        class="transition-colors duration-100 ease-linear hover:text-blue-500"
      >
        <svg viewBox="0 0 512 512" class="h-4 fill-current">
          <title id="twitter" lang="en">Twitter Profile</title>
          <g>
            <path
              d="M459.4 151.7c0.3 4.5 0.3 9.1 0.3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"
            />
          </g>
        </svg>
      </a>
      <a
        href="https://app.netlify.com/sites/map-my-expenses/deploys"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Deploys via Netlify"
      >
        <img
          class="h-8"
          src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"
          alt="Deploys by Netlify"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import { useNuxtApp } from '#app';
  import { defineComponent, reactive } from 'vue';
  export default defineComponent({
    name: 'Footer',
    setup() {
      const { $config } = useNuxtApp();
      const state = reactive({
        date: new Date().getFullYear(),
        appVersion: $config.public.appVersion,
      });
      return {
        state,
      };
    },
  });
</script>
