<template>
  <section v-if="data.features.length">
    <template v-for="(marker, idx) in data.features">
      <v-marker
        v-if="visibility"
        :key="idx"
        :coordinates="getExpenseMarkerCoordinates(marker)"
        @click="$emit('update:popup-visibility', true)"
      >
        <template #markers="{ setRef }">
          <svg
            :ref="(el) => setRef(el)"
            class="w-6 h-6 cursor-pointer"
            :class="getExpenseMarkerColor(marker)"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </template>
        <!-- Form -->
        <div
          class="flex flex-col items-start justify-center text-white border border-gray-700 rounded-md shadow-lg bg-gradient-to-tr from-gray-700 to-gray-800"
        >
          <div
            class="flex items-center justify-between w-full px-3 py-1 border-b border-gray-600"
          >
            <div v-if="marker.properties" class="capitalize">
              {{ marker.properties.expense.type }}
              <span v-if="marker.properties.date">
                -
                {{
                  new Date(marker.properties.date).toLocaleDateString('en', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              </span>
            </div>
          </div>
          <div
            class="flex flex-col items-start justify-between px-3 py-1 space-y-1"
          >
            <div
              v-if="marker.properties && marker.properties.expense.amount"
              class="flex items-center space-x-2"
            >
              <div class="w-auto text-sm">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div class="w-24 text-base break-all">
                {{ marker.properties.expense.amount }}
              </div>
            </div>
            <div
              v-if="marker.properties && marker.properties.expense.description"
              class="flex items-center space-x-2"
            >
              <div class="w-auto text-sm">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="text-base break-words w-36">
                {{ marker.properties.expense.description }}
              </div>
            </div>
          </div>
        </div>
      </v-marker>
    </template>
  </section>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import type {
    Feature,
    FeatureCollection,
    GeoJsonProperties,
    Point,
  } from 'geojson';
  import { VMarker } from '~/lib/v-mapbox';

  export default defineComponent({
    name: 'ExpenseMarker',
    components: {
      VMarker,
    },
    props: {
      data: {
        type: Object as PropType<FeatureCollection<Point>>,
        required: true,
        description: 'Point type features within the FeatureCollection',
      },
      visibility: {
        type: Boolean as PropType<boolean>,
        required: true,
        description: 'Whether to show the marker or not',
      },
      popupVisibility: {
        type: Boolean as PropType<boolean>,
        required: true,
        description: 'Whether to show the popup or not',
      },
    },
    setup() {
      /**
       * Gets the coordinates for the marker
       *
       * @param {Feature<Point, GeoJsonProperties>} m - Marker
       * @returns {number[]} - Coordinates
       */
      function getExpenseMarkerCoordinates(
        m: Feature<Point, GeoJsonProperties>,
      ): [number, number] {
        return [m.geometry.coordinates[0], m.geometry.coordinates[1]];
      }

      /**
       * Gets the color for the svg
       * marker based on the expense type
       *
       * @param {Feature<Point>} m - Expense type
       * @returns {Record<string, boolean> | string} - Color object
       */
      function getExpenseMarkerColor(
        m: Feature<Point, GeoJsonProperties>,
      ): Record<string, boolean> | string {
        if (m.properties) {
          return {
            'text-green-600': m.properties.expense.type === 'credit',
            'text-red-600': m.properties.expense.type === 'debit',
          };
        }
        return 'text-blue-600';
      }

      return {
        getExpenseMarkerCoordinates,
        getExpenseMarkerColor,
      };
    },
  });
</script>