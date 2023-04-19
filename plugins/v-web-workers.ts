import type { ExpenseFeatureCollection } from '~/@types/expense';
import * as Comlink from 'comlink';

type Worker = {
  parseDataFile(payload: string): Promise<ExpenseFeatureCollection>;
};

const csvWorker = new Worker(
  new URL('../assets/workers/csv.worker.ts?worker', import.meta.url),
  {
    name: 'csvWorker',
    type: 'module',
  },
);
const csvWorkerApi = Comlink.wrap(csvWorker);

declare module '#app' {
  interface NuxtApp {
    $worker: Worker;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $worker: Worker;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('worker', csvWorkerApi);
  return {
    provide: {
      $worker: csvWorkerApi,
    },
  };
});
