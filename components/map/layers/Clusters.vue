<template>
  <section v-if="data.features.length">
    <!-- Cluster Circle Layer -->
    <mgl-geojson-layer
      :source-id="clusters.sourceId"
      :source="clusters.source"
      :layer-id="clusters.circleLayer.id"
      :layer="clusters.circleLayer"
    />
    <!-- Cluster Count Layer -->
    <mgl-geojson-layer
      :source-id="clusters.sourceId"
      :source="clusters.source"
      :layer-id="clusters.countLayer.id"
      :layer="clusters.countLayer"
    />
  </section>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from '@nuxtjs/composition-api';
  import type { PropType } from '@nuxtjs/composition-api';
  import type { FeatureCollection, Point } from 'geojson';

  export default defineComponent({
    name: 'Clusters',
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
      const clusters = reactive({
        sourceId: 'expenses-cluster-source',
        source: computed(() => {
          return {
            type: 'geojson',
            data: props.data,
            cluster: true,
            clusterMaxZoom: 20,
            clusterRadius: 40,
          };
        }),
        circleLayer: computed(() => {
          return {
            id: 'expenses-cluster-circle-layer',
            type: 'circle',
            source: 'expenses-cluster-source',
            filter: ['==', ['get', 'cluster'], true],
            paint: {
              'circle-color': [
                'step',
                ['get', 'point_count'],
                '#4000ff',
                5,
                '#f22001',
                15,
                '#00f2cc',
              ],
              'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                5,
                30,
                15,
                40,
              ],
            },
            layout: {
              visibility: props.visibility ? 'visible' : 'none',
            },
            minzoom: 5,
            maxzoom: 22,
          };
        }),
        countLayer: computed(() => {
          return {
            id: 'expenses-cluster-count-layer',
            type: 'symbol',
            source: 'expenses-cluster-source',
            filter: ['==', ['get', 'cluster'], true],
            layout: {
              'text-field': '{point_count}',
              'text-size': 12,
              visibility: props.visibility ? 'visible' : 'none',
            },
            paint: {
              'text-color': '#FFFFFF',
            },
            minzoom: 5,
            maxzoom: 22,
          };
        }),
        markers: computed(() => {
          return {
            id: 'alpr-reads-cluster-marker-layer',
            type: 'symbol',
            source: 'alpr-reads-cluster-source',
            filter: ['!has', 'point_count'],
            layout: {
              'icon-image': 'current-icon',
              'icon-size': 0.27,
              'icon-allow-overlap': true,
              visibility: props.visibility ? 'visible' : 'none',
            },
            maxzoom: 22,
          };
        }),
      });

      return {
        clusters,
      };
    },
  });
</script>
