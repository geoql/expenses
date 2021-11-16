<script lang="ts">
  import { Map, MapboxOptions, MapEventType } from 'mapbox-gl';
  import { ref, reactive, onMounted, provide, defineComponent, h } from 'vue';
  import type { PropType, SetupContext, Ref } from 'vue';
  import { mapEvents } from '../constants/events';

  export default defineComponent({
    name: 'VMap',
    props: {
      options: {
        type: Object as PropType<MapboxOptions>,
        required: true,
        default: '',
      },
    },
    setup(props, { emit, slots }: SetupContext) {
      let map: Map = reactive({}) as Map;
      let events: Ref<Array<keyof MapEventType>> = ref(mapEvents);
      let loaded: Ref<boolean> = ref(false);
      let styleChanged: Ref<boolean> = ref(false);
      let tilesLoaded: Ref<boolean> = ref(false);

      onMounted(() => {
        map = new Map({
          ...props.options,
          container: 'map',
        });
        loaded.value = true;
        provide('map.ui.loaded', loaded);
        provide('map.ui.style-loaded', styleChanged);
        provide('map.ui.tiles-loaded', tilesLoaded);
        provide('map.initialized.state', map);
        listenMapEvents();
      });

      function listenMapEvents(): void {
        // Listen for events
        events.value.forEach((e) => {
          map.on(e, (evt) => {
            switch (e) {
              case 'load':
                emit('load', map);
                break;
              case 'sourcedata' || 'sourcedataloading':
                const sourceTimeout = () => {
                  if (!map.areTilesLoaded()) {
                    tilesLoaded.value = false;
                    setTimeout(sourceTimeout, 200);
                  } else {
                    tilesLoaded.value = true;
                  }
                };
                sourceTimeout();
                break;
              // https://github.com/mapbox/mapbox-gl-js/issues/2268#issuecomment-401979967
              // @ts-ignore
              case 'style.load':
                const styleTimeout = () => {
                  if (!map.isStyleLoaded()) {
                    styleChanged.value = false;
                    setTimeout(styleTimeout, 200);
                  } else {
                    styleChanged.value = true;
                  }
                };
                styleTimeout();
                break;
              default:
                emit(e, evt);
                break;
            }
          });
        });
      }

      return () =>
        h('div', { id: 'map' }, slots && slots.default ? slots.default() : {});
    },
  });
</script>

<style>
  canvas {
    outline: none;
  }

  #map {
    width: 100%;
    height: 100%;
  }
</style>
