// Controls
import {
  VControlAttribution,
  VControlFullscreen,
  VControlGeolocate,
  VControlNavigation,
  VControlScale,
} from '~/lib/v-mapbox';
// Layers – Mapbox
import {
  VLayerMaplibreCanvas,
  VLayerMaplibreGeojson,
  VLayerMaplibreImage,
  VLayerMaplibreRaster,
  VLayerMaplibreVector,
  VLayerMaplibreVideo,
} from '~/lib/v-mapbox';
// Map
import VMap from '~/lib/v-mapbox';
// Marker
import VMarker from '~/lib/v-mapbox';
// Popup
import VPopup from '~/lib/v-mapbox';

export default defineNuxtPlugin((nuxtApp) => {
  // Map
  nuxtApp.vueApp.component('VMap', VMap);
  // Marker
  nuxtApp.vueApp.component('VMarker', VMarker);
  // Popup
  nuxtApp.vueApp.component('VPopup', VPopup);
  // Layers
  nuxtApp.vueApp.component('VLayerMapboxCanvas', VLayerMaplibreCanvas);
  nuxtApp.vueApp.component('VLayerMapboxGeojson', VLayerMaplibreGeojson);
  nuxtApp.vueApp.component('VLayerMapboxImage', VLayerMaplibreImage);
  nuxtApp.vueApp.component('VLayerMapboxRaster', VLayerMaplibreRaster);
  nuxtApp.vueApp.component('VLayerMapboxVector', VLayerMaplibreVector);
  nuxtApp.vueApp.component('VLayerMapboxVideo', VLayerMaplibreVideo);
  // Controls
  nuxtApp.vueApp.component('VControlAttribution', VControlAttribution);
  nuxtApp.vueApp.component('VControlFullscreen', VControlFullscreen);
  nuxtApp.vueApp.component('VControlGeolocate', VControlGeolocate);
  nuxtApp.vueApp.component('VControlNavigation', VControlNavigation);
  nuxtApp.vueApp.component('VControlScale', VControlScale);
});
