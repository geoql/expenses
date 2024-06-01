<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import type { LngLatLike, Marker, PopupOptions } from 'maplibre-gl';
  import { Popup } from 'maplibre-gl';
  import { popupEvents } from '../constants/events';
  import { injectStrict, MapKey } from '../utils';

  const props = withDefaults(
    defineProps<{
      marker?: Marker;
      options: PopupOptions;
      coordinates: LngLatLike;
    }>(),
    {
      marker: () => ({}) as Marker,
      options: () => ({}) as PopupOptions,
      coordinates: () => ({}) as LngLatLike,
    },
  );

  const emit = defineEmits<{
    (e: 'added', payload: { popup: Popup }): void;
    (e: 'removed' | 'open' | 'close'): void;
  }>();

  const map = injectStrict(MapKey);
  const popup = new Popup(props.options);
  const loaded = ref(true);
  const content = ref<HTMLElement | null>(null);

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

  onMounted(() => {
    if (loaded.value) {
      setPopupContent();
      setPopupCoordinates();
      addToMarker();
      listenPopupEvents();
    } else {
      remove();
      removePopupEvents();
    }
  });

  onBeforeUnmount(() => {
    remove();
    removePopupEvents();
  });

  const setPopupContent = (): void => {
    if (content.value) {
      popup.setDOMContent(content.value);
    }
  };

  const setPopupCoordinates = (): void => {
    popup.setLngLat(props.coordinates);
  };

  const addToMarker = (): void => {
    if ('setPopup' in props.marker) {
      props.marker.setPopup(popup);
    } else {
      popup.addTo(map.value);
    }
    emit('added', { popup });
  };

  const remove = (): void => {
    popup.remove();
    emit('removed');
  };

  const listenPopupEvents = (): void => {
    popupEvents.forEach((event) => {
      popup.on(event, () => {
        emit(event);
      });
    });
  };

  const removePopupEvents = (): void => {
    popupEvents.forEach((event) => {
      popup.off(event, () => {
        emit(event);
      });
    });
  };
</script>

<template>
  <section :id="`popup-${Date.now()}`" ref="content">
    <slot></slot>
  </section>
</template>
