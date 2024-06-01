<script setup lang="ts">
  import type { Ref } from 'vue';
  import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
  import type { GeoJSONSource, LayerSpecification } from 'maplibre-gl';
  import { injectStrict, MapKey } from '../../../utils';
  import type { Props } from './types';

  const props = withDefaults(defineProps<Props>(), {
    sourceId: 'maplibre.gl-geojson-source',
    layerId: 'maplibre.gl-geojson-layer',
    before: '',
  });

  const map = injectStrict(MapKey);
  const loaded: Ref<boolean> = ref(false);

  const addLayer = (): void => {
    if (!map.value.getSource(props.sourceId)) {
      map.value.addSource(props.sourceId, props.source);
    }
    if (!map.value.getLayer(props.layerId)) {
      const layerSpec = {
        ...props.layer,
        id: props.layerId,
        source: props.sourceId,
      } as LayerSpecification;
      map.value.addLayer(layerSpec, props.before);
    }
  };

  const updateSource = (): void => {
    const source = map.value.getSource(props.sourceId) as
      | GeoJSONSource
      | undefined;
    if (source && 'setData' in source) {
      source.setData(props.source.data);
    }
  };

  const updateLayer = (): void => {
    if (map.value.getLayer(props.layerId)) {
      Object.entries(props.layer.paint || {}).forEach(([key, value]) => {
        map.value.setPaintProperty(props.layerId, key, value);
      });
      Object.entries(props.layer.layout || {}).forEach(([key, value]) => {
        map.value.setLayoutProperty(props.layerId, key, value);
      });
    }
  };

  watch(() => props.source, updateSource, { deep: true });
  watch(() => props.layer, updateLayer, { deep: true });

  map.value.on('style.load', () => {
    const styleTimeout = () => {
      if (!map.value.isStyleLoaded()) {
        loaded.value = false;
        setTimeout(styleTimeout, 200);
      } else {
        loaded.value = true;
      }
    };
    styleTimeout();
  });

  watch(loaded, (value) => {
    if (value) {
      addLayer();
    }
  });

  onMounted(() => {
    if (map.value.isStyleLoaded()) {
      addLayer();
    }
  });

  onBeforeUnmount(() => {
    if (map.value.getLayer(props.layerId)) {
      map.value.removeLayer(props.layerId);
    }
    if (map.value.getSource(props.sourceId)) {
      map.value.removeSource(props.sourceId);
    }
  });
</script>

<template>
  <slot></slot>
</template>
