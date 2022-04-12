<template>
  <div class="flex items-center justify-center w-full h-full select-none">
    <!-- Loading indicator -->
    <div
      v-if="loading"
      class="fixed z-10 flex items-center justify-center w-full h-full opacity-75"
    >
      <svg
        class="w-6 h-6 dark:text-white text-gray-900 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
    <common-map :class="{ 'opacity-50': loading }" @click="onMapClicked" />
  </div>
</template>

<script lang="ts">
  import type { Feature, FeatureCollection, Point } from 'geojson';
  import type { EventData } from 'mapbox-gl';
  import { computed, defineComponent, onMounted, reactive } from 'vue';
  import CommonMap from '~/components/map/CommonMap.vue';
  import Clusters from '~/components/map/layers/Clusters.vue';
  import Heatmap from '~/components/map/layers/Heatmap.vue';
  import Markers from '~/components/map/layers/Markers.vue';
  import { useMap } from '~/stores/useMap';

  export default defineComponent({
    name: 'Dashboard',
    components: {
      CommonMap,
      Markers,
      Clusters,
      Heatmap,
    },
    setup() {
      const mapStore = useMap();
      const state = reactive({
        map: {
          center: [73.8567, 18.5204],
          zoom: 11,
          marker: {
            center: [] as number[],
          },
          ui: {
            isMarker: true as boolean,
            isCluster: false as boolean,
            isHeatmap: false as boolean,
          },
        },
        expense: {
          form: {
            amount: undefined as number | undefined,
            description: '' as string,
            type: 'debit' as 'credit' | 'debit',
          },
          popup: {
            shown: false as boolean,
          },
          geojson: {
            type: 'FeatureCollection',
            features: [],
          } as FeatureCollection<Point>,
        },
      });
      const loading = computed(
        () => !mapStore.$state.ui.loaded || !mapStore.$state.ui.styleChanged,
      );
      const isDark = useDark();

      const getMarkerColor = computed(() => {
        return [isDark ? 'text-indigo-600' : 'text-indigo-500'];
      });
      const marker = computed(
        () =>
          !state.map.ui.isCluster &&
          state.map.ui.isMarker &&
          !state.map.ui.isHeatmap,
      );
      const heatmap = computed(
        () =>
          !state.map.ui.isCluster &&
          !state.map.ui.isMarker &&
          state.map.ui.isHeatmap,
      );
      const cluster = computed(
        () =>
          state.map.ui.isCluster &&
          !state.map.ui.isMarker &&
          !state.map.ui.isHeatmap,
      );
      onMounted(() => {
        state.expense.geojson = JSON.parse(
          localStorage.getItem('expenses') as any,
        ) as FeatureCollection<Point>;
      });

      /**
       * Adds a temp marker to store
       *
       * @param {EventData} e - Mapbox Event
       */
      function onMapClicked(e: EventData): void {
        if (!state.expense.popup.shown) {
          // state.map.marker.center = [e.lngLat.lng, e.lngLat.lat];
        }
      }
      /**
       * Update the marker center
       *
       * @param {Record<string,EventData>} e - Event data
       * @param {EventData} e.mapboxEvent - Mapbox Event
       */
      function markerDragged(e: { mapboxEvent: EventData }): void {
        state.map.marker.center = [
          e.mapboxEvent.target._lngLat.lng,
          e.mapboxEvent.target._lngLat.lat,
        ];
      }
      /**
       * Adds the expense to map
       *
       * @returns {void}
       */
      function add(): void {
        // Build a Feature of Type Point
        const feature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: state.map.marker.center,
          },
          properties: {
            expense: state.expense.form,
            date: Date.now(),
          },
        } as Feature<Point>;

        // If featureCollection doesn't exists in ls,
        // Create empty FeatureCollection with first Feature
        // and push it to LS, else add the newly created Feature
        // to the geojson FC and save it in LS
        if (!state.expense.geojson) {
          const fc: FeatureCollection<Point> = {
            type: 'FeatureCollection',
            features: [feature],
          };
          state.expense.geojson = fc;
          localStorage.setItem('expenses', JSON.stringify(fc));
        } else {
          localStorage.setItem(
            'expenses',
            JSON.stringify(state.expense.geojson),
          );
        }
        state.expense.geojson.features.push(feature);
        state.expense.form = {
          amount: undefined,
          description: '',
          type: 'debit',
        };
      }

      return {
        state,
        loading,
        // computed:
        getMarkerColor,
        marker,
        heatmap,
        cluster,
        // methods:
        onMapClicked,
        markerDragged,
        add,
      };
    },
  });
</script>

<style lang="scss">
  .expense-popup-card .mapboxgl-popup-tip {
    display: none;
  }

  .expense-popup-card .mapboxgl-popup-content {
    @apply bg-opacity-75;
    @apply p-0;
    @apply bg-gray-800;
  }
</style>
