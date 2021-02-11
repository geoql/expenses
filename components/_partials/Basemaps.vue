<template>
  <div
    class="p-2 space-y-2"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="options-menu"
  >
    <div
      v-for="basemap in data.basemaps"
      :key="basemap.type"
      class="select-none"
    >
      <div
        class="flex items-center justify-between p-2 rounded shadow cursor-pointer hover:shadow-md"
        :class="{
          'text-white bg-purple-800': basemap.enabled,
          'text-gray-800 bg-gray-400 dark:text-white dark:bg-gray-600': !basemap.enabled,
        }"
        @click="updateBasemap(basemap)"
      >
        <div class="w-full prose-sm">
          {{ basemap.type }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  export default defineComponent({
    name: 'Basemaps',
    props: {
      data: {
        type: Object,
        default: () => {},
        required: true,
      },
    },
    setup(_, { emit }) {
      function updateBasemap(basemap: {
        enabled: boolean;
        style: string;
      }): void {
        if (!basemap.enabled) {
          emit('update-map-style', basemap.style);
        }
      }
      return {
        updateBasemap,
      };
    },
  });
</script>
