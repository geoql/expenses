import Vue from 'vue';
import { getCurrentInstance } from '@vue/composition-api';

export const getRuntimeVM = (): Vue => {
  const { proxy } = getCurrentInstance();

  if (proxy) return proxy;

  throw new ReferenceError('[vue-hooks] Vue instance not found.');
};
