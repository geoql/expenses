<template>
  <main class="w-full h-full select-none">
    <v-map
      :options="store.$state.map.options"
      @loaded="onMapLoaded"
      @click="onMapClicked"
      @pitchend="onMapPitchEnd"
      @mousemove="onMapMouseMove"
      @zoomend="onMapZoomEnd"
    >
      <template v-if="store.loaded">
        <!-- Controls -->
        <!-- <v-control-attribution
          v-if="store.$state.map.controls.attribution.shown"
        >
          <span>Map Designed By © CARTO | © OpenStreetMap contributors</span>
        </v-control-attribution>
        <v-control-geolocate
          v-if="store.$state.map.controls.geolocate.shown"
          :options="store.$state.map.controls.geolocate.options"
        />
        <v-control-fullscreen
          v-if="store.$state.map.controls.fullscreen.shown"
        />
        <v-control-navigation
          v-if="store.$state.map.controls.navigation.shown"
        /> -->
        <v-control-scale v-if="store.$state.map.controls.scale.shown" />
        <!-- Mapbox Layers -->
        <template v-if="store.loaded">
          <v-marker
            v-for="(marker, index) in mapbox.markers.data"
            :key="index"
            :options="marker.options"
            :popup-options="marker.popup.options"
            v-model:coordinates="marker.coordinates"
          >
            <template>
              <div class="p-2 text-black">
                Popup Content: {{ marker.popup.content }}
                <img
                  class="rounded shadow-sm"
                  src="https://picsum.photos/200"
                />
              </div>
            </template>
          </v-marker>
        </template>
        <v-layer-mapbox-geojson
          :source-id="'geojson-source'"
          :source="mapbox.geojson.source"
          :layer-id="'geojson-layer'"
          :layer="mapbox.geojson.layer"
        />
        <v-layer-mapbox-vector
          :source-id="'vector-source'"
          :source="mapbox.vector.source"
          :layer-id="'vector-layer'"
          :layer="mapbox.vector.layer"
        />
        <v-layer-mapbox-image
          :source-id="'image-source'"
          :source="mapbox.image.source"
          :layer-id="'image-layer'"
          :layer="mapbox.image.layer"
        />
      </template>
      <!-- Basemaps -->
      <div
        class="absolute top-0 right-0 z-10 invisible m-2 text-gray-800 bg-opacity-50 rounded-md dark:text-white"
      >
        <div class="relative flex flex-col space-y-2">
          <div
            class="relative visible w-10 h-10 text-sm text-gray-600 bg-gray-200 border border-gray-100 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            title="Basemaps"
            :class="{
              'bg-gray-300 dark:bg-gray-800': store.$state.utils.basemaps.shown,
            }"
          >
            <div class="p-2 cursor-pointer" @click="toggleTool('basemaps')">
              <svg
                class="w-5 h-5 stroke-current fill-none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
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
                v-if="store.$state.utils.basemaps.shown"
                class="absolute top-0 right-0 w-48 mr-12 origin-right bg-gray-300 rounded-md shadow-lg sm:w-64 dark:bg-gray-700 ring-1 ring-white ring-opacity-5"
              >
                <basemaps
                  :data="store.$state.utils.basemaps.data"
                  @update-map-style="updateBasemap"
                  @close="store.$state.utils.basemaps.shown = false"
                />
              </div>
            </transition>
          </div>
        </div>
      </div>
      <!-- Zoom in, Zoom out, Bearing & Locate Me -->
      <div
        class="absolute right-0 z-10 invisible m-2 text-gray-800 bg-opacity-50 rounded-md bottom-12 sm:bottom-7 dark:text-white"
      >
        <div class="relative flex flex-col space-y-2">
          <!-- Zoom in & out -->
          <div
            class="flex flex-col items-center justify-center visible w-10 h-20"
            title="Zoom In/Out"
          >
            <!-- Zoom In -->
            <div
              class="w-10 h-10 p-2 text-sm text-gray-600 bg-gray-200 border border-b-0 border-gray-100 rounded-md rounded-b-none cursor-pointer hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
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
              class="w-10 h-10 p-2 text-sm text-gray-600 bg-gray-200 border border-t-0 border-gray-100 rounded-md rounded-t-none cursor-pointer hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
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
            class="relative visible w-10 h-10 text-sm text-gray-600 bg-gray-200 border border-gray-100 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            title="Locate Me"
            :class="{
              'bg-gray-300 dark:bg-gray-800': store.$state.utils.compass.shown,
            }"
          >
            <div class="p-2 cursor-pointer" @click="toggleTool('compass')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transition-all duration-100 ease-linear transform fill-current"
                viewBox="0 0 18 18"
                :style="{
                  transform:
                    'rotate(' +
                    store.$state.utils.compass.data.bearing +
                    'deg)',
                }"
              >
                <path
                  d="M5.5 14.2c-.9.8-1.9 0-1.5-1l4-9c.2-.4.6-.8 1-.8s.8.4 1 .8l4 9c.4 1-.6 1.8-1.5 1l-3.5-3-3.5 3z"
                />
              </svg>
            </div>
          </div>
          <!-- Locate -->
          <div
            class="relative visible w-10 h-10 text-sm text-gray-600 bg-gray-200 border border-gray-100 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
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
    </v-map>
  </main>
