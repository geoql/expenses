declare module 'v-mapbox' {
  import Vue from 'vue';
  class MglMap extends Vue {}
  class MglMarker extends Vue {}
  class MglPopup extends Vue {}
  class MglScaleControl extends Vue {}
  export { MglMap, MglMarker, MglPopup, MglScaleControl };
}
