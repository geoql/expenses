<template>
  <section v-if="data.features.length">
    <mgl-geojson-layer
      :source-id="heatmap.sourceId"
      :source="heatmap.source"
      :layer-id="heatmap.circleLayer.id"
      :layer="heatmap.circleLayer"
    />
    <mgl-geojson-layer
      :source-id="heatmap.sourceId"
      :source="heatmap.source"
      :layer-id="heatmap.pointLayer.id"
      :layer="heatmap.pointLayer"
    />
  </section>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from '@nuxtjs/composition-api';
  import { MglGeojsonLayer } from 'v-mapbox';
  import type { PropType } from '@nuxtjs/composition-api';
  import type { FeatureCollection, Point } from 'geojson';

  export default defineComponent({
    name: 'Heatmap',
    components: {
      MglGeojsonLayer,
    },
    props: {
      data: {
        type: Object as PropType<FeatureCollection<Point>>,
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
        sourceId: 'expenses-heatmap-source',
        source: computed(() => {
          return {
            type: 'geojson',
            data: props.data,
          };
        }),
        circleLayer: computed(() => {
          return {
            id: 'expenses-heatmap-circle-layer',
            type: 'heatmap',
            source: 'expenses-heatmap-source',
            maxzoom: 9,
            paint: {
              // increase weight as diameter breast height increases
              'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'point_count'],
                0,
                0,
                6,
                1,
              ],
              // increase intensity as zoom level increases
              'heatmap-intensity': {
                stops: [
                  [11, 1],
                  [15, 3],
                ],
              },
              // assign color values be applied to points depending on their density
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(236,222,239,0)',
                0.2,
                'rgb(208,209,230)',
                0.4,
                'rgb(166,189,219)',
                0.6,
                'rgb(103,169,207)',
                0.8,
                'rgb(28,144,153)',
              ],
              // increase radius as zoom increases
              'heatmap-radius': {
                stops: [
                  [11, 15],
                  [15, 20],
                ],
              },
              // decrease opacity to transition into the circle layer
              'heatmap-opacity': {
                default: 1,
                stops: [
                  [14, 1],
                  [15, 0],
                ],
              },
            },
            layout: {
              visibility: props.visibility ? 'visible' : 'none',
            },
          };
        }),
        pointLayer: computed(() => {
          return {
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
                [
                  'interpolate',
                  ['linear'],
                  ['get', 'point_count'],
                  1,
                  5,
                  6,
                  50,
                ],
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
              'circle-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7,
                0,
                8,
                1,
              ],
            },
            layout: {
              visibility: props.visibility ? 'visible' : 'none',
            },
          };
        }),
      });

      return {
        heatmap,
      };
    },
  });
</script>
