<template>
  <div class="flex items-center justify-center w-full h-full select-none">
    <!-- Loading indicator -->
    <div
      v-if="!mapStore.loaded"
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
    <common-map
      :class="{ 'opacity-50': !mapStore.loaded }"
      @on-clicked="onMapClicked"
    >
      <div
        class="absolute top-0 left-0 z-10 invisible m-2 text-gray-800 bg-opacity-50 rounded-md dark:text-white"
      >
        <span class="relative z-0 inline-flex rounded-full shadow">
          <button
            type="button"
            class="relative visible inline-flex items-center px-3 py-1.5 rounded-l-full border border-gray-300 border-opacity-25 bg-opacity-75 dark:bg-opacity-50 text-sm font-medium focus:z-10 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500 active:ring-0"
            :class="{
              'bg-indigo-800 text-gray-50': expenseStore.$state.map.ui.isMarker,
              'text-gray-800 bg-white dark:text-white dark:bg-gray-800':
                !expenseStore.$state.map.ui.isMarker,
            }"
            @click="toggle('marker')"
          >
            <span class="sm:block hidden">Marker(s)</span>
            <svg
              class="fill-current h-4 sm:hidden block"
              xmlns="http://www.w3.org/2000/svg"
              xml:space="preserve"
              viewBox="0 0 490 490"
            >
              <ellipse cx="141.728" cy="381.365" rx="72.943" ry="14.805" />
              <path
                d="M39.521 173.428c0 54.551 80.57 164.053 89.775 176.309l12.51 16.822 12.589-16.822c5.178-6.998 33.343-45.272 56.752-87.025l197.416 200.574 21.824-21.48-154.965-157.442L490 65.904l-21.839-21.45-214.216 218.091-27.96-28.407c10.633-22.471 18.108-44.139 18.108-60.709 0-65.445-40.128-107.74-102.286-107.74-24.857 0-46.108 6.861-62.761 19.163L21.824 26.714 0 48.187l57.915 58.841c-11.807 17.587-18.394 40.076-18.394 66.4zm173.958 0c0 24.291-28.95 80.992-71.688 141.501-36.616-51.62-71.657-114.225-71.657-141.501 0-48.294 26.793-77.127 71.672-77.127 44.88 0 71.673 28.833 71.673 77.127z"
              />
              <ellipse cx="141.728" cy="174.149" rx="33.125" ry="33.724" />
            </svg>
          </button>
          <button
            type="button"
            class="-ml-px relative visible inline-flex items-center px-3 py-1.5 border border-gray-300 border-opacity-25 bg-opacity-75 dark:bg-opacity-50 text-sm font-medium focus:z-10 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500 active:ring-0"
            :class="{
              'bg-indigo-800 text-gray-50':
                expenseStore.$state.map.ui.isCluster,
              'text-gray-800 bg-white dark:text-white dark:bg-gray-800':
                !expenseStore.$state.map.ui.isCluster,
            }"
            @click="toggle('cluster')"
          >
            <span class="sm:block hidden">Cluster(s)</span>
            <svg
              class="h-4 fill-current sm:hidden block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path
                d="M16 7a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1Zm-5 27a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1ZM7 11a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1Zm14 23a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1Zm4-15a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1ZM4 21a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1Zm24 4a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1Zm-12 5a6 6 0 1 1 6-6 6.0069 6.0069 0 0 1-6 6Zm0-10a4 4 0 1 0 4 4 4.0045 4.0045 0 0 0-4-4Z"
              />
              <path fill="none" d="M0 0h32v32H0z" />
            </svg>
          </button>
          <button
            type="button"
            class="-ml-px relative visible inline-flex items-center px-3 py-1.5 rounded-r-full border border-gray-300 border-opacity-25 bg-opacity-75 dark:bg-opacity-50 text-sm font-medium focus:z-10 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500 active:ring-0"
            :class="{
              'bg-indigo-800 text-gray-50 ':
                expenseStore.$state.map.ui.isHeatmap,
              'text-gray-800 bg-white dark:text-white dark:bg-gray-800':
                !expenseStore.$state.map.ui.isHeatmap,
            }"
            @click="toggle('heatmap')"
          >
            <span class="sm:block hidden">Heatmap</span>
            <svg
              class="h-4 fill-current sm:hidden block"
              xmlns="http://www.w3.org/2000/svg"
              xml:space="preserve"
              viewBox="0 0 32 32"
            >
              <path
                d="M18 31.36c-1.301 0-2.36-1.059-2.36-2.36s1.059-2.36 2.36-2.36c1.302 0 2.36 1.059 2.36 2.36s-1.058 2.36-2.36 2.36zm0-4c-.904 0-1.64.735-1.64 1.64s.736 1.64 1.64 1.64 1.64-.735 1.64-1.64-.736-1.64-1.64-1.64zm-11 4c-2.956 0-5.36-2.405-5.36-5.36 0-1.006.287-1.977.833-2.835C1.385 22.748.64 21.7.64 20.5c0-1.577 1.283-2.86 2.86-2.86s2.86 1.283 2.86 2.86c0 .061-.002.121-.007.183 3.246-.417 6.007 2.148 6.007 5.317 0 2.955-2.404 5.36-5.36 5.36zm-3.5-13c-1.18 0-2.14.96-2.14 2.14 0 1.035.742 1.919 1.764 2.102.124.022.228.107.272.226.045.117.026.25-.051.35-.644.829-.985 1.805-.985 2.822 0 2.559 2.082 4.64 4.64 4.64s4.64-2.081 4.64-4.64S9.559 21.36 7 21.36c-.326 0-.656.038-1.01.118-.123.027-.251-.011-.338-.102-.087-.09-.121-.22-.089-.341.052-.201.077-.371.077-.535 0-1.18-.96-2.14-2.14-2.14zm24.5 10c-1.853 0-3.36-1.508-3.36-3.36s1.508-3.36 3.36-3.36 3.36 1.508 3.36 3.36-1.507 3.36-3.36 3.36zm0-6c-1.456 0-2.64 1.184-2.64 2.64s1.184 2.64 2.64 2.64 2.64-1.184 2.64-2.64-1.184-2.64-2.64-2.64zm-11 1c-1.853 0-3.36-1.508-3.36-3.36 0-2.071 1.926-3.74 4.017-3.289.144-1.166 1.14-2.071 2.343-2.071 1.302 0 2.36 1.059 2.36 2.36 0 1.203-.906 2.199-2.071 2.343.047.221.071.44.071.657 0 1.853-1.507 3.36-3.36 3.36zm0-6c-1.456 0-2.64 1.184-2.64 2.64s1.185 2.64 2.64 2.64c1.456 0 2.64-1.184 2.64-2.64 0-.289-.056-.591-.167-.896-.043-.115-.022-.245.053-.343s.199-.146.318-.139l.156.018c.904 0 1.64-.735 1.64-1.64s-.735-1.64-1.64-1.64-1.64.736-1.64 1.64c0 .004.017.148.018.152.013.124-.039.245-.137.321-.098.078-.227.097-.345.056-.312-.114-.606-.169-.896-.169zm11 0c-.75 0-1.36-.61-1.36-1.36s.61-1.36 1.36-1.36 1.36.61 1.36 1.36-.61 1.36-1.36 1.36zm0-2c-.353 0-.64.287-.64.64s.287.64.64.64.64-.287.64-.64-.287-.64-.64-.64zm-23 0c-1.301 0-2.36-1.059-2.36-2.36S3.699 10.64 5 10.64 7.36 11.699 7.36 13 6.301 15.36 5 15.36zm0-4c-.904 0-1.64.736-1.64 1.64s.736 1.64 1.64 1.64 1.64-.736 1.64-1.64-.736-1.64-1.64-1.64zm7.5 2c-1.577 0-2.86-1.283-2.86-2.86 0-1.385.969-2.531 2.281-2.796-.187-.551-.281-1.122-.281-1.704 0-2.956 2.404-5.36 5.36-5.36 2.955 0 5.36 2.404 5.36 5.36s-2.405 5.36-5.36 5.36c-.581 0-1.152-.095-1.705-.282-.264 1.313-1.41 2.282-2.795 2.282zm4.5-12c-2.559 0-4.64 2.082-4.64 4.64 0 .641.133 1.267.396 1.862.048.109.039.236-.025.337-.064.102-.174.165-.294.168-1.165.034-2.077.971-2.077 2.133 0 1.18.96 2.14 2.14 2.14 1.161 0 2.098-.912 2.132-2.077.003-.12.066-.229.167-.293s.229-.074.337-.025c.598.262 1.225.396 1.864.396 2.559 0 4.64-2.082 4.64-4.64S19.559 1.36 17 1.36zm10 9c-1.302 0-2.36-1.059-2.36-2.36S25.698 5.64 27 5.64 29.36 6.699 29.36 8s-1.058 2.36-2.36 2.36zm0-4c-.904 0-1.64.736-1.64 1.64s.736 1.64 1.64 1.64 1.64-.736 1.64-1.64-.736-1.64-1.64-1.64zm-25 3C1.25 9.36.64 8.75.64 8S1.25 6.64 2 6.64 3.36 7.25 3.36 8 2.75 9.36 2 9.36zm0-2c-.353 0-.64.287-.64.64 0 .353.287.64.64.64s.64-.287.64-.64-.287-.64-.64-.64zm5-1C5.699 6.36 4.64 5.301 4.64 4S5.699 1.64 7 1.64 9.36 2.699 9.36 4 8.301 6.36 7 6.36zm0-4c-.904 0-1.64.736-1.64 1.64S6.096 5.64 7 5.64 8.64 4.904 8.64 4 7.904 2.36 7 2.36zm23 2c-.75 0-1.36-.61-1.36-1.36s.61-1.36 1.36-1.36 1.36.61 1.36 1.36-.61 1.36-1.36 1.36zm0-2c-.353 0-.64.287-.64.64s.287.64.64.64.64-.287.64-.64-.287-.64-.64-.64z"
              />
              <path fill="none" d="M0 0h32v32H0z" />
            </svg>
          </button>
        </span>
      </div>
      <template v-if="mapStore.loaded">
        <v-marker
          :options="expenseStore.$state.map.marker.options"
          :popup-options="expenseStore.$state.map.marker.popup.options"
          v-model:coordinates="expenseStore.$state.map.marker.coordinates"
        >
          <template #markers="{ setRef }">
            <svg
              :ref="(el) => setRef(el)"
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
          </template>
          <div class="expense-popup-card">
            <div
              class="flex flex-col items-start justify-center text-white border border-gray-300 dark:border-gray-700 rounded-md shadow-lg bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800"
            >
              <div
                class="flex items-center justify-between w-full px-4 py-2 border-b border-gray-300 dark:border-gray-600 dark:text-gray-50 text-gray-800"
              >
                <div class="capitalize">
                  {{ expenseStore.$state.form.type }}
                </div>
                <button
                  type="button"
                  class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-1 focus:ring-offset-1"
                  :class="{
                    'bg-green-600 focus:ring-green-500':
                      expenseStore.$state.form.type === 'credit',
                    'bg-red-600 focus:ring-red-500':
                      expenseStore.$state.form.type === 'debit',
                  }"
                  aria-pressed="false"
                  @click="
                    expenseStore.$state.form.type === 'credit'
                      ? (expenseStore.$state.form.type = 'debit')
                      : (expenseStore.$state.form.type = 'credit')
                  "
                >
                  <span class="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    :class="{
                      'translate-x-5':
                        expenseStore.$state.form.type === 'debit',
                      'translate-x-0':
                        expenseStore.$state.form.type === 'credit',
                    }"
                    class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow pointer-events-none ring-0"
                  />
                </button>
              </div>
              <form class="grid p-4 space-y-2" @submit.prevent="add">
                <div class="rounded-md shadow-sm">
                  <label
                    for="expense"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Amount
                  </label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
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
                      v-model.number="expenseStore.$state.form.amount"
                      type="text"
                      name="expense"
                      required="true"
                      class="block w-full pl-10 rounded-md sm:text-sm border-gray-300 outline-none dark:border-gray-400 dark:bg-gray-600 dark:text-gray-50 text-gray-900 bg-white"
                      :class="{
                        'focus:ring-green-500 focus:border-green-500':
                          expenseStore.$state.form.type === 'credit',
                        'focus:ring-red-500 focus:border-red-500':
                          expenseStore.$state.form.type === 'debit',
                      }"
                      :placeholder="
                        expenseStore.$state.form.type === 'credit'
                          ? 'eg. 100'
                          : 'eg. 96'
                      "
                    />
                  </div>
                </div>
                <div class="rounded-md shadow-sm">
                  <label
                    for="description"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    v-model="expenseStore.$state.form.description"
                    name="description"
                    rows="2"
                    class="block w-full mt-1 rounded-md outline-none border-gray-300 dark:border-gray-400 dark:bg-gray-600 dark:text-gray-50 text-gray-900 bg-white py-2 px-3 sm:text-sm"
                    :class="{
                      'focus:ring-green-500 focus:border-green-500':
                        expenseStore.$state.form.type === 'credit',
                      'focus:ring-red-500 focus:border-red-500':
                        expenseStore.$state.form.type === 'debit',
                    }"
                    :placeholder="
                      expenseStore.$state.form.type === 'credit'
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
                        expenseStore.$state.form.type === 'debit',
                      'bg-green-600 hover:bg-green-700 focus:ring-green-500':
                        expenseStore.$state.form.type === 'credit',
                    }"
                    class="inline-flex items-center justify-center w-full px-4 py-1 text-sm font-medium text-white transition-colors duration-200 ease-in-out border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </v-marker>
        <!-- Marker with previously added data -->
        <template
          v-if="
            expenseStore.$state.geojson !== null &&
            expenseStore.$state.geojson.features.length > 0
          "
        >
          <expense-marker
            v-if="expenseStore.isMarker"
            :data="expenseStore.$state.geojson"
            :visibility="expenseStore.isMarker"
            v-model:popup-options="expenseStore.$state.popup.options"
            v-model:popup-visibility="expenseStore.$state.popup.shown"
          />
          <expense-cluster
            v-if="expenseStore.isCluster"
            :data="expenseStore.$state.geojson"
            :visibility="expenseStore.isCluster"
          />
          <expense-heatmap
            v-if="expenseStore.isHeatmap"
            :data="expenseStore.$state.geojson"
            :visibility="expenseStore.isHeatmap"
          />
        </template>
      </template>
    </common-map>
  </div>
