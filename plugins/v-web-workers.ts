const csv = new Worker(
  new URL('../assets/workers/csv.worker.ts?worker', import.meta.url),
  {
    name: 'csvWorker',
    type: 'module',
  },
);

type Message = {
  sleep: number;
  payload: any;
};

interface Worker {
  send: (type: string, message: Message) => void;
  receive: (type: string, cb: (event: any) => void) => void;
}
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
  /**
   * Payload sent to Web Worker
   *
   * @param {string} type - CSV or API worker
   * @param {object} message - Message sent to worker
   * @returns {void}
   */
  function send(type: string, message: object): void {
    if (type === 'csv') {
      return csv.postMessage({ message });
    }
  }
  /**
   * Transformed data received from Web worker
   *
   * @param {string} type - CSV or API worker
   * @param {Function} cb - callback function
   */
  function receive(type: string, cb: (event: any) => void): void {
    if (type === 'csv') {
      csv.onmessage = (event) => {
        cb(event);
      };
    }
  }
  const $worker = { send, receive };

  nuxtApp.provide('worker', $worker);
  return {
    provide: {
      $worker,
    },
  };
});
