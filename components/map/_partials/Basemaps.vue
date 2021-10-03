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
        class="
          flex
          items-center
          justify-between
          p-2
          rounded
          shadow
          cursor-pointer
          hover:shadow-md
        "
        :class="{
          'text-white bg-gradient-to-l from-purple-600 to-purple-800':
            basemap.enabled,
          'text-gray-800 bg-gray-400 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-100':
            !basemap.enabled,
        }"
        @click="updateBasemap(basemap)"
      >
        <div class="w-1/2">
          <nuxt-img
            format="webp"
            fit="cover"
            class="h-12 rounded-lg"
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
  import { defineComponent } from '@nuxtjs/composition-api';
  import type { SetupContext, PropType } from '@nuxtjs/composition-api';
  import type { Basemaps, Basemap } from '~/@types/map';

  export default defineComponent({
    name: 'Basemaps',
    props: {
      data: {
        type: Object as PropType<Basemaps>,
        required: true,
      },
    },
    setup(_, { emit }: SetupContext) {
      /**
       * Updates the basemap
       *
       * @param {Basemap} basemap - The basemap to update
       */
      function updateBasemap(basemap: Basemap): void {
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
