<template>
  <div class="marker">
    <slot />
    <slot v-if="marker" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Map, MarkerOptions, Marker } from 'mapbox-gl';
  import { useGlobalState } from '../store';
  export default defineComponent({
    name: 'VMarker',
    props: {
      options: {
        type: Object,
        default: () => ({} as MarkerOptions),
      },
    },
    setup(props) {
      const state = useGlobalState();
      let map: Map = state.value.map;
      const marker = new Marker(props.options);
      if (map) {
        marker.setLngLat(props.options.lngLat);
        marker.addTo(map);
      }
      return {
        state,
      };
    },
  });
</script>
