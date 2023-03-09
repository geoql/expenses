// Controls
import { VControlAttribution } from 'v-mapbox';
import { VControlFullscreen } from 'v-mapbox';
import { VControlGeolocate } from 'v-mapbox';
import { VControlNavigation } from 'v-mapbox';
import { VControlScale } from 'v-mapbox';
// Layers – Deck.gl
import VLayerDeckArc from 'v-mapbox';
import VLayerDeckGeojson from 'v-mapbox';
// Layers – Mapbox
import { VLayerMapboxCanvas } from 'v-mapbox';
import { VLayerMapboxGeojson } from 'v-mapbox';
import { VLayerMapboxImage } from 'v-mapbox';
import { VLayerMapboxRaster } from 'v-mapbox';
import { VLayerMapboxVector } from 'v-mapbox';
import { VLayerMapboxVideo } from 'v-mapbox';
// Map
import VMap from 'v-mapbox';
// Marker
import VMarker from 'v-mapbox';
// Popup
import VPopup from 'v-mapbox';

export default defineNuxtPlugin((nuxtApp) => {
  // Map
  nuxtApp.vueApp.component('VMap', VMap);
  // Marker
  nuxtApp.vueApp.component('VMarker', VMarker);
  // Popup
  nuxtApp.vueApp.component('VPopup', VPopup);
  // Layers
  nuxtApp.vueApp.component('VLayerMapboxCanvas', VLayerMapboxCanvas);
  nuxtApp.vueApp.component('VLayerMapboxGeojson', VLayerMapboxGeojson);
  nuxtApp.vueApp.component('VLayerMapboxImage', VLayerMapboxImage);
  nuxtApp.vueApp.component('VLayerMapboxRaster', VLayerMapboxRaster);
  nuxtApp.vueApp.component('VLayerMapboxVector', VLayerMapboxVector);
  nuxtApp.vueApp.component('VLayerMapboxVideo', VLayerMapboxVideo);
  nuxtApp.vueApp.component('VLayerDeckArc', VLayerDeckArc);
  nuxtApp.vueApp.component('VLayerDeckGeojson', VLayerDeckGeojson);
  // Controls
  nuxtApp.vueApp.component('VControlAttribution', VControlAttribution);
  nuxtApp.vueApp.component('VControlFullscreen', VControlFullscreen);
  nuxtApp.vueApp.component('VControlGeolocate', VControlGeolocate);
  nuxtApp.vueApp.component('VControlNavigation', VControlNavigation);
  nuxtApp.vueApp.component('VControlScale', VControlScale);
});
