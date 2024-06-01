<script setup lang="ts">
  import type {
    CanvasSourceSpecification,
    LayerSpecification,
  } from 'maplibre-gl';
  import type { Ref } from 'vue';
  import { onMounted, ref, watch } from 'vue';
  import { injectStrict, MapKey } from '../../../utils';

  const props = withDefaults(
    defineProps<{
      source: CanvasSourceSpecification;
      layer: LayerSpecification;
      sourceId?: string;
      layerId?: string;
      before?: string;
    }>(),
    {
      sourceId: 'maplibre.gl-canvas-source',
      layerId: 'maplibre.gl-canvas-layer',
      // source: {} as CanvasSourceSpecification,
      // layer: {} as LayerSpecification,
      before: '',
    },
  );
  const map = injectStrict(MapKey);
  const loaded: Ref<boolean> = ref(false);

  const layer = {
    ...props.layer,
    id: props.layerId,
    source: props.sourceId,
  };

  map.value.on('style.load', () => {
    // https://github.com/mapbox/mapbox-gl-js/issues/2268#issuecomment-401979967
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
    addLayer();
  });

  const addLayer = (): void => {
    map.value.addSource(props.sourceId, props.source);
    map.value.addLayer(layer, props.before);
  };
</script>

<template>
  <slot></slot>
</template>
