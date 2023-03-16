<template>
  <section v-if="data.features.length">
    <v-layer-mapbox-geojson
      :source-id="'expenses-heatmap-source-0'"
      v-model:source="heatmap.source"
      v-model:layer-id="heatmap.circleLayer.id"
      v-model:layer="heatmap.circleLayer"
    />
    <v-layer-mapbox-geojson
      :source-id="'expenses-heatmap-source-1'"
      v-model:source="heatmap.source"
      v-model:layer-id="heatmap.pointLayer.id"
      v-model:layer="heatmap.pointLayer"
    />
  </section>
</template>

<script lang="ts">
  import type {
    GeoJSONSourceSpecification,
    HeatmapLayerSpecification,
    CircleLayerSpecification,
  } from 'maplibre-gl';
  import type { PropType } from 'vue';
  import type { ExpenseFeatureCollection } from '~/@types/expense';
  import { VLayerMapboxGeojson } from '~/lib/v-mapbox';

  export default defineComponent({
    name: 'ExpenseHeatmap',
    components: {
      VLayerMapboxGeojson,
    },
    props: {
      data: {
        type: Object as PropType<ExpenseFeatureCollection>,
        required: true,
      },
      visibility: {
        type: Boolean as PropType<boolean>,
        required: true,
        default: false,
      },
    },
    setup(props) {
      const heatmap = reactive({
        source: {
          type: 'geojson',
          data: props.data,
        } as GeoJSONSourceSpecification,
        circleLayer: {
          id: 'expenses-heatmap-circle-layer',
          type: 'heatmap',
          source: 'expenses-heatmap-source',
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              0,
              0,
              3,
              1,
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              9,
              3,
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)',
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              2,
              9,
              20,
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              1,
              9,
              0,
            ],
          },
          layout: {
            visibility: props.visibility ? 'visible' : 'none',
          },
        } as HeatmapLayerSpecification,
        pointLayer: {
          id: 'expenses-heatmap-point-layer',
          type: 'circle',
          source: 'expenses-heatmap-source',
          minzoom: 7,
          paint: {
            // Size circle radius by earthquake magnitude and zoom level
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              ['interpolate', ['linear'], ['get', 'point_count'], 1, 1, 6, 4],
              16,
              ['interpolate', ['linear'], ['get', 'point_count'], 1, 5, 6, 50],
            ],
            // Color circle by earthquake magnitude
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'point_count'],
              1,
              'rgba(33,102,172,0)',
              2,
              'rgb(103,169,207)',
              3,
              'rgb(209,229,240)',
              4,
              'rgb(253,219,199)',
              5,
              'rgb(239,138,98)',
              6,
              'rgb(178,24,43)',
            ],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            // Transition from heatmap to circle layer by zoom level
            'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1],
          },
          layout: {
            visibility: props.visibility ? 'visible' : 'none',
          },
        } as CircleLayerSpecification,
      });

      return {
        heatmap,
      };
    },
  });
</script>
