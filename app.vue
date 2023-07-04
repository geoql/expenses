<template>
  <main
    class="h-screen w-screen bg-gray-100 text-gray-900 transition-colors duration-150 dark:bg-gray-900 dark:text-gray-100"
  >
    <v-header />
    <nuxt-page class="py-10 -my-10" />
    <v-footer />
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import VHeader from '~/components/common/ui/VHeader.vue';
  import VFooter from '~/components/common/ui/VFooter.vue';
  export default defineComponent({
    components: {
      VHeader,
      VFooter,
    },
  });
</script>
