<template>
  <section v-if="data.features.length">
    <v-layer-mapbox-geojson
      :source="cluster.source"
      :source-id="'expenses-cluster-source-0'"
      v-model:layer="cluster.circleLayer"
      :layer-id="cluster.circleLayer.id"
    />
    <v-layer-mapbox-geojson
      :source="cluster.source"
      :source-id="'expenses-cluster-source-1'"
      v-model:layer="cluster.countLayer"
      :layer-id="cluster.countLayer.id"
    />
  </section>
</template>

<script lang="ts">
  import type {
    GeoJSONSourceSpecification,
    CircleLayerSpecification,
    SymbolLayerSpecification,
  } from 'maplibre-gl';
  import type { PropType } from 'vue';
  import type { ExpenseFeatureCollection } from '~/@types/expense';
  import { VLayerMapboxGeojson } from '~/lib/v-mapbox';

  export default defineComponent({
    name: 'ExpenseCluster',
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
      const cluster = ref({
        // source: {
        //   type: 'geojson',
        //   data: props.data,
        //   cluster: true,
        //   clusterMaxZoom: 20,
        //   clusterRadius: 40,
        // } as GeoJSONSourceSpecification,
        source: computed(() => {
          return {
            type: 'geojson',
            data: props.data,
            cluster: true,
            clusterMaxZoom: 20,
            clusterRadius: 40,
          } as GeoJSONSourceSpecification;
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
                4,
                '#f22001',
                8,
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
          } as CircleLayerSpecification;
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
          } as SymbolLayerSpecification;
        }),
      });

      return {
        cluster,
      };
    },
  });
</script>
