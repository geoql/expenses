<template>
  <div class="h-full w-full">
    <label for="geocoder" class="sr-only">Search</label>
    <input
      id="geocoder"
      v-model="state.search"
      type="text"
      name="geocoder"
      class="block h-full w-full rounded-md bg-gray-200 bg-opacity-25 text-gray-900 shadow-sm dark:bg-gray-800 sm:text-sm dark:text-gray-50"
      placeholder="eg. Mumbai"
      autofocus
      @input="geocode"
    />
    <div
      v-if="state.results.length > 0"
      class="mt-1 flex flex-col overflow-auto divide-y divide-gray-100 dark:divide-gray-500"
    >
      <div
        v-for="({ label, lng, lat, zoom }, index) in state.results"
        :key="index"
        class="flex-1 cursor-pointer select-none truncate bg-gray-200 bg-opacity-50 px-1 dark:bg-gray-800 hover:bg-opacity-100"
        :title="label"
        @click="$emit('fly-to', { lng, lat, zoom })"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import type { SearchResult, GeocodedFeature } from '~/@types/map';

  export default defineComponent({
    name: 'Geocoder',
    props: {
      bbox: {
        type: Array as PropType<number[] | number[][]>,
        required: false,
        default: () => [],
      },
    },
    setup(props) {
      const runtimeConfig = useRuntimeConfig();
      const state = reactive({
        search: '',
        loading: false,
        results: [] as SearchResult[],
      });
      /**
       *
       */
      async function geocode() {
        if (state.search && !state.loading) {
          state.loading = true;
          const mapToken = runtimeConfig.public.map.mapbox.key;
          const queryStr = encodeURIComponent(state.search);
          // minLon, minLat, maxLon, maxLat
          const bbox = props.bbox;
          try {
            const { data }: { data: { features: GeocodedFeature[] } } =
              await useFetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${queryStr}.json?access_token=${mapToken}&bbox=${bbox}`,
              );
            if (data && data.features) {
              state.results = data.features.map((feature: GeocodedFeature) => {
                return {
                  label: feature.place_name,
                  lng: feature.center[0],
                  lat: feature.center[1],
                  zoom: feature.place_type.includes('poi') ? 15 : 10,
                };
              });
            }
            state.loading = false;
          } catch (error) {
            console.log('error: ', error);
            state.loading = false;
            // alert(error.data.message);
          } finally {
            state.loading = false;
          }
        }
      }

      return {
        state,
        geocode,
      };
    },
  });
</script>
