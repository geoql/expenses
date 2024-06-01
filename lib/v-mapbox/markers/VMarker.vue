<script setup lang="ts">
  import type { Ref } from 'vue';
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
  import type { LngLatLike, MarkerOptions, PopupOptions } from 'maplibre-gl';
  import { Marker } from 'maplibre-gl';
  import VPopup from '../popups/VPopup.vue';
  import { markerDOMEvents, markerMapEvents } from '../constants/events';
  import { injectStrict, MapKey } from '../utils';

  const props = withDefaults(
    defineProps<{
      coordinates: LngLatLike | null;
      options?: MarkerOptions;
      popupOptions?: PopupOptions;
      cursor?: string;
    }>(),
    {
      coordinates: null,
      options: () => ({}),
      popupOptions: () => ({}),
      cursor: 'pointer',
    },
  );

  const emit = defineEmits([
    'added',
    'update:coordinates',
    'removed',
    ...markerMapEvents,
    ...markerDOMEvents,
  ]);

  const map = injectStrict(MapKey);
  const marker: Ref<Marker | null> = ref(null);
  const loaded = ref(true);
  const isMarkerAvailable = ref(false);
  const slotRef = ref<HTMLElement | null>(null);

  const setSlotRef = (el: HTMLElement) => {
    slotRef.value = el;
  };

  watch(marker, (markerValue) => {
    isMarkerAvailable.value = markerValue !== null && '_map' in markerValue;
  });

  onMounted(() => {
    if (loaded.value) {
      const markerOptions: MarkerOptions = {
        ...props.options,
        element: slotRef.value || undefined,
      };
      marker.value = new Marker(markerOptions);
      setMarkerCoordinates(marker.value);
      addToMap(marker.value);
      setCursorPointer(marker.value);
      listenMarkerEvents(marker.value);
    }
  });

  onBeforeUnmount(() => {
    if (marker.value) {
      removeFromMap(marker.value);
    }
  });

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

  const setMarkerCoordinates = (marker: Marker): void => {
    if (props.coordinates !== null) marker.setLngLat(props.coordinates);
  };

  const setCursorPointer = (marker: Marker): void => {
    marker.getElement().style.cursor = props.cursor || 'default';
  };

  const addToMap = (marker: Marker): void => {
    marker.addTo(map.value);
    emit('added', { marker });
  };

  const removeFromMap = (marker: Marker): void => {
    marker.remove();
    emit('removed');
  };

  const listenMarkerEvents = (marker: Marker): void => {
    let coordinates: LngLatLike;
    markerMapEvents.forEach((event: string) => {
      marker.on(event, (e: { target: Marker }) => {
        if (event === 'dragend') {
          if (Array.isArray(props.coordinates)) {
            coordinates = [e.target.getLngLat().lng, e.target.getLngLat().lat];
          } else {
            coordinates = e.target.getLngLat();
          }
          emit('update:coordinates', coordinates);
        }
        emit(event, e);
      });
    });

    markerDOMEvents.forEach((event: string) => {
      marker.getElement().addEventListener(event, (e) => {
        emit(event, e);
      });
    });
  };
</script>

<template>
  <section :id="`marker-${Date.now()}`" class="absolute">
    <slot :set-ref="setSlotRef" name="markers"></slot>
    <template v-if="isMarkerAvailable">
      <v-popup
        :marker="marker!"
        :options="popupOptions"
        :coordinates="coordinates!"
      >
        <slot></slot>
      </v-popup>
    </template>
  </section>
</template>

<style>
  .absolute {
    position: absolute !important;
  }
</style>
