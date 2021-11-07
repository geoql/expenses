<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import type { FeatureCollection, Point } from 'geojson';
  import { GeoJsonLayer } from '@deck.gl/layers';
  import { MapboxLayer } from '@deck.gl/mapbox';

  export default defineComponent({
    props: {
      geojson: {
        type: Object as PropType<FeatureCollection<Point>>,
        required: true,
      },
      layerProps: {
        type: Object,
        required: false,
      },
    },
    setup(props, { emit }) {
      const layer = new MapboxLayer({
        id: `deck-geojson-layer-${Date.now()}`,
        type: GeoJsonLayer,
        data: props.geojson,
        ...props.layerProps,
      });
      emit('layer:add', layer);
    },
  });
</script>
