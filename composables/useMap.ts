import { MapOptions } from 'maplibre-gl';
import { defineStore } from 'pinia';

/**
 * Map Store
 */
export const useMap = defineStore({
  id: 'map',
  state: () => ({
    ui: {
      loaded: false as boolean,
      styleChanged: false as boolean,
      tilesLoaded: false as boolean,
      errors: {
        shown: false as boolean,
        data: [] as string[],
      },
    },
    map: {
      state: {
        latitude: 0 as number,
        longitude: 0 as number,
        bbox: [] as number[][],
        center: [] as number[],
        zoom: 0 as number,
      },
      options: {
        // style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        container: 'map',
        style:
          'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: [73.8567, 18.5204] as number[],
        zoom: 11,
        maxZoom: 22,
        hash: false,
        crossSourceCollisions: false,
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: true,
        attributionControl: false,
        trackResize: true,
        minPitch: 0,
        maxPitch: 60,
      } as MapOptions,
      controls: {
        attribution: {
          shown: true as boolean,
        },
        geolocate: {
          shown: true as boolean,
          options: {
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          },
        },
        fullscreen: {
          shown: true as boolean,
        },
        navigation: {
          shown: true as boolean,
        },
        scale: {
          shown: true as boolean,
        },
      },
    },
    utils: {
      basemaps: {
        shown: false as boolean,
        data: {
          title: 'Basemaps',
          basemaps: [
            {
              type: 'Dark (Carto)',
              enabled: true,
              image: 'dark',
              source: 'carto',
              style:
                'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
            },
            {
              type: 'Light (Carto)',
              enabled: false,
              image: 'streets',
              source: 'carto',
              style:
                'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            },
          ],
        },
      },
      upload: {
        shown: false as boolean,
      },
      compass: {
        shown: false as boolean,
        data: {
          bearing: 0,
        },
      },
    },
  }),
  getters: {
    loaded: (state): boolean => {
      return state.ui.loaded || state.ui.styleChanged || state.ui.tilesLoaded;
    },
  },
  actions: {
    setLoaded(loaded: boolean) {
      this.ui.loaded = loaded;
    },
    setStyleChanged(styleChanged: boolean): void {
      this.ui.styleChanged = styleChanged;
    },
    setTilesLoaded(loaded: boolean): void {
      this.ui.tilesLoaded = loaded;
    },
    setCoordinates(coords: { lng: number; lat: number }): void {
      this.map.state.longitude = coords.lng;
      this.map.state.latitude = coords.lat;
    },
    setZoom(zoom: number): void {
      this.map.state.zoom = zoom;
    },
    setCenter(center: number[]): void {
      this.map.state.center = center;
    },
    setBounds(bounds: number[][]): void {
      this.map.state.bbox = bounds;
    },
    setBearing(bearing: number): void {
      this.utils.compass.data.bearing = bearing;
    },
    toggleBasemapsWidget(): void {
      this.utils.basemaps.shown = !this.utils.basemaps.shown;
    },
    toggleCompassWidget(): void {
      this.utils.compass.shown = !this.utils.compass.shown;
      this.utils.compass.data.bearing = 0;
      this.utils.compass.shown = false;
    },
  },
});
