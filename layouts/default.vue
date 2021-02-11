<template>
  <div
    class="w-screen h-screen text-gray-900 transition-colors duration-150 bg-gray-100 dark:text-gray-100 dark:bg-gray-900"
  >
    <v-header />
    <nuxt class="-mt-20 -mb-20 pt-20 pb-20" />
    <v-footer />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';
  import VHeader from '@/components/VHeader.vue';
  import VFooter from '@/components/VFooter.vue';

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      VHeader,
      VFooter,
    },
  });
</script>
