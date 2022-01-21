<template>
  <section :id="`marker-${Date.now()}`">
    <slot />
  </section>
</template>
<script lang="ts">
  import type { LngLatLike, MarkerOptions } from 'maplibre-gl';
  import { EventData, Marker } from 'maplibre-gl';
  import type { PropType, SetupContext } from 'vue';
  import { defineComponent, onMounted } from 'vue';
  import { MapKey, MapLoadedKey } from '../types/symbols';
  import { injectStrict } from '../utils';

  export default defineComponent({
    name: 'VMarker',
    props: {
      options: {
        type: Object as PropType<MarkerOptions>,
        default: () => ({} as MarkerOptions),
        required: true,
      },
      coordinates: {
        type: Object as PropType<LngLatLike>,
        default: () => [],
        required: true,
      },
      cursor: {
        type: String as PropType<string>,
        default: 'pointer',
        required: false,
      },
    },
    setup(props, { emit }: SetupContext) {
      let map = injectStrict(MapKey);
      let loaded = injectStrict(MapLoadedKey);
      let marker: Marker = new Marker(props.options);

      onMounted(() => {
        if (loaded.value) {
          setMarkerCoordinates();
          addToMap();
          setCursorPointer();
        } else {
          removeFromMap();
        }
        listenMarkerEvents();
      });

      /**
       * Set marker coordinates
       * @returns {void}
       */
      function setMarkerCoordinates(): void {
        marker.setLngLat(props.coordinates);
      }
      /**
       * Sets the Cursor to Pointer
       * @returns {void}
       */
      function setCursorPointer(): void {
        marker.getElement().style.cursor = props.cursor || 'default';
      }

      /**
       * Add marker to map
       * @returns {void}
       */
      function addToMap(): void {
        marker.addTo(map.value);
        emit('added', { marker });
      }
      /**
       * Remove marker from map
       * @returns {void}
       */
      function removeFromMap(): void {
        marker.remove();
        emit('removed');
      }

      /**
       * Listen to events
       * @returns {void}
       */
      function listenMarkerEvents(): void {
        let coordinates: LngLatLike;
        // Listen to Marker Mapbox events
        ['dragstart', 'drag', 'dragend'].forEach((event: string) => {
          marker.on(event, (e: EventData) => {
            if (event === 'dragend') {
              if (props.coordinates instanceof Array) {
                coordinates = [e.target._lngLat.lng, e.target._lngLat.lat];
              } else {
                coordinates = e.target._lngLat;
              }
              emit('update:coordinates', coordinates);
            }
            emit(event, e);
          });
        });
        // Listen to Marker DOM events
        ['click', 'mouseenter', 'mouseleave'].forEach((event: string) => {
          marker.getElement().addEventListener(event, (e) => {
            emit(event, e);
          });
        });
      }
    },
  });
</script>
