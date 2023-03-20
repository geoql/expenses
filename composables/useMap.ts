import { MapOptions } from 'maplibre-gl';
import { defineStore } from 'pinia';
import { Basemaps } from '~/@types/map';

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
        container: 'map',
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
          id: useUuid(),
          title: 'Basemaps',
          basemaps: [],
        } as Basemaps,
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
    style: (state) => {
      const basemap = state.utils.basemaps.data.basemaps.find(
        (basemap) => basemap.enabled,
      );
      return basemap?.style;
    },
    loaded: (state): boolean => {
      return (
        state.utils.basemaps.data.basemaps.length > 0 &&
        (state.ui.loaded || state.ui.styleChanged || state.ui.tilesLoaded)
      );
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
    async getBasemaps(): Promise<void> {
      const db = await useIdb();
      const basemaps = await db.getAll('basemaps');
      const runtimeConfig = useRuntimeConfig();
      if (basemaps.length) {
        // @ts-ignore
        this.utils.basemaps.data = basemaps[0];
      } else {
        this.utils.basemaps.data.basemaps.push(
          {
            id: useUuid(),
            type: 'Dark (Carto)',
            enabled: true,
            image: 'dark',
            source: 'carto',
            style:
              'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
          },
          {
            id: useUuid(),
            type: 'Light (Carto)',
            enabled: false,
            image: 'streets',
            source: 'carto',
            style:
              'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
          },
          {
            id: useUuid(),
            type: 'Dark Std (AWS)',
            enabled: false,
            image: 'dark',
            source: 'aws',
            style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-standard-dark/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
          },
          {
            id: useUuid(),
            type: 'Light Std (AWS)',
            enabled: false,
            image: 'streets',
            source: 'aws',
            style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-standard-light/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
          },
          {
            id: useUuid(),
            type: 'Dark Viz (AWS)',
            enabled: false,
            image: 'dark',
            source: 'aws',
            style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-visualization-dark/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
          },
          {
            id: useUuid(),
            type: 'Light Viz (AWS)',
            enabled: false,
            image: 'streets',
            source: 'aws',
            style: `https://maps.geo.${runtimeConfig.public.map.aws.region}.amazonaws.com/maps/v0/maps/open-data-visualization-light/style-descriptor?key=${runtimeConfig.public.map.aws.key}`,
          },
        );
        await this.setBasemaps();
      }
    },
    async setBasemaps(): Promise<void> {
      const db = await useIdb();
      db.put('basemaps', JSON.parse(JSON.stringify(this.utils.basemaps.data)));
    },
  },
});
