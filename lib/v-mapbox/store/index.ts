import { createGlobalState, useStorage } from '@vueuse/core';
import type { Map } from 'mapbox-gl';

export const useGlobalState = createGlobalState(() =>
  useStorage('global-state', {
    map: {} as Map,
  }),
);