</template>

<script lang="ts">
  import type { MapMouseEvent } from 'maplibre-gl';
  import type { ExpenseFeature, MyDB } from '~/@types/expense';
  import type { IDBPDatabase } from 'idb';
  import { computed, defineComponent, onMounted } from 'vue';
  import CommonMap from '~/components/map/CommonMap.vue';
  import { VMarker } from '~/lib/v-mapbox';
  import Cluster from '~/components/map/layers/Cluster.vue';
  import Heatmap from '~/components/map/layers/Heatmap.vue';
  import Marker from '~/components/map/layers/Marker.vue';
  import { useMap } from '~/composables/useMap';
  import { useExpense } from '~/composables/useExpense';
  import { useIdb } from '~/composables/useIdb';
  import { v4 as uuid } from 'uuid';

  export default defineComponent({
    name: 'Dashboard',
    components: {
      CommonMap,
      VMarker,
      ExpenseMarker: Marker,
      ExpenseCluster: Cluster,
      ExpenseHeatmap: Heatmap,
    },
    setup() {
      let db: IDBPDatabase<MyDB>;
      const mapStore = useMap();
      const expenseStore = useExpense();

      const isDark = useDark();
      const runtimeConfig = useRuntimeConfig();

      const getMarkerColor = computed(() => {
        return [isDark.value ? 'text-indigo-600' : 'text-indigo-500'];
      });

      onMounted(async () => {
        db = await useIdb();
        const expenses = await db.getAll('expenses');
        if (expenses.length > 0) {
          expenseStore.$patch((state) => {
            state.geojson = expenses[0];
          });
        }
        // Popuplate Basemaps
        mapStore.$patch((state) => {
          state.utils.basemaps.data.basemaps.push(
            {
              type: 'Dark Std (AWS)',
              enabled: false,
              image: 'dark',
              source: 'aws',
              style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-standard-dark/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
            },
            {
              type: 'Light Std (AWS)',
              enabled: false,
              image: 'streets',
              source: 'aws',
              style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-standard-light/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
            },
            {
              type: 'Dark Viz (AWS)',
              enabled: false,
              image: 'dark',
              source: 'aws',
              style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-visualization-dark/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
            },
            {
              type: 'Light Viz (AWS)',
              enabled: false,
              image: 'streets',
              source: 'aws',
              style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-visualization-light/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
            },
          );
        });
      });

      const onMapClicked = (e: MapMouseEvent): void => {
        expenseStore.$patch((state) => {
          state.map.marker.coordinates = [e.lngLat.lng, e.lngLat.lat];
        });
      };

      const toggle = (type: 'cluster' | 'heatmap' | 'marker') => {
        switch (type.toLowerCase()) {
          case 'marker':
            expenseStore.$patch((state) => {
              state.map.ui.isMarker = true;
              state.map.ui.isCluster = false;
              state.map.ui.isHeatmap = false;
            });
            break;
          case 'cluster':
            expenseStore.$patch((state) => {
              state.map.ui.isMarker = false;
              state.map.ui.isCluster = true;
              state.map.ui.isHeatmap = false;
            });
            break;
          case 'heatmap':
            expenseStore.$patch((state) => {
              state.map.ui.isMarker = false;
              state.map.ui.isCluster = false;
              state.map.ui.isHeatmap = true;
            });
            break;
          default:
            expenseStore.$patch((state) => {
              state.map.ui.isMarker = true;
              state.map.ui.isCluster = false;
              state.map.ui.isHeatmap = false;
            });
            break;
        }
      };

      const add = async (): Promise<void> => {
        // Build a Feature of Type Point
        const feature: ExpenseFeature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: expenseStore.$state.map.marker.coordinates,
          },
          properties: {
            expense: expenseStore.$state.form,
            date: Date.now(),
          },
        };
        if (expenseStore.$state.geojson.features.length > 0) {
          expenseStore.$patch((state) => {
            state.geojson.features.push(feature);
          });
        } else {
          expenseStore.$patch((state) => {
            state.geojson = {
              id: uuid().split('-').join(''),
              type: 'FeatureCollection',
              features: [feature],
            };
          });
        }
        await db.put(
          'expenses',
          JSON.parse(JSON.stringify(expenseStore.$state.geojson)),
        );
        expenseStore.$patch((state) => {
          state.form = {
            amount: undefined,
            description: '',
            type: 'debit',
          };
        });
      };

      return {
        mapStore,
        expenseStore,
        // computed:
        getMarkerColor,
        // methods:
        onMapClicked,
        toggle,
        add,
      };
    },
  });
</script>

<style lang="scss">
  .expense-popup-card .maplibregl-popup-tip,
  .mapboxgl-popup-tip {
    display: none;
  }

  .expense-popup-card .mapboxgl-popup-content,
  .maplibregl-popup-content {
    @apply bg-opacity-75;
    @apply p-0;
    @apply bg-gray-800;
    background: transparent !important;
  }
</style>
