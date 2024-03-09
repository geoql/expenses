// Controls
import {
  VControlAttribution,
  VControlFullscreen,
  VControlGeolocate,
  VControlNavigation,
  VControlScale,
} from './controls';
// Layers – Mapbox
import {
  VLayerMaplibreCanvas,
  VLayerMaplibreGeojson,
  VLayerMaplibreImage,
  VLayerMaplibreRaster,
  VLayerMaplibreVector,
  VLayerMaplibreVideo,
} from './layers';

// Map
import VMap from './map/VMap.vue';
// Marker
import VMarker from './markers/VMarker.vue';
// Popup
import VPopup from './popups/VPopup.vue';

export {
  VMap,
  // Marker
  VMarker,
  // Popup
  VPopup,
  // Layers
  VLayerMaplibreCanvas,
  VLayerMaplibreGeojson,
  VLayerMaplibreImage,
  VLayerMaplibreRaster,
  VLayerMaplibreVector,
  VLayerMaplibreVideo,
  // Controls
  VControlAttribution,
  VControlFullscreen,
  VControlGeolocate,
  VControlNavigation,
  VControlScale,
};

export default VMap;
