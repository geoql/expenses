import {
  MglGeojsonLayer,
  MglMap,
  MglMarker,
  MglPopup,
  MglScaleControl,
} from 'v-mapbox';
import Vue from 'vue';

Vue.component('MglMap', MglMap);
Vue.component('MglGeojsonLayer', MglGeojsonLayer);
Vue.component('MglScaleControl', MglScaleControl);
Vue.component('MglMarker', MglMarker);
Vue.component('MglPopup', MglPopup);
