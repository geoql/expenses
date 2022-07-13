import { defineStore } from 'pinia';

/**
 * Expense Store
 */
export const useExpense = defineStore({
  id: 'expense',
  state: () => {
    return {
      ui: {
        loaded: false as boolean,
      },
    };
  },
  actions: {
    setLoaded(loaded: boolean) {
      this.ui.loaded = loaded;
    },
  },
});
