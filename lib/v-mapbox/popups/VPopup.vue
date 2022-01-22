<template>
  <section :id="`popup-${Date.now()}`" ref="content">
    <slot />
  </section>
</template>
<script lang="ts">
  import type { LngLatLike, Marker, PopupOptions } from 'maplibre-gl';
  import type { PropType, SetupContext } from 'vue';
  import { Popup } from 'maplibre-gl';
  import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
  import { MapLoadedKey } from '../types/symbols';
  import { injectStrict } from '../utils';

  export default defineComponent({
    name: 'VPopup',
    props: {
      marker: {
        type: Object as PropType<Marker>,
        default: () => ({} as Marker),
        required: true,
      },
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
      let loaded = injectStrict(MapLoadedKey);
      let popup: Popup = new Popup(props.options);
      const content = ref(null);

      onMounted(() => {
        if (loaded.value) {
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

      /**
       * Set popup coordinates
       * @returns {void}
       */
      function setPopupCoordinates(): void {
        const { outerHTML }: { outerHTML: string } =
          content.value.children[0].children[0];
        popup.setHTML(outerHTML);
        popup.setLngLat(props.coordinates);
      }

      /**
       * Add popup to map
       * @returns {void}
       */
      function addToMarker(): void {
        props.marker.setPopup(popup);
        emit('added', { popup });
      }
      /**
       * Remove popup from map
       * @returns {void}
       */
      function remove(): void {
        popup.remove();
        emit('removed');
      }

      /**
       * Listen to events
       * @returns {void}
       */
      function listenPopupEvents(): void {
        ['open', 'close'].forEach((event: string) => {
          popup.on(event, () => {
            emit(event);
          });
        });
      }
      /**
       * Turn off listener
       * @returns {void}
       */
      function removePopupEvents(): void {
        ['open', 'close'].forEach((event: string) => {
          popup.off(event, () => {
            emit(event);
          });
        });
      }

      return {
        content,
      };
    },
  });
</script>
