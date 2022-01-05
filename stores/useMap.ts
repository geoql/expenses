import { MapboxOptions } from 'maplibre-gl';
import { defineStore } from 'pinia';

/**
 * Map Store
 */
export const useMap = defineStore({
  id: 'map',
  state: () => {
    return {
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
          style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
          center: [73.8567, 18.5204] as number[],
          zoom: 11,
          maxZoom: 22,
          crossSourceCollisions: false,
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: true,
          hash: false,
          minPitch: 0,
          maxPitch: 60,
        } as MapboxOptions,
      },
      utils: {
        basemaps: {
          shown: false as boolean,
          data: {
            title: 'Basemaps',
            basemaps: [
              {
                type: 'Dark',
                enabled: true,
                image: 'dark',
                source: 'mapbox',
                style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
              },
              {
                type: 'Satellite',
                enabled: false,
                image: 'satellite',
                source: 'mapbox',
                style:
                  'mapbox://styles/mapbox/satellite-streets-v11?optimize=true',
              },
              {
                type: 'Streets',
                enabled: false,
                image: 'streets',
                source: 'mapbox',
                style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
              },
              {
                type: 'Light',
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
    };
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
