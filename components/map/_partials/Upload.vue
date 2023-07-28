<template>
  <div
    class="w-full p-2"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="options-menu"
  >
    <div class="min-w-max w-full">
      <div class="rounded p-2">
        <p class="pb-4 text-xl">Upload CSV</p>
        <div
          class="max-w-lg flex justify-center border-2 border-gray-600 rounded-md border-dashed px-6 pb-6 pt-5 shadow-md dark:border-gray-200"
        >
          <div v-if="file.name === null" class="text-center space-y-1">
            <svg
              class="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
              />
            </svg>
            <div class="flex flex-col items-center justify-center text-sm">
              <label
                for="file-upload"
                class="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <!-- Accept only csv -->
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only hidden"
                  accept=".csv,.tsv"
                  @change="onFileChange"
                />
              </label>
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400">
              <pre>.csv, .tsv only</pre>
            </div>
          </div>
          <div v-else :title="file.name" class="w-min">
            <p class="w-40 break-all">
              {{ file.name }}
            </p>
          </div>
        </div>
        <p class="pt-4 font-semibold">
          <a
            href="/demo.csv"
            class="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
          >
            Download Sample File
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'VUpload',
    emits: ['data'],
    setup(_, { emit }) {
      const { $worker } = useNuxtApp();

      const file = ref({
        name: null as string | null,
      });

      /**
       * Update file event
       * @param {any} e - Event
       */
      function onFileChange(e: unknown) {
        const files = (e as any).target.files || (e as any).dataTransfer.files;
        if (!files.length) return;
        file.value.name = files[0].name;
        uploadFile(files[0]);
      }
      /**
       * Upload the file
       * @param {File} file - The file
       */
      function uploadFile(file: File) {
        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
          const data = await $worker.parseDataFile(e.target?.result as string);
          emit('data', { data });
        };
        reader.readAsBinaryString(file);
      }
      return { file, onFileChange };
    },
  });
</script>
