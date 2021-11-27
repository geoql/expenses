<template>
  <main
    class="w-screen h-screen text-gray-900 transition-colors duration-150 bg-gray-100 dark:text-gray-100 dark:bg-gray-900"
  >
    <v-header />
    <nuxt-page class="-my-10 py-10" />
    <v-footer />
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import VHeader from '@/components/common/ui/VHeader.vue';
  import VFooter from '@/components/common/ui/VFooter.vue';
  export default defineComponent({
    components: {
      VHeader,
      VFooter,
    },
  });
</script>
