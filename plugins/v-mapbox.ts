// Controls
import { VControlAttribution } from '~/lib/v-mapbox';
import { VControlFullscreen } from '~/lib/v-mapbox';
import { VControlGeolocate } from '~/lib/v-mapbox';
import { VControlNavigation } from '~/lib/v-mapbox';
import { VControlScale } from '~/lib/v-mapbox';
// Layers – Deck.gl
import VLayerDeckArc from '~/lib/v-mapbox';
import VLayerDeckGeojson from '~/lib/v-mapbox';
// Layers – Mapbox
import { VLayerMapboxCanvas } from '~/lib/v-mapbox';
import { VLayerMapboxGeojson } from '~/lib/v-mapbox';
import { VLayerMapboxImage } from '~/lib/v-mapbox';
import { VLayerMapboxRaster } from '~/lib/v-mapbox';
import { VLayerMapboxVector } from '~/lib/v-mapbox';
import { VLayerMapboxVideo } from '~/lib/v-mapbox';
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
