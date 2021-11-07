<template>
  <div
    class="
      w-screen
      h-screen
      text-gray-900
      transition-colors
      duration-150
      bg-gray-100
      dark:text-gray-100 dark:bg-gray-900
    "
  >
    <v-header />
    <nuxt class="-mt-12 -mb-12 pt-12 pb-12" />
    <v-footer />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import VHeader from '@/components/common/ui/VHeader.vue';
  import VFooter from '@/components/common/ui/VFooter.vue';

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      VHeader,
      VFooter,
    },
  });
</script>
