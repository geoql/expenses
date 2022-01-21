<template>
  <section :id="`popup-${Date.now()}`">
    <slot />
  </section>
</template>
<script lang="ts">
  import type { EventData, LngLatLike, PopupOptions } from 'maplibre-gl';
  import { Popup } from 'maplibre-gl';
  import type { PropType, SetupContext } from 'vue';
  import { defineComponent, onMounted } from 'vue';
  import { MapKey, MapLoadedKey } from '../types/symbols';
  import { injectStrict } from '../utils';

  export default defineComponent({
    name: 'VPopup',
    props: {
      options: {
        type: Object as PropType<PopupOptions>,
        default: () => ({} as PopupOptions),
        required: true,
      },
      coordinates: {
        type: Object as PropType<LngLatLike>,
        default: () => [],
        required: true,
      },
    },
    setup(props, { emit }: SetupContext) {
      let map = injectStrict(MapKey);
      let loaded = injectStrict(MapLoadedKey);
      let popup: Popup = new Popup(props.options);

      onMounted(() => {
        if (loaded.value) {
          setPopupCoordinates();
          addToMap();
        } else {
          removeFromMap();
        }
        listenMarkerEvents();
      });

      /**
       * Set popup coordinates
       * @returns {void}
       */
      function setPopupCoordinates(): void {
        popup.setLngLat(props.coordinates);
      }

      /**
       * Add popup to map
       * @returns {void}
       */
      function addToMap(): void {
        popup.addTo(map.value);
        emit('added', { popup });
      }
      /**
       * Remove popup from map
       * @returns {void}
       */
      function removeFromMap(): void {
        popup.remove();
        emit('removed');
      }

      /**
       * Listen to events
       * @returns {void}
       */
      function listenMarkerEvents(): void {
        let coordinates: LngLatLike;
        // Listen to Marker Mapbox events
        ['close', 'open'].forEach((event: string) => {
          popup.on(event, (e: EventData) => {
            if (event === 'open') {
              if (props.coordinates instanceof Array) {
                coordinates = [e.target._lngLat.lng, e.target._lngLat.lat];
              } else {
                coordinates = e.target._lngLat;
              }
              emit('update:coordinates', coordinates);
            }
          });
        });
        // Listen to Marker DOM events
        ['click', 'mouseenter', 'mouseleave'].forEach((event: string) => {
          popup.getElement().addEventListener(event, (e) => {
            emit(event, e);
          });
        });
      }
    },
  });
</script>
