import { reactive, toRefs, watch } from '@nuxtjs/composition-api';
import { Route } from 'vue-router';
import { getRuntimeVM } from './runtime';

type State = {
  route: Route;
};

const useRouter = () => {
  const vm = getRuntimeVM();
  const state = reactive<State>({
    route: vm.$route,
  });

  watch(
    () => vm.$route,
    (r) => {
      state.route = r as any;
    },
  );

  return { ...toRefs(state), router: vm.$router };
};

export { useRouter };
