<template>
  <div class="h-full w-full flex select-none items-center justify-center">
    <!-- Loading indicator -->
    <div
      v-if="!mapStore.loaded"
      class="fixed z-10 h-full w-full flex items-center justify-center opacity-75"
    >
      <svg
        class="h-6 w-6 animate-spin text-gray-900 dark:text-white"
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
      v-if="mapStore.utils.basemaps.data.basemaps.length > 0"
      :class="{ 'opacity-50': !mapStore.loaded }"
      @on-loaded="onMapLoaded"
      @on-clicked="onMapClicked"
    >
      <template #tools-tl>
        <span class="relative z-0 inline-flex rounded-full shadow">
          <button
            type="button"
            aria-label="Toggle Marker(s)"
            class="visible relative inline-flex items-center border border-gray-300 border-opacity-25 rounded-l-full bg-opacity-75 px-3 py-1.5 text-sm font-medium focus:z-10 focus:border-indigo-500 dark:bg-opacity-50 focus:outline-none active:ring-0 focus:ring-0 focus:ring-indigo-500"
            :class="{
              'bg-indigo-800 text-gray-50': expenseStore.$state.map.ui.isMarker,
              'text-gray-800 bg-white dark:text-white dark:bg-gray-800':
                !expenseStore.$state.map.ui.isMarker,
            }"
            @click="toggle('marker')"
          >
            <span class="hidden sm:block">Marker(s)</span>
            <svg
              class="block h-4 fill-current sm:hidden"
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
            aria-label="Toggle Cluster(s)"
            class="visible relative inline-flex items-center border border-gray-300 border-opacity-25 bg-opacity-75 px-3 py-1.5 text-sm font-medium focus:z-10 -ml-px focus:border-indigo-500 dark:bg-opacity-50 focus:outline-none active:ring-0 focus:ring-0 focus:ring-indigo-500"
            :class="{
              'bg-indigo-800 text-gray-50':
                expenseStore.$state.map.ui.isCluster,
              'text-gray-800 bg-white dark:text-white dark:bg-gray-800':
                !expenseStore.$state.map.ui.isCluster,
            }"
            @click="toggle('cluster')"
          >
            <span class="hidden sm:block">Cluster(s)</span>
            <svg
              class="block h-4 fill-current sm:hidden"
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
            aria-label="Toggle Heatmap"
            class="visible relative inline-flex items-center border border-gray-300 border-opacity-25 rounded-r-full bg-opacity-75 px-3 py-1.5 text-sm font-medium focus:z-10 -ml-px focus:border-indigo-500 dark:bg-opacity-50 focus:outline-none active:ring-0 focus:ring-0 focus:ring-indigo-500"
            :class="{
              'bg-indigo-800 text-gray-50 ':
                expenseStore.$state.map.ui.isHeatmap,
              'text-gray-800 bg-white dark:text-white dark:bg-gray-800':
                !expenseStore.$state.map.ui.isHeatmap,
            }"
            @click="toggle('heatmap')"
          >
            <span class="hidden sm:block">Heatmap</span>
            <svg
              class="block h-4 fill-current sm:hidden"
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
      </template>
      <template #tools-tr>
        <div
          class="visible relative z-10 h-10 w-10 border border-gray-100 rounded-md bg-gray-200 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-800"
          title="Upload CSV"
          :class="{
            'dark:bg-gray-800 bg-gray-200': mapStore.$state.utils.upload.shown,
            'hover:dark:bg-gray-800 hover:bg-gray-200':
              !mapStore.$state.utils.upload.shown,
          }"
        >
          <div
            class="cursor-pointer p-2"
            @click="mapStore.toggleUploadsWidget()"
          >
            <svg
              class="h-5 w-5 stroke-current"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 translate-x-4 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in translate-x-4"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="mapStore.$state.utils.upload.shown"
              class="absolute right-0 top-0 mr-12 w-64 origin-right rounded-md bg-gray-300 shadow-lg ring-1 ring-white ring-opacity-5 dark:bg-gray-700"
            >
              <expense-upload
                @data="onWorkerData"
                @close="mapStore.$state.utils.upload.shown = false"
              />
            </div>
          </transition>
        </div>
      </template>
      <template #layers>
        <!-- Expense Layer(s) -->
        <template>
          <!-- Marker(s) -->
          <v-marker
            :options="expenseStore.$state.map.marker.options"
            :popup-options="expenseStore.$state.map.marker.popup.options"
            :coordinates="expenseStore.$state.map.marker.coordinates"
          >
            <template #markers="{ setRef }">
              <svg
                :ref="(el) => setRef(el)"
                class="h-8 w-8 cursor-pointer"
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
                class="flex flex-col items-start justify-center border border-gray-300 rounded-md from-gray-200 to-gray-100 bg-gradient-to-tr text-white shadow-lg dark:border-gray-700 dark:from-gray-700 dark:to-gray-800"
              >
                <div
                  class="w-full flex items-center justify-between border-b border-gray-300 px-4 py-2 text-gray-800 dark:border-gray-600 dark:text-gray-50"
                >
                  <div class="capitalize">
                    {{ expenseStore.$state.form.type }}
                  </div>
                  <button
                    type="button"
                    class="relative h-6 w-11 inline-flex flex-shrink-0 cursor-pointer border-2 border-transparent rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-1"
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
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
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
                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
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
                        class="block w-full border-gray-300 rounded-md bg-white pl-10 text-gray-900 outline-none dark:border-gray-400 dark:bg-gray-600 sm:text-sm dark:text-gray-50"
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
                      class="mt-1 block w-full border-gray-300 rounded-md bg-white px-3 py-2 text-gray-900 outline-none dark:border-gray-400 dark:bg-gray-600 sm:text-sm dark:text-gray-50"
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
                      class="w-full inline-flex items-center justify-center border border-transparent rounded-md px-4 py-1 text-sm font-medium text-white shadow-sm transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </v-marker>
          <!-- Marker / Cluster / Heatmap w/ previously added data -->
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
      </template>
    </common-map>
  </div>
