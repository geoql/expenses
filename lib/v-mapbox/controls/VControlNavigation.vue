<script lang="ts">
  import type { NavigationOptions } from 'maplibre-gl';
  import type { PropType } from 'vue';
  import { NavigationControl } from 'maplibre-gl';
  import { defineComponent, onMounted } from 'vue';
  import { MapKey, injectStrict } from '../utils';

  export default defineComponent({
    name: 'VControlNavigation',
    props: {
      options: {
        type: Object as PropType<NavigationOptions>,
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
    setup(props) {
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
        const control = new NavigationControl(props.options);
        map.value.addControl(control, props.position);
      }
    },
  });
</script>
