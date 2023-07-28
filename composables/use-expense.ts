import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import type { PopupOptions } from 'maplibre-gl';
import type { ExpenseForm, ExpenseFeatureCollection } from '~/@types/expense';

/**
 * Expense Store
 */
export const useExpense = defineStore({
  id: 'expense',
  state: () => ({
    map: {
      ui: {
        isMarker: true,
        isCluster: false,
        isHeatmap: false,
      },
      center: [73.8567, 18.5204],
      zoom: 11,
      marker: {
        options: { draggable: true },
        popup: {
          options: {
            closeButton: false,
            closeOnClick: false,
            offset: {
              top: [0, 10],
              bottom: [0, -10],
            },
          } as PopupOptions,
        },
        coordinates: [73.8567, 18.5204] as [number, number],
      },
    },
    form: {
      amount: undefined as number | undefined,
      description: '' as string,
      type: 'debit' as 'credit' | 'debit',
    } as ExpenseForm,
    geojson: {
      id: uuid().split('-').join(''),
      type: 'FeatureCollection',
      features: [],
    } as ExpenseFeatureCollection,
    popup: {
      shown: false,
      options: {
        closeButton: false,
        closeOnClick: false,
        offset: {
          top: [0, 10],
          bottom: [0, -10],
        },
      } as PopupOptions,
    },
  }),
  getters: {
    isMarker: (state): boolean => {
      return (
        !state.map.ui.isCluster &&
        state.map.ui.isMarker &&
        !state.map.ui.isHeatmap
      );
    },
    isCluster: (state): boolean => {
      return (
        state.map.ui.isCluster &&
        !state.map.ui.isMarker &&
        !state.map.ui.isHeatmap
      );
    },
    isHeatmap: (state): boolean => {
      return (
        !state.map.ui.isCluster &&
        !state.map.ui.isMarker &&
        state.map.ui.isHeatmap
      );
    },
  },
});
