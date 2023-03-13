<script lang="ts">
  import type { GeolocateOptions } from 'maplibre-gl';
  import type { PropType } from 'vue';
  import { GeolocateControl } from 'maplibre-gl';
  import { defineComponent, onMounted } from 'vue';
  import { geolocateControlEvents as events } from '../constants/events/geolocate';
  import { MapKey } from '../types/symbols';
  import { injectStrict } from '../utils';

  export default defineComponent({
    name: 'VControlGeolocate',
    props: {
      options: {
        type: Object as PropType<GeolocateOptions>,
        default: () => ({}),
        required: true,
      },
      position: {
        type: String as PropType<
          'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
        >,
        default: () => 'top-left',
        required: false,
      },
    },
    setup(props, { emit }) {
      let map = injectStrict(MapKey);

      onMounted(() => {
        addControl();
      });

      /**
       * Adds the Attribution Control
       *
       * @returns {void}
       */
      function addControl(): void {
        const control = new GeolocateControl(props.options);
        map.value.addControl(control, props.position);
        events.forEach((event: string) => {
          control.on(event, () => {
            emit(event);
          });
        });
      }
    },
  });
</script>
