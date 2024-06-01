<script setup lang="ts">
  import type {
    LayerSpecification as AnyLayer,
    VectorSourceSpecification as VectorSource,
  } from 'maplibre-gl';
  import type { PropType } from 'vue';
  import { onMounted, ref, watch } from 'vue';
  import { injectStrict, MapKey } from '../../../utils';

  const props = defineProps({
    sourceId: {
      type: String,
      default: 'maplibre.gl-video-source',
      required: true,
    },
    layerId: {
      type: String,
      default: 'maplibre.gl-video-layer',
      required: true,
    },
    source: {
      type: Object as PropType<VectorSource>,
      required: true,
    },
    layer: {
      type: Object as PropType<AnyLayer>,
      default: () => ({}),
      required: true,
    },
    before: {
      type: String,
      default: '',
      required: false,
    },
  });

  const map = injectStrict(MapKey);
  const loaded = ref(false);

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

  function addLayer(): void {
    map.value.addSource(props.sourceId, props.source);
    map.value.addLayer(layer, props.before);
  }
</script>

<template>
  <slot></slot>
</template>
