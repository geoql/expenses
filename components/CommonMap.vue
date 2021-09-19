<template>
  <client-only>
    <mgl-map
      container="map"
      :mapbox-gl="state.mapboxgl"
      :access-token="state.mapOptions.accessToken"
      :map-style.sync="state.mapOptions.style"
      :center="state.mapOptions.center"
      :zoom="state.mapOptions.zoom"
      :max-zoom="state.mapOptions.maxZoom"
      :cross-source-collisions="false"
      :fail-if-major-performance-caveat="false"
      :preserve-drawing-buffer="true"
      :hash="false"
      :min-pitch="0"
      :max-pitch="60"
      @load="mapLoaded"
      @moveend="mapMoved"
      @click="mapClicked"
    >
      <div v-if="loaded && styleChanged">
        <slot />
        <mgl-scale-control position="bottom-left" />
        <div
          class="
            absolute
            top-0
            right-0
            invisible
            p-2
            m-2
            text-gray-800
            bg-opacity-50
            rounded-md
            dark:text-white
          "
        >
          <!-- Basemaps -->
          <div
            v-tooltip.left="{
              content: 'Click here to update basemap',
              offset: 4,
              boundariesElement: 'viewport',
            }"
            class="
              relative
              visible
              w-10
              h-10
              text-sm text-gray-600
              bg-gray-200
              border border-gray-100
              rounded-md
              hover:bg-gray-300
              dark:bg-gray-800
              dark:border-gray-700
              dark:text-white
              dark:hover:bg-gray-800
            "
            title="Basemaps"
            :class="{
              'bg-gray-300 dark:bg-gray-800': state.utils.basemaps.shown,
            }"
          >
            <div class="p-2 cursor-pointer" @click="toggleTool('basemaps')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17.784 19.117"
                class="w-5 h-5"
              >
                <path
                  d="M9.534 16.496a1.067 1.067 0 01-1.306 0l-6.527-5.07a1.055 1.055 0 00-1.295 1.666l7.175 5.583a2.135 2.135 0 002.611 0l7.175-5.583a1.058 1.058 0 000-1.666l-.011-.011a1.052 1.052 0 00-1.295 0l-6.527 5.081zm.669-3.206l7.175-5.583a1.069 1.069 0 000-1.677L10.203.447a2.135 2.135 0 00-2.611 0L.416 6.04a1.069 1.069 0 000 1.677L7.591 13.3a2.12 2.12 0 002.611-.011z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-class="transform scale-95 translate-x-4 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in translate-x-4"
              leave-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="state.utils.basemaps.shown"
                class="
                  absolute
                  top-0
                  right-0
                  w-64
                  mr-12
                  origin-right
                  bg-gray-300
                  rounded-md
                  shadow-lg
                  dark:bg-gray-700
                  ring-1 ring-white ring-opacity-5
                "
              >
                <basemaps
                  :data="state.utils.basemaps.data"
                  @update-map-style="updateBasemap"
                  @close="state.utils.basemaps.shown = false"
                />
              </div>
            </transition>
          </div>
        </div>
        <!-- Zoom in, Zoom out, Bearing & Locate Me -->
        <div
          class="
            absolute
            bottom-6
            right-0
            invisible
            p-2
            m-2
            text-gray-800
            bg-opacity-50
            rounded-md
            dark:text-white
          "
        >
          <div class="relative flex flex-col space-y-2">
            <!-- Zoom in & out -->
            <div
              class="
                flex flex-col
                items-center
                justify-center
                visible
                w-10
                h-20
              "
              title="Zoom In/Out"
            >
              <!-- Zoom In -->
              <div
                v-tooltip.left="{
                  content: 'Click here to Zoom in',
                  offset: 4,
                  boundariesElement: 'viewport',
                }"
                class="
                  w-10
                  h-10
                  p-2
                  text-sm text-gray-600
                  bg-gray-200
                  border border-b-0 border-gray-100
                  rounded-md rounded-b-none
                  cursor-pointer
                  hover:bg-gray-300
                  dark:bg-gray-800
                  dark:border-gray-700
                  dark:text-white
                  dark:hover:bg-gray-800
                "
                title="Zoom In"
                @click="mapZoomIn"
              >
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <!-- Zoom Out -->
              <div
                v-tooltip.left="{
                  content: 'Click here to Zoom out',
                  offset: 4,
                  boundariesElement: 'viewport',
                }"
                class="
                  w-10
                  h-10
                  p-2
                  text-sm text-gray-600
                  bg-gray-200
                  border border-t-0 border-gray-100
                  rounded-md rounded-t-none
                  cursor-pointer
                  hover:bg-gray-300
                  dark:bg-gray-800
                  dark:border-gray-700
                  dark:text-white
                  dark:hover:bg-gray-800
                "
                title="Zoom Out"
                @click="mapZoomOut"
              >
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
                    d="M20 12H4"
                  />
                </svg>
              </div>
            </div>
            <!-- Bearing -->
            <div
              v-tooltip.left="{
                content: 'Click here to reset pitch / bearing',
                offset: 4,
                boundariesElement: 'viewport',
              }"
              class="
                relative
                visible
                w-10
                h-10
                text-sm text-gray-600
                bg-gray-200
                border border-gray-100
                rounded-md
                hover:bg-gray-300
                dark:bg-gray-800
                dark:border-gray-700
                dark:text-white
                dark:hover:bg-gray-800
              "
              title="Locate Me"
              :class="{
                'bg-gray-300 dark:bg-gray-800': state.utils.compass.shown,
              }"
            >
              <div class="p-2 cursor-pointer" @click="toggleTool('compass')">
                <svg
                  class="
                    w-5
                    h-5
                    transition-all
                    duration-100
                    ease-linear
                    transform
                    fill-current
                  "
                  :style="{
                    transform:
                      'rotate(' + state.utils.compass.data.bearing + 'deg)',
                  }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <defs />
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"
                  />
                </svg>
              </div>
            </div>
            <!-- Locate -->
            <div
              v-tooltip.left="{
                content: 'Click here to get your location',
                offset: 4,
                boundariesElement: 'viewport',
              }"
              class="
                relative
                visible
                w-10
                h-10
                text-sm text-gray-600
                bg-gray-200
                border border-gray-100
                rounded-md
                hover:bg-gray-300
                dark:bg-gray-800
                dark:border-gray-700
                dark:text-white
                dark:hover:bg-gray-800
              "
              title="Locate Me"
            >
              <div class="p-2 cursor-pointer" @click="toggleTool('locate')">
                <svg
                  class="w-5 h-5 fill-current stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 469.333 469.333"
                >
                  <defs />
                  <path
                    d="M234.667 149.333c-47.147 0-85.333 38.187-85.333 85.333S187.52 320 234.667 320 320 281.813 320 234.667s-38.187-85.334-85.333-85.334zm190.72 64C415.573 124.373 344.96 53.76 256 43.947V0h-42.667v43.947C124.373 53.76 53.76 124.373 43.947 213.333H0V256h43.947c9.813 88.96 80.427 159.573 169.387 169.387v43.947H256v-43.947C344.96 415.573 415.573 344.96 425.387 256h43.947v-42.667h-43.947zM234.667 384c-82.453 0-149.333-66.88-149.333-149.333s66.88-149.333 149.333-149.333S384 152.213 384 234.667 317.12 384 234.667 384z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mgl-map>
  </client-only>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    readonly,
    ref,
    useContext,
  } from '@nuxtjs/composition-api';
  import { MglMap, MglScaleControl } from 'v-mapbox';
  import mapboxgl from 'mapbox-gl';
  import type { PropType, SetupContext } from '@nuxtjs/composition-api';
  import type { EventData, Map } from 'mapbox-gl';
  import type { Basemaps } from '~/@types/map';

  export default defineComponent({
    components: {
      MglMap,
      MglScaleControl,
      Basemaps: () =>
        import(
          /* webpackChunkName: "BasemapsComponent" */ '@/components/_partials/Basemaps.vue'
        ),
    },
    props: {
      center: {
        type: Array as PropType<number[]>,
        required: true,
        default: () => [73.8567, 18.5204],
      },
      loaded: {
        type: Boolean as PropType<boolean>,
        required: true,
        default: false,
      },
      styleChanged: {
        type: Boolean as PropType<boolean>,
        required: true,
        default: false,
      },
    },
    setup(props, { emit }: SetupContext) {
      const { $config } = useContext();
      const state = reactive({
        mapOptions: {
          accessToken: $config.mapToken,
          style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
          center: ref(props.center),
          zoom: 11,
          maxZoom: 22,
        },
        mapboxgl,
        utils: {
          basemaps: {
            shown: false as boolean,
            data: {
              title: 'Basemaps',
              basemaps: [
                {
                  type: 'Streets',
                  enabled: false,
                  image: 'streets',
                  style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
                },
                {
                  type: 'Satellite',
                  enabled: false,
                  image: 'satellite',
                  style:
                    'mapbox://styles/mapbox/satellite-streets-v11?optimize=true',
                },
                {
                  type: 'Dark',
                  enabled: true,
                  image: 'dark',
                  style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
                },
              ],
            } as Basemaps,
          },
          compass: {
            shown: false as boolean,
            data: {
              bearing: 0,
            },
          },
        },
      });
      let map = readonly({} as mapboxgl.Map);

      /**
       * This function syncs the loaded & style-changed
       * variables in parent components
       *
       * @param {Record<string, Map>} e - Payload when map is loaded
       * @param {Map} e.map - Mapbox GL Map object
       * @returns {void}
       */
      function mapLoaded(e: { map: Map }): void {
        map = e.map;
        emit('update:loaded', true);
        emit('update:style-changed', true);
        /**
         * This is required because we want
         * to persist the layers on the map
         * even after the basemap is changed
         */
        map.on('style.load', () => {
          const waiting = () => {
            if (!map.isStyleLoaded()) {
              emit('update:style-changed', false);
              setTimeout(waiting, 200);
            } else {
              emit('update:style-changed', true);
            }
          };
          waiting();
        });
        /**
         * Watch the pitchend event
         * This is required to rotate svg
         *
         * @returns {void}
         */
        map.on('pitchend', () => {
          state.utils.compass.data.bearing = parseInt(
            map.getBearing().toFixed(),
            10,
          );
        });
      }
      /**
       * This function emits a click event to the
       * parent component
       *
       * @param {Record<string,EventData>} e - Event data
       * @param {EventData} e.mapboxEvent - Mapbox Event
       * @returns {void}
       */
      function mapClicked(e: { mapboxEvent: EventData }): void {
        emit('click', e.mapboxEvent);
      }

      /**
       * When the map is moved
       *
       * @param {Record<string, Map>} e - Payload when map is loaded
       * @param {Map} e.map - Mapbox GL Map object
       * @returns {void}
       */
      function mapMoved(e: { map: Map }): void {
        const coords = e.map.getCenter();
        emit('update:center', [coords.lng, coords.lat]);
      }
      /**
       * Updates the current map style
       *
       * @param {string} e - String of the new style
       * @returns {void} - Returns void
       */
      function updateBasemap(e: string): void {
        state.utils.basemaps.data.basemaps.forEach((basemap) => {
          if (basemap.style === e) {
            basemap.enabled = true;
          } else {
            basemap.enabled = false;
          }
        });
        map.setStyle(e);
      }
      /**
       * Zooms the map in by currentZoom + 1
       *
       * @returns {void}
       */
      function mapZoomIn(): void {
        if (map !== null) {
          const currentZoom = map.getZoom();
          map.zoomTo(currentZoom + 1);
        }
      }
      /**
       * Zooms the map out by currentZoom - 1
       *
       * @returns {void}
       */
      function mapZoomOut(): void {
        if (map !== null) {
          const currentZoom = map.getZoom();
          map.zoomTo(currentZoom - 1);
        }
      }
      /**
       * Eases the map to given pitch
       * and bearing
       *
       * @param {Record<string,number>} root0 - Pitch & Bearing
       * @param {number} root0.pitch - Pitch
       * @param {number} root0.bearing - Bearing
       * @returns {void}
       */
      function mapEaseTo({
        pitch,
        bearing,
      }: {
        pitch: number;
        bearing: number;
      }): void {
        map.easeTo({
          pitch,
          bearing,
        });
      }
      /**
       * Fly the map to the specific location
       *
       * @param {Record<string, number>} root0 - Lat, Lng & zoom of the location
       * @param {number} root0.lng – Lat
       * @param {number} root0.lat - Lng
       * @param {number} root0.zoom - Zoom
       * @returns {void}
       */
      function mapFlyTo({
        lng,
        lat,
        zoom,
      }: {
        lng: number;
        lat: number;
        zoom: number;
      }): void {
        map.flyTo({
          center: [lng, lat],
          zoom,
          speed: 3,
          curve: 1,
        });
      }
      /**
       * Toggles the tool enabled on the map
       *
       * @param {string} type - Toggle the tool type
       * @returns {void} void
       */
      function toggleTool(type: string): void {
        switch (type) {
          case 'basemaps':
            state.utils.basemaps.shown = !state.utils.basemaps.shown;
            break;
          case 'compass':
            state.utils.compass.shown = !state.utils.compass.shown;
            state.utils.compass.data.bearing = 0;
            mapEaseTo({ pitch: 0, bearing: 0 });
            state.utils.compass.shown = false;
            break;
          case 'locate':
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                mapFlyTo({
                  lng: pos.coords.longitude,
                  lat: pos.coords.latitude,
                  zoom: 15,
                });
              });
            }
            break;
          default:
            break;
        }
      }

      return {
        state,
        mapLoaded,
        mapClicked,
        mapMoved,
        mapZoomIn,
        mapZoomOut,
        toggleTool,
        updateBasemap,
      };
    },
  });
</script>
