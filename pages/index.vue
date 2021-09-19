<template>
  <div class="flex items-center justify-center w-full h-full select-none">
    <!-- Loading indicator -->
    <div
      v-if="loading"
      class="
        fixed
        z-10
        flex
        items-center
        justify-center
        w-full
        h-full
        opacity-75
      "
    >
      <svg
        class="w-5 h-5 text-white animate-spin"
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
    <common-map
      :class="{ 'opacity-50': loading }"
      :loaded.sync="state.map.loaded"
      :style-changed.sync="state.map.styleChanged"
      :center.sync="state.map.center"
      @click="mapClicked"
    >
      <!-- Form to add debit or credit -->
      <mgl-marker
        :coordinates="state.map.marker.center"
        :draggable="true"
        @dragend="markerDragged"
      >
        <!-- Marker svg -->
        <svg
          slot="marker"
          class="w-8 h-8 cursor-pointer"
          :class="getMarkerColor"
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
        <!-- Form -->
        <mgl-popup
          :showed="false"
          :close-button="false"
          :close-on-click="true"
          :close-on-move="false"
          class-name="expense-popup-card"
        >
          <div
            class="
              flex flex-col
              items-start
              justify-center
              text-white
              border border-gray-700
              rounded-md
              shadow-lg
              bg-gradient-to-tr
              from-gray-700
              to-gray-800
            "
          >
            <div
              class="
                flex
                items-center
                justify-between
                w-full
                px-4
                py-2
                border-b border-gray-600
              "
            >
              <div class="capitalize">
                {{ state.expense.form.type }}
              </div>
              <button
                type="button"
                class="
                  relative
                  inline-flex
                  flex-shrink-0
                  h-6
                  transition-colors
                  duration-200
                  ease-in-out
                  border-2 border-transparent
                  rounded-full
                  cursor-pointer
                  w-11
                  focus:outline-none focus:ring-1 focus:ring-offset-1
                "
                :class="{
                  'bg-green-600 focus:ring-green-500':
                    state.expense.form.type === 'credit',
                  'bg-red-600 focus:ring-red-500':
                    state.expense.form.type === 'debit',
                }"
                aria-pressed="false"
                @click="
                  state.expense.form.type === 'credit'
                    ? (state.expense.form.type = 'debit')
                    : (state.expense.form.type = 'credit')
                "
              >
                <span class="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  :class="{
                    'translate-x-5': state.expense.form.type === 'debit',
                    'translate-x-0': state.expense.form.type === 'credit',
                  }"
                  class="
                    inline-block
                    w-5
                    h-5
                    transition
                    duration-200
                    ease-in-out
                    transform
                    translate-x-0
                    bg-white
                    rounded-full
                    shadow
                    pointer-events-none
                    ring-0
                  "
                />
              </button>
            </div>
            <form class="grid p-4 space-y-2" @submit.prevent="add">
              <!-- Amount -->
              <div class="rounded-md shadow-sm">
                <label
                  for="expense"
                  class="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Amount
                </label>
                <div class="relative mt-1 rounded-md shadow-sm">
                  <div
                    class="
                      absolute
                      inset-y-0
                      left-0
                      flex
                      items-center
                      pl-3
                      pointer-events-none
                    "
                  >
                    <svg
                      class="w-5 h-5 text-gray-400"
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
                  <input
                    id="expense"
                    v-model.number="state.expense.form.amount"
                    type="text"
                    name="expense"
                    autofocus="true"
                    required="true"
                    class="
                      block
                      w-full
                      pl-10
                      border-gray-300
                      rounded-md
                      dark:text-gray-800
                      sm:text-sm
                    "
                    :class="{
                      'focus:ring-green-500 focus:border-green-500':
                        state.expense.form.type === 'credit',
                      'focus:ring-red-500 focus:border-red-500':
                        state.expense.form.type === 'debit',
                    }"
                    :placeholder="
                      state.expense.form.type === 'credit'
                        ? 'eg. 100'
                        : 'eg. 96'
                    "
                  />
                </div>
              </div>
              <div class="rounded-md shadow-sm">
                <label
                  for="description"
                  class="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  v-model="state.expense.form.description"
                  name="description"
                  rows="2"
                  :class="{
                    'focus:ring-green-500 focus:border-green-500':
                      state.expense.form.type === 'credit',
                    'focus:ring-red-500 focus:border-red-500':
                      state.expense.form.type === 'debit',
                  }"
                  class="
                    block
                    w-full
                    mt-1
                    border-gray-300
                    rounded-md
                    dark:text-gray-800
                    sm:text-sm
                  "
                  :placeholder="
                    state.expense.form.type === 'credit'
                      ? 'eg. refund Rs. 100'
                      : 'eg. spent 96 on milk'
                  "
                />
              </div>
              <div class="rounded-md shadow-sm">
                <button
                  type="submit"
                  :class="{
                    'bg-red-600 hover:bg-red-700 focus:ring-red-500':
                      state.expense.form.type === 'debit',
                    'bg-green-600 hover:bg-green-700 focus:ring-green-500':
                      state.expense.form.type === 'credit',
                  }"
                  class="
                    inline-flex
                    items-center
                    justify-center
                    w-full
                    px-4
                    py-1
                    text-sm
                    font-medium
                    text-white
                    transition-colors
                    duration-200
                    ease-in-out
                    border border-transparent
                    rounded-md
                    shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                  "
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </mgl-popup>
      </mgl-marker>
      <!-- Marker with previously added data -->
      <template
        v-if="
          state.expense.geojson !== null &&
          state.expense.geojson.features.length > 0
        "
      >
        <mgl-marker
          v-for="(marker, idx) in state.expense.geojson.features"
          :key="idx"
          :coordinates="marker.geometry.coordinates"
        >
          <svg
            slot="marker"
            class="w-6 h-6 cursor-pointer"
            :class="{
              'text-green-600': marker.properties.expense.type === 'credit',
              'text-red-600': marker.properties.expense.type === 'debit',
            }"
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
          <!-- Form -->
          <mgl-popup
            :showed="false"
            :close-button="false"
            :close-on-click="true"
            :close-on-move="true"
            class-name="expense-popup-card"
          >
            <div
              class="
                flex flex-col
                items-start
                justify-center
                text-white
                border border-gray-700
                rounded-md
                shadow-lg
                bg-gradient-to-tr
                from-gray-700
                to-gray-800
              "
            >
              <div
                class="
                  flex
                  items-center
                  justify-between
                  w-full
                  px-3
                  py-1
                  border-b border-gray-600
                "
              >
                <div class="capitalize">
                  {{ marker.properties.expense.type }}
                  <span v-if="marker.properties.date">
                    -
                    {{
                      new Date(marker.properties.date).toLocaleDateString(
                        'en',
                        { year: 'numeric', month: 'short', day: 'numeric' },
                      )
                    }}
                  </span>
                </div>
              </div>
              <div
                class="
                  flex flex-col
                  items-start
                  justify-between
                  px-3
                  py-1
                  space-y-1
                "
              >
                <div
                  v-if="marker.properties.expense.amount"
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
                  v-if="marker.properties.expense.description"
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
          </mgl-popup>
        </mgl-marker>
      </template>
    </common-map>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    reactive,
    useContext,
  } from '@nuxtjs/composition-api';
  import { MglMarker, MglPopup } from 'v-mapbox';
  import type { EventData } from 'mapbox-gl';
  import type { Feature, FeatureCollection, Point } from 'geojson';
  import CommonMap from '@/components/map/CommonMap.vue';

  export default defineComponent({
    name: 'Dashboard',
    components: {
      MglMarker,
      MglPopup,
      CommonMap,
    },
    setup() {
      // @ts-ignore
      const { $colorMode } = useContext();

      const state = reactive({
        map: {
          loaded: false as boolean,
          styleChanged: false as boolean,
          center: [73.8567, 18.5204],
          marker: {
            center: [73.8267, 18.5604],
          },
        },
        expense: {
          form: {
            amount: undefined as number | undefined,
            description: '' as string,
            type: 'debit' as 'credit' | 'debit',
          },
          geojson: {
            type: 'FeatureCollection',
            features: [],
          } as FeatureCollection<Point>,
        },
      });
      const loading = computed(
        () => !state.map.loaded || !state.map.styleChanged,
      );

      onMounted(() => {
        state.expense.geojson = JSON.parse(
          localStorage.getItem('expenses') as any,
        ) as FeatureCollection<Point>;
      });

      const getMarkerColor = computed(() => {
        return [
          $colorMode.preference !== 'light'
            ? 'text-indigo-500'
            : 'text-indigo-600',
        ];
      });

      /**
       * Adds a temp marker to store
       *
       * @param {EventData} e - Mapbox Event
       */
      function mapClicked(e: EventData): void {
        // eslint-disable-next-line no-console
        console.log('map clicked event :', e);
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
          localStorage.setItem('expenses', JSON.stringify(fc));
        } else {
          state.expense.geojson.features.push(feature);
          localStorage.setItem(
            'expenses',
            JSON.stringify(state.expense.geojson),
          );
        }
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
        // methods:
        mapClicked,
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
