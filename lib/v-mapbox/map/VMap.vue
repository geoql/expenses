<script lang="ts">
  import type { MapboxOptions, MapEventType } from 'maplibre-gl';
  import { Map } from 'maplibre-gl';
  import type { PropType, Ref, SetupContext } from 'vue';
  import { defineComponent, h, onMounted, provide, ref } from 'vue';
  import { mapEvents } from '../constants/events';
  import { MapKey } from '../types/symbols';

  export default defineComponent({
    name: 'VMap',
    props: {
      options: {
        type: Object as PropType<MapboxOptions>,
        required: true,
        default: () => ({}),
      },
    },
    setup(props, { emit, slots }: SetupContext) {
      let map: Ref<Map> = ref({} as Map);
      let loaded: Ref<boolean> = ref(false);
      let events: Ref<Array<keyof MapEventType>> = ref(mapEvents);

      let styleChanged: Ref<boolean> = ref(false);
      let tilesLoaded: Ref<boolean> = ref(false);

      onMounted(() => {
        map.value = new Map(props.options);
        loaded.value = true;
        provide(MapKey, map);
        listenMapEvents();
      });

      /**
       * Listen to map events
       *
       * @returns {void}
       */
      function listenMapEvents(): void {
        // Listen for events
        events.value.forEach((e) => {
          map.value.on(e, (evt) => {
            switch (e) {
              case 'load':
                emit('loaded', map.value);
                break;
              default:
                emit(e, evt);
                break;
            }
          });
        });
      }

      return () =>
        h(
          'div',
          {
            id: props.options.container || 'map',
            class: 'v-map-container',
          },
          slots && slots.default ? slots.default() : {},
        );
    },
  });
</script>

<style>
  canvas {
    outline: none;
  }

  .v-map-container {
    width: 100%;
    height: 100%;
  }
</style>
