import type { Map } from 'maplibre-gl';
import type { InjectionKey, Ref } from 'vue';

const MapKey: InjectionKey<Ref<Map>> = Symbol('Map');
const MapLoadedKey: InjectionKey<Ref<boolean>> = Symbol('MapLoaded');
const MapStylesLoadedKey: InjectionKey<Ref<boolean>> = Symbol('MapStyleLoaded');
const MapTilesLoadedKey: InjectionKey<Ref<boolean>> = Symbol('MapTilesLoaded');

export { MapKey, MapLoadedKey, MapStylesLoadedKey, MapTilesLoadedKey };
