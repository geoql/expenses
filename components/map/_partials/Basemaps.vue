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
          'text-white bg-gradient-to-l from-purple-600 to-purple-800':
            basemap.enabled,
          'text-gray-800 bg-gray-400 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-100':
            !basemap.enabled,
        }"
        @click="updateBasemap(basemap)"
      >
        <div class="w-1/2">
          <img
            class="object-cover h-12 rounded-lg"
            :src="`/images/basemaps/${basemap.image}.webp`"
          />
        </div>
        <div class="w-auto prose-sm">
          {{ basemap.type }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Basemaps',
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    setup(_, { emit }) {
      /**
       * Updates the basemap
       *
       * @param {Record<string, string>} basemap - The basemap to update
       * @param {boolean} basemap.enabled - Whether the basemap is enabled
       * @param {string} basemap.style - The basemap style
       */
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