</template>

<script lang="ts">
  import type { FeatureCollection } from 'geojson';
  import type {
    FillLayerSpecification as FillLayer,
    ImageSourceSpecification as ImageSourceRaw,
    LineLayerSpecification as LineLayer,
    LngLatLike,
    Map,
    MapMouseEvent,
    RasterLayerSpecification as RasterLayer,
    VectorSourceSpecification as VectorSource,
  } from 'maplibre-gl';
  import { VMarker } from 'v-mapbox';
  // import { VMarker } from 'v-mapbox';
  import { useMap } from '~/composables/useMap';
  import Basemaps from './_partials/Basemaps.vue';

  export default defineComponent({
    name: 'CommonMap',
    components: {
      Basemaps,
      VMarker,
    },
    setup(_, { emit }) {
      const store = useMap();
      let map = toRaw({} as Map);
      const mapbox = ref({
        markers: {
          data: [
            {
              options: { color: 'red', draggable: true },
              coordinates: [73.8567, 18.5204] as LngLatLike,
              popup: {
                options: {
                  closeButton: false,
                  closeOnClick: true,
                  closeOnMove: true,
                },
                content: 'ABC',
              },
            },
            {
              options: { color: 'indigo', draggable: true },
              coordinates: [73.8567, 18.5514] as LngLatLike,
              popup: {
                options: {
                  closeButton: true,
                  closeOnClick: false,
                  closeOnMove: false,
                },
                content: 'XYZ',
              },
            },
          ],
        },
        geojson: {
          source: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [68.5546875, 17.644022027872726],
                      [70.6640625, 9.795677582829743],
                      [81.9140625, 5.61598581915534],
                      [83.3203125, 20.632784250388028],
                      [68.5546875, 17.644022027872726],
                    ],
                  ],
                },
              },
            ],
          } as FeatureCollection,
          layer: {
            type: 'fill',
            layout: {
              visibility: 'visible',
            },
            paint: {
              'fill-color': '#0080ff', // blue color fill
              'fill-opacity': 0.25,
            },
          } as FillLayer,
        },
        vector: {
          source: {
            type: 'vector',
            tiles: [
              'https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=MLY|4142433049200173|72206abe5035850d6743b23a49c41333',
            ],
            minzoom: 6,
            maxzoom: 14,
          } as VectorSource,
          layer: {
            type: 'line',
            // Source has several layers. We visualize the one with name 'sequence'.
            'source-layer': 'sequence',
            layout: {
              'line-cap': 'round',
              'line-join': 'round',
            },
            paint: {
              'line-opacity': 0.6,
              'line-color': 'rgb(53, 175, 109)',
              'line-width': 2,
            },
          } as LineLayer,
        },
        image: {
          source: {
            type: 'image',
            url: 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
            coordinates: [
              [-80.425, 46.437],
              [-71.516, 46.437],
              [-71.516, 37.936],
              [-80.425, 37.936],
            ],
          } as ImageSourceRaw,
          layer: {
            type: 'raster',
            paint: {
              'raster-fade-duration': 0,
            },
          } as RasterLayer,
        },
      });

      /**
       * This function syncs the loaded & style-changed
       * variables in parent components
       *
       * @param {Map} e - Mapbox GL Map object
       * @returns {void}
       */
      function onMapLoaded(e: Map): void {
        map = e;
        const events: string[] = [
          'idle',
          'moveend',
          'touchend',
          'style.load',
          'sourcedata',
          'sourcedataloading',
        ];
        events.forEach((event) => {
          map.on(event, () => {
            if (event === 'sourcedata' || event === 'sourcedataloading') {
              const waiting = () => {
                if (!map.areTilesLoaded()) {
                  store.setTilesLoaded(false);
                  setTimeout(waiting, 200);
                } else {
                  store.setTilesLoaded(true);
                }
              };
              waiting();
            }
            if (event === 'style.load') {
              const waiting = () => {
                if (!map.isStyleLoaded()) {
                  store.setStyleChanged(false);
                  setTimeout(waiting, 200);
                } else {
                  store.setStyleChanged(true);
                }
              };
              waiting();
            }
            if (['moveend', 'touchend', 'idle'].includes(event)) {
              setMapState();
            }
          });
        });
        store.setStyleChanged(true);
        store.setTilesLoaded(true);
        store.setLoaded(true);
        setMapState();
      }
      /**
       * When user is entered the map
       * canvas
       *
       * @param {MapMouseEvent | MouseEvent } e - Mapbox Event data
       * @returns {void} void
       */
      function onMapMouseMove(e: MapMouseEvent | MouseEvent): void {
        if (e instanceof MouseEvent) {
          return;
        } else {
          const { lat, lng } = e.lngLat;
          store.setCoordinates({ lat, lng });
        }
      }
      /**
       * This function emits a click event to the
       * parent component
       *
       * @param {MapMouseEvent} e - Mapbox Event
       * @returns {void}
       */
      function onMapClicked(e: MapMouseEvent | PointerEvent): void {
        if (e instanceof PointerEvent) {
          return;
        } else {
          emit('on-clicked', e);
        }
      }
      /**
       * When user changes the North direction
       * or changes the pitch
       *
       * @returns {void} void
       */
      function onMapPitchEnd(): void {
        const bearing = parseInt(map.getBearing().toFixed(), 10);
        store.setBearing(bearing);
      }
      /**
       * When the map completes zoom
       * end event
       *
       * @returns {void} void
       */
      function onMapZoomEnd(): void {
        store.setZoom(map.getZoom());
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
          setMapState();
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
          setMapState();
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
        zoom = 15,
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
       * Updates the current map style
       *
       * @param {string} e - String of the new style
       * @returns {void} - Returns void
       */
      function updateBasemap(e: string): void {
        store.$patch((state) => {
          state.utils.basemaps.data.basemaps.forEach((basemap) => {
            if (basemap.style === e) {
              basemap.enabled = true;
            } else {
              basemap.enabled = false;
            }
          });
        });
        map.setStyle(e);
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
            store.toggleBasemapsWidget();
            break;
          case 'compass':
            store.toggleCompassWidget();
            mapEaseTo({ pitch: 0, bearing: 0 });
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
      /**
       * Save the current map state
       * in the store
       *
       * @returns {void} void
       */
      function setMapState(): void {
        const { lng, lat } = map.getCenter();
        store.setCenter([lng, lat]);
        store.setZoom(map.getZoom());
        store.setBounds(map.getBounds().toArray());
        store.setCoordinates({ lat, lng });
      }

      return {
        store,
        map,
        mapbox,
        onMapLoaded,
        onMapMouseMove,
        onMapClicked,
        onMapPitchEnd,
        onMapZoomEnd,
        mapZoomIn,
        mapZoomOut,
        toggleTool,
        updateBasemap,
      };
    },
  });
</script>
