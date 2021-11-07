<script lang="ts">
  import { Map, MapboxOptions, MapEventType } from 'mapbox-gl';
  import { ref, onMounted, defineComponent, h } from 'vue';
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
      let map: Ref<Map> = ref({} as Map);
      let events: Ref<Array<keyof MapEventType>> = ref(mapEvents);

      onMounted(() => {
        map.value = new Map({
          ...props.options,
          container: 'map',
        });
        events.value.forEach((e) => {
          map.value.on(e, (evt) => {
            if (e === 'load') {
              emit('load', map.value);
            } else {
              emit(e, evt);
            }
          });
        });
      });
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