</template>

<script lang="ts">
  import type { Map, MapMouseEvent } from 'maplibre-gl';
  import type { IDBPDatabase } from 'idb';
  import type {
    ExpenseFeature,
    ExpenseFeatureCollection,
  } from '~/@types/expense';
  import type { MyDB } from '~/@types/db';
  import { computed, defineComponent, onMounted } from 'vue';
  import center from '@turf/center';
  import CommonMap from '~/components/map/CommonMap.vue';
  import { VMarker } from '~/lib/v-mapbox';
  import Cluster from '~/components/map/layers/Cluster.vue';
  import Heatmap from '~/components/map/layers/Heatmap.vue';
  import Marker from '~/components/map/layers/Marker.vue';
  import Upload from '~/components/map/_partials/Upload.vue';

  export default defineComponent({
    name: 'Dashboard',
    components: {
      CommonMap,
      VMarker,
      ExpenseUpload: Upload,
      ExpenseMarker: Marker,
      ExpenseCluster: Cluster,
      ExpenseHeatmap: Heatmap,
    },
    setup() {
      let db: IDBPDatabase<MyDB>;
      let map = markRaw({} as Map);
      const mapStore = useMap();
      const expenseStore = useExpense();

      const { $worker } = useNuxtApp();

      const isDark = useDark();
      const getMarkerColor = computed(() => {
        return [isDark.value ? 'text-indigo-600' : 'text-indigo-500'];
      });

      onMounted(async () => {
        await mapStore.getBasemaps();
        db = await useIdb();
        const expenses = await db.getAll('expenses');
        if (expenses.length > 0) {
          expenseStore.$patch((state) => {
            state.geojson = expenses[0];
          });
        }
      });

      const onWorkerData = async ({
        data,
      }: {
        data: ExpenseFeatureCollection;
      }) => {
        if (expenseStore.$state.geojson.features.length > 0) {
          expenseStore.$patch((state) => {
            state.geojson.features.concat(data.features);
          });
        } else {
          expenseStore.$patch((state) => {
            state.geojson = data;
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
        const layerCenter = center(data);
        map.flyTo({
          center: [
            layerCenter.geometry.coordinates[0],
            layerCenter.geometry.coordinates[1],
          ],
          zoom: 8,
          speed: 3,
          curve: 1,
        });
      };

      const onMapLoaded = (m: Map): void => {
        map = m;
      };
      const onMapClicked = (e: MapMouseEvent): void => {
        console.log('on map clicked: ', e.lngLat.lng, e.lngLat.lat);
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
        console.log('feature: ', feature);
        if (expenseStore.$state.geojson.features.length > 0) {
          expenseStore.$patch((state) => {
            state.geojson.features.push(feature);
          });
        } else {
          expenseStore.$patch((state) => {
            state.geojson = {
              id: useUuid(),
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
        onWorkerData,
        onMapLoaded,
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
