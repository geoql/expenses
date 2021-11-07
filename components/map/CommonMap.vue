<template>
  <client-only>
    <mgl-map
      container="map"
      :mapbox-gl="state.mapboxgl"
      :access-token="state.mapOptions.accessToken"
      :map-style.sync="state.mapOptions.style"
      :center="state.mapOptions.center"
      :zoom.sync="state.mapOptions.zoom"
      :max-zoom="state.mapOptions.maxZoom"
      :cross-source-collisions="false"
      :fail-if-major-performance-caveat="false"
      :preserve-drawing-buffer="true"
      :hash="false"
      :min-pitch="0"
      :max-pitch="60"
      @load="mapLoaded"
      @moveend="mapMoved"
      @click="mapClicked"
    >
      <div v-if="loaded && styleChanged">
        <slot />
        <mgl-scale-control position="bottom-left" />
        <!-- Heatmap || Clusters -->
        <div class="absolute top-0 left-0 invisible p-2 m-2 rounded-md">
          <span class="relative z-0 inline-flex rounded-full shadow">
            <button
              v-tooltip.bottom="{
                content: `${viz.isMarker ? 'Disable' : 'Enable'} Markers`,
                offset: 4,
                boundariesElement: 'viewport',
              }"
              type="button"
              class="
                relative
                visible
                inline-flex
                items-center
                px-3
                py-1.5
                rounded-l-full
                border border-gray-300 border-opacity-25
                bg-opacity-75
                dark:bg-opacity-50
                text-sm
                font-medium
                focus:z-10
                focus:outline-none
                focus:ring-0
                focus:ring-indigo-500
                focus:border-indigo-500
                active:ring-0
              "
              :class="{
                'bg-indigo-800 text-gray-50': viz.isMarker,
                'text-gray-800 bg-white dark:text-white dark:bg-gray-800':
                  !viz.isMarker,
              }"
              @click="
                $emit('update:viz', {
                  isMarker: !viz.isMarker,
                  isCluster: false,
                  isHeatmap: false,
                })
              "
            >
              <span class="sm:block hidden">Marker(s)</span>
              <svg
                class="fill-current h-4 sm:hidden block"
                xmlns="http://www.w3.org/2000/svg"
                xml:space="preserve"
                viewBox="0 0 490 490"
              >
                <ellipse cx="141.728" cy="381.365" rx="72.943" ry="14.805" />
                <path
                  d="M39.521 173.428c0 54.551 80.57 164.053 89.775 176.309l12.51 16.822 12.589-16.822c5.178-6.998 33.343-45.272 56.752-87.025l197.416 200.574 21.824-21.48-154.965-157.442L490 65.904l-21.839-21.45-214.216 218.091-27.96-28.407c10.633-22.471 18.108-44.139 18.108-60.709 0-65.445-40.128-107.74-102.286-107.74-24.857 0-46.108 6.861-62.761 19.163L21.824 26.714 0 48.187l57.915 58.841c-11.807 17.587-18.394 40.076-18.394 66.4zm173.958 0c0 24.291-28.95 80.992-71.688 141.501-36.616-51.62-71.657-114.225-71.657-141.501 0-48.294 26.793-77.127 71.672-77.127 44.88 0 71.673 28.833 71.673 77.127z"
                />
                <ellipse cx="141.728" cy="174.149" rx="33.125" ry="33.724" />
              </svg>
            </button>
            <button
              v-tooltip.bottom="{
                content: `${viz.isCluster ? 'Disable' : 'Enable'} Clustering`,
                offset: 4,
                boundariesElement: 'viewport',
              }"
              type="button"
              class="
                -ml-px
                relative
                visible
                inline-flex
                items-center
                px-3
                py-1.5
                border border-gray-300 border-opacity-25
                bg-opacity-75
                dark:bg-opacity-50
                text-sm
                font-medium
                focus:z-10
                focus:outline-none
                focus:ring-0
                focus:ring-indigo-500
                focus:border-indigo-500
                active:ring-0
              "
              :class="{
                'bg-indigo-800 text-gray-50': viz.isCluster,
                'text-gray-800 bg-white dark:text-white dark:bg-gray-800':
                  !viz.isCluster,
              }"
              @click="
                $emit('update:viz', {
                  isMarker: false,
                  isCluster: !viz.isCluster,
                  isHeatmap: false,
                })
              "
            >
              <span class="sm:block hidden">Cluster(s)</span>
              <svg
                class="h-4 fill-current sm:hidden block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M16 7a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1Zm-5 27a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1ZM7 11a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1Zm14 23a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1Zm4-15a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1ZM4 21a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1Zm24 4a3 3 0 1 1 3-3 3.0033 3.0033 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1.001 1.001 0 0 0-1-1Zm-12 5a6 6 0 1 1 6-6 6.0069 6.0069 0 0 1-6 6Zm0-10a4 4 0 1 0 4 4 4.0045 4.0045 0 0 0-4-4Z"
                />
                <path fill="none" d="M0 0h32v32H0z" />
              </svg>
            </button>
            <button
              v-tooltip.bottom="{
                content: `${viz.isHeatmap ? 'Disable' : 'Enable'} Heatmaps`,
                offset: 4,
                boundariesElement: 'viewport',
              }"
              type="button"
              disabled="true"
              class="
                opacity-50
                cursor-not-allowed
                -ml-px
                relative
                visible
                inline-flex
                items-center
                px-3
                py-1.5
                rounded-r-full
                border border-gray-300 border-opacity-25
                bg-opacity-75
                dark:bg-opacity-50
                text-sm
                font-medium
                focus:z-10
                focus:outline-none
                focus:ring-0
                focus:ring-indigo-500
                focus:border-indigo-500
                active:ring-0
              "
              :class="{
                'bg-indigo-800 text-gray-50 ': viz.isHeatmap,
                'text-gray-800 bg-white dark:text-white dark:bg-gray-800':
                  !viz.isHeatmap,
              }"
            >
              <!-- @click="
                $emit('update:viz', {
                  isMarker: false,
                  isCluster: false,
                  isHeatmap: !viz.isHeatmap,
                })
              " -->
              <span class="sm:block hidden">Heatmap</span>
              <svg
                class="h-4 fill-current sm:hidden block"
                xmlns="http://www.w3.org/2000/svg"
                xml:space="preserve"
                viewBox="0 0 32 32"
              >
                <path
                  d="M18 31.36c-1.301 0-2.36-1.059-2.36-2.36s1.059-2.36 2.36-2.36c1.302 0 2.36 1.059 2.36 2.36s-1.058 2.36-2.36 2.36zm0-4c-.904 0-1.64.735-1.64 1.64s.736 1.64 1.64 1.64 1.64-.735 1.64-1.64-.736-1.64-1.64-1.64zm-11 4c-2.956 0-5.36-2.405-5.36-5.36 0-1.006.287-1.977.833-2.835C1.385 22.748.64 21.7.64 20.5c0-1.577 1.283-2.86 2.86-2.86s2.86 1.283 2.86 2.86c0 .061-.002.121-.007.183 3.246-.417 6.007 2.148 6.007 5.317 0 2.955-2.404 5.36-5.36 5.36zm-3.5-13c-1.18 0-2.14.96-2.14 2.14 0 1.035.742 1.919 1.764 2.102.124.022.228.107.272.226.045.117.026.25-.051.35-.644.829-.985 1.805-.985 2.822 0 2.559 2.082 4.64 4.64 4.64s4.64-2.081 4.64-4.64S9.559 21.36 7 21.36c-.326 0-.656.038-1.01.118-.123.027-.251-.011-.338-.102-.087-.09-.121-.22-.089-.341.052-.201.077-.371.077-.535 0-1.18-.96-2.14-2.14-2.14zm24.5 10c-1.853 0-3.36-1.508-3.36-3.36s1.508-3.36 3.36-3.36 3.36 1.508 3.36 3.36-1.507 3.36-3.36 3.36zm0-6c-1.456 0-2.64 1.184-2.64 2.64s1.184 2.64 2.64 2.64 2.64-1.184 2.64-2.64-1.184-2.64-2.64-2.64zm-11 1c-1.853 0-3.36-1.508-3.36-3.36 0-2.071 1.926-3.74 4.017-3.289.144-1.166 1.14-2.071 2.343-2.071 1.302 0 2.36 1.059 2.36 2.36 0 1.203-.906 2.199-2.071 2.343.047.221.071.44.071.657 0 1.853-1.507 3.36-3.36 3.36zm0-6c-1.456 0-2.64 1.184-2.64 2.64s1.185 2.64 2.64 2.64c1.456 0 2.64-1.184 2.64-2.64 0-.289-.056-.591-.167-.896-.043-.115-.022-.245.053-.343s.199-.146.318-.139l.156.018c.904 0 1.64-.735 1.64-1.64s-.735-1.64-1.64-1.64-1.64.736-1.64 1.64c0 .004.017.148.018.152.013.124-.039.245-.137.321-.098.078-.227.097-.345.056-.312-.114-.606-.169-.896-.169zm11 0c-.75 0-1.36-.61-1.36-1.36s.61-1.36 1.36-1.36 1.36.61 1.36 1.36-.61 1.36-1.36 1.36zm0-2c-.353 0-.64.287-.64.64s.287.64.64.64.64-.287.64-.64-.287-.64-.64-.64zm-23 0c-1.301 0-2.36-1.059-2.36-2.36S3.699 10.64 5 10.64 7.36 11.699 7.36 13 6.301 15.36 5 15.36zm0-4c-.904 0-1.64.736-1.64 1.64s.736 1.64 1.64 1.64 1.64-.736 1.64-1.64-.736-1.64-1.64-1.64zm7.5 2c-1.577 0-2.86-1.283-2.86-2.86 0-1.385.969-2.531 2.281-2.796-.187-.551-.281-1.122-.281-1.704 0-2.956 2.404-5.36 5.36-5.36 2.955 0 5.36 2.404 5.36 5.36s-2.405 5.36-5.36 5.36c-.581 0-1.152-.095-1.705-.282-.264 1.313-1.41 2.282-2.795 2.282zm4.5-12c-2.559 0-4.64 2.082-4.64 4.64 0 .641.133 1.267.396 1.862.048.109.039.236-.025.337-.064.102-.174.165-.294.168-1.165.034-2.077.971-2.077 2.133 0 1.18.96 2.14 2.14 2.14 1.161 0 2.098-.912 2.132-2.077.003-.12.066-.229.167-.293s.229-.074.337-.025c.598.262 1.225.396 1.864.396 2.559 0 4.64-2.082 4.64-4.64S19.559 1.36 17 1.36zm10 9c-1.302 0-2.36-1.059-2.36-2.36S25.698 5.64 27 5.64 29.36 6.699 29.36 8s-1.058 2.36-2.36 2.36zm0-4c-.904 0-1.64.736-1.64 1.64s.736 1.64 1.64 1.64 1.64-.736 1.64-1.64-.736-1.64-1.64-1.64zm-25 3C1.25 9.36.64 8.75.64 8S1.25 6.64 2 6.64 3.36 7.25 3.36 8 2.75 9.36 2 9.36zm0-2c-.353 0-.64.287-.64.64 0 .353.287.64.64.64s.64-.287.64-.64-.287-.64-.64-.64zm5-1C5.699 6.36 4.64 5.301 4.64 4S5.699 1.64 7 1.64 9.36 2.699 9.36 4 8.301 6.36 7 6.36zm0-4c-.904 0-1.64.736-1.64 1.64S6.096 5.64 7 5.64 8.64 4.904 8.64 4 7.904 2.36 7 2.36zm23 2c-.75 0-1.36-.61-1.36-1.36s.61-1.36 1.36-1.36 1.36.61 1.36 1.36-.61 1.36-1.36 1.36zm0-2c-.353 0-.64.287-.64.64s.287.64.64.64.64-.287.64-.64-.287-.64-.64-.64z"
                />
                <path fill="none" d="M0 0h32v32H0z" />
              </svg>
            </button>
          </span>
        </div>
        <!-- Search, Basemaps & Heatmap / Cluster / Markers toggler -->
        <div
          class="
            absolute
            top-0
            right-0
            invisible
            p-2
            m-2
            text-gray-800
            bg-opacity-50
            rounded-md
            dark:text-white
          "
        >
          <div class="relative flex flex-col space-y-2">
            <!-- Search -->
            <div
              v-click-outside="() => (state.utils.geocoder.shown = false)"
              class="
                relative
                visible
                w-10
                h-10
                text-sm text-gray-600
                bg-gray-200
                border border-gray-100
                rounded-md
                hover:bg-gray-300
                dark:bg-gray-800
                dark:border-gray-700
                dark:text-white
                dark:hover:bg-gray-800
              "
              title="Search"
              :class="{
                'bg-gray-300 dark:bg-gray-800': state.utils.geocoder.shown,
              }"
            >
              <div class="p-2 cursor-pointer" @click="toggleTool('geocoder')">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-class="transform scale-95 translate-x-4 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in translate-x-4"
                leave-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div
                  v-if="state.utils.geocoder.shown"
                  class="
                    absolute
                    top-0
                    right-0
                    h-full
                    mr-12
                    text-gray-900
                    origin-right
                    bg-gray-200
                    rounded-md
                    shadow-lg
                    dark:bg-gray-700 dark:text-gray-50
                    w-80
                    ring-1 ring-white ring-opacity-5
                  "
                >
                  <geocoder :bbox="state.map.bbox" @fly-to="mapFlyTo" />
                </div>
              </transition>
            </div>
            <!-- Basemaps -->
            <div
              v-click-outside="() => (state.utils.basemaps.shown = false)"
              class="
                relative
                visible
                w-10
                h-10
                text-sm text-gray-600
                bg-gray-200
                border border-gray-100
                rounded-md
                hover:bg-gray-300
                dark:bg-gray-800
                dark:border-gray-700
                dark:text-white
                dark:hover:bg-gray-800
              "
              title="Basemaps"
              :class="{
                'bg-gray-300 dark:bg-gray-800': state.utils.basemaps.shown,
              }"
            >
              <div
                v-tooltip.left="{
                  content: 'Click here to update basemap',
                  offset: 4,
                  boundariesElement: 'viewport',
                }"
                class="p-2 cursor-pointer"
                @click="toggleTool('basemaps')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 17.784 19.117"
                  class="w-5 h-5"
                >
                  <path
                    d="M9.534 16.496a1.067 1.067 0 01-1.306 0l-6.527-5.07a1.055 1.055 0 00-1.295 1.666l7.175 5.583a2.135 2.135 0 002.611 0l7.175-5.583a1.058 1.058 0 000-1.666l-.011-.011a1.052 1.052 0 00-1.295 0l-6.527 5.081zm.669-3.206l7.175-5.583a1.069 1.069 0 000-1.677L10.203.447a2.135 2.135 0 00-2.611 0L.416 6.04a1.069 1.069 0 000 1.677L7.591 13.3a2.12 2.12 0 002.611-.011z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-class="transform scale-95 translate-x-4 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in translate-x-4"
                leave-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div
                  v-if="state.utils.basemaps.shown"
                  class="
                    absolute
                    top-0
                    right-0
                    w-48
                    sm:w-64
                    mr-12
                    origin-right
                    bg-gray-300
                    rounded-md
                    shadow-lg
                    dark:bg-gray-700
                    ring-1 ring-white ring-opacity-5
                  "
                >
                  <basemaps
                    :data="state.utils.basemaps.data"
                    @update-map-style="updateBasemap"
                    @close="state.utils.basemaps.shown = false"
                  />
                </div>
              </transition>
            </div>
          </div>
        </div>
        <!-- Zoom in, Zoom out, Bearing & Locate Me -->
        <div
          class="
            absolute
            right-0
            invisible
            p-2
            m-2
            text-gray-800
            bg-opacity-50
            rounded-md
            bottom-8
            sm:bottom-6
            dark:text-white
          "
        >
          <div class="relative flex flex-col space-y-2">
            <!-- Zoom in & out -->
            <div
              class="
                flex flex-col
                items-center
                justify-center
                visible
                w-10
                h-20
              "
              title="Zoom In/Out"
            >
              <!-- Zoom In -->
              <div
                v-tooltip.left="{
                  content: 'Click here to Zoom in',
                  offset: 4,
                  boundariesElement: 'viewport',
                }"
                class="
                  w-10
                  h-10
                  p-2
                  text-sm text-gray-600
                  bg-gray-200
                  border border-b-0 border-gray-100
                  rounded-md rounded-b-none
                  cursor-pointer
                  hover:bg-gray-300
                  dark:bg-gray-800
                  dark:border-gray-700
                  dark:text-white
                  dark:hover:bg-gray-800
                "
                title="Zoom In"
                @click="mapZoomIn"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <!-- Zoom Out -->
              <div
                v-tooltip.left="{
                  content: 'Click here to Zoom out',
                  offset: 4,
                  boundariesElement: 'viewport',
                }"
                class="
                  w-10
                  h-10
                  p-2
                  text-sm text-gray-600
                  bg-gray-200
                  border border-t-0 border-gray-100
                  rounded-md rounded-t-none
                  cursor-pointer
                  hover:bg-gray-300
                  dark:bg-gray-800
                  dark:border-gray-700
                  dark:text-white
                  dark:hover:bg-gray-800
                "
                title="Zoom Out"
                @click="mapZoomOut"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 12H4"
                  />
                </svg>
              </div>
            </div>
            <!-- Bearing -->
            <div
              v-tooltip.left="{
                content: 'Click here to reset pitch / bearing',
                offset: 4,
                boundariesElement: 'viewport',
              }"
              class="
                relative
                visible
                w-10
                h-10
                text-sm text-gray-600
                bg-gray-200
                border border-gray-100
                rounded-md
                hover:bg-gray-300
                dark:bg-gray-800
                dark:border-gray-700
                dark:text-white
                dark:hover:bg-gray-800
              "
              title="Locate Me"
              :class="{
                'bg-gray-300 dark:bg-gray-800': state.utils.compass.shown,
              }"
            >
              <div class="p-2 cursor-pointer" @click="toggleTool('compass')">
                <svg
                  class="
                    w-5
                    h-5
                    transition-all
                    duration-100
                    ease-linear
                    transform
                    fill-current
                  "
                  :style="{
                    transform:
                      'rotate(' + state.utils.compass.data.bearing + 'deg)',
                  }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <defs />
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"
                  />
                </svg>
              </div>
            </div>
            <!-- Locate -->
            <div
              v-tooltip.left="{
                content: 'Click here to get your location',
                offset: 4,
                boundariesElement: 'viewport',
              }"
              class="
                relative
                visible
                w-10
                h-10
                text-sm text-gray-600
                bg-gray-200
                border border-gray-100
                rounded-md
                hover:bg-gray-300
                dark:bg-gray-800
                dark:border-gray-700
                dark:text-white
                dark:hover:bg-gray-800
              "
              title="Locate Me"
            >
              <div class="p-2 cursor-pointer" @click="toggleTool('locate')">
                <svg
                  class="w-5 h-5 fill-current stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 469.333 469.333"
                >
                  <defs />
                  <path
                    d="M234.667 149.333c-47.147 0-85.333 38.187-85.333 85.333S187.52 320 234.667 320 320 281.813 320 234.667s-38.187-85.334-85.333-85.334zm190.72 64C415.573 124.373 344.96 53.76 256 43.947V0h-42.667v43.947C124.373 53.76 53.76 124.373 43.947 213.333H0V256h43.947c9.813 88.96 80.427 159.573 169.387 169.387v43.947H256v-43.947C344.96 415.573 415.573 344.96 425.387 256h43.947v-42.667h-43.947zM234.667 384c-82.453 0-149.333-66.88-149.333-149.333s66.88-149.333 149.333-149.333S384 152.213 384 234.667 317.12 384 234.667 384z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mgl-map>
  </client-only>
</template>

<script lang="ts">
  import { defineComponent, reactive, readonly, ref } from 'vue';
  import { useNuxtApp } from '#app';
  import mapboxgl from 'mapbox-gl';
  import type { PropType, SetupContext } from 'vue';
  import type { EventData, Map } from 'mapbox-gl';
  import type { Basemaps as BaseMaps } from '~/@types/map';
  import Geocoder from '@/components/map/_partials/Geocoder.vue';
  import Basemaps from '@/components/map/_partials/Basemaps.vue';

  export default defineComponent({
    components: {
      Geocoder,
      Basemaps,
    },
    props: {
      zoom: {
        type: Number as PropType<number>,
        required: true,
        default: 11,
      },
      center: {
        type: Array as PropType<number[]>,
        required: true,
        default: () => [73.8567, 18.5204],
      },
      loaded: {
        type: Boolean as PropType<boolean>,
        required: true,
        default: false,
      },
      styleChanged: {
        type: Boolean as PropType<boolean>,
        required: true,
        default: false,
      },
      tilesLoaded: {
        type: Boolean as PropType<boolean>,
        required: true,
        default: false,
      },
      viz: {
        type: Object as PropType<Record<string, boolean>>,
        required: false,
        default: () => ({
          isMarker: true,
          isCluster: false,
          isHeatmap: false,
        }),
      },
    },
    setup(props, { emit }: SetupContext) {
      const { $config } = useNuxtApp();
      const state = reactive({
        mapOptions: {
          accessToken: $config.mapToken,
          style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
          center: ref(props.center),
          zoom: ref(props.zoom),
          maxZoom: 22,
        },
        map: {
          bbox: [] as number[] | number[][],
        },
        mapboxgl,
        utils: {
          geocoder: {
            shown: false as boolean,
            disabled: false as boolean,
            data: {},
          },
          basemaps: {
            shown: false as boolean,
            data: {
              title: 'Basemaps',
              basemaps: [
                {
                  type: 'Streets',
                  enabled: false,
                  image: 'streets',
                  source: 'mapbox',
                  style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
                },
                {
                  type: 'Satellite',
                  enabled: false,
                  image: 'satellite',
                  source: 'mapbox',
                  style:
                    'mapbox://styles/mapbox/satellite-streets-v11?optimize=true',
                },
                {
                  type: 'Dark',
                  enabled: true,
                  image: 'dark',
                  source: 'mapbox',
                  style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
                },
                {
                  type: 'Terrain',
                  enabled: false,
                  image: 'terrain',
                  source: 'meteoblue',
                  style:
                    'https://maps-api.meteoblue.com/mapstyle/weathermap?lang=en&enableOpenlayersLicensing=true',
                },
              ],
            } as BaseMaps,
          },
          compass: {
            shown: false as boolean,
            data: {
              bearing: 0,
            },
          },
        },
      });
      let map = readonly({} as mapboxgl.Map);

      /**
       * This function syncs the loaded & style-changed
       * variables in parent components
       *
       * @param {Record<string, Map>} e - Payload when map is loaded
       * @param {Map} e.map - Mapbox GL Map object
       * @returns {void}
       */
      function mapLoaded(e: { map: Map }): void {
        map = e.map;
        state.map.bbox = map.getBounds().toArray();
        emit('map-loaded', e.map);
        emit('update:bounds', state.map.bbox);
        const events: string[] = [
          'style.load',
          'sourcedata',
          'sourcedataloading',
        ];
        events.forEach((event) => {
          // Sets map into loading state when tiles starts loading
          map.on(event, () => {
            // Sets map into loaded when tiles are loaded
            if (event === 'sourcedata' || event === 'sourcedataloading') {
              const waiting = () => {
                if (!map.areTilesLoaded()) {
                  emit('update:tiles-loaded', false);
                  setTimeout(waiting, 200);
                } else {
                  emit('update:tiles-loaded', true);
                }
              };
              waiting();
            }
            if (event === 'style.load') {
              /**
               * This is required because we want
               * to persist the layers on the map
               * even after the basemap is changed
               */
              const waiting = () => {
                if (!map.isStyleLoaded()) {
                  emit('update:style-changed', false);
                  setTimeout(waiting, 200);
                } else {
                  emit('update:style-changed', true);
                }
              };
              waiting();
            }
          });
        });
        /**
         * Watch the pitchend event
         * This is required to rotate svg
         *
         * @returns {void}
         */
        map.on('pitchend', () => {
          state.utils.compass.data.bearing = parseInt(
            map.getBearing().toFixed(),
            10,
          );
        });
        emit('update:loaded', true);
        emit('update:style-changed', true);
        emit('update:tiles-loaded', true);
      }
      /**
       * This function emits a click event to the
       * parent component
       *
       * @param {Record<string,EventData>} e - Event data
       * @param {EventData} e.mapboxEvent - Mapbox Event
       * @returns {void}
       */
      function mapClicked(e: { mapboxEvent: EventData }): void {
        emit('click', e.mapboxEvent);
      }

      /**
       * When the map is moved
       *
       * @param {Record<string, Map>} e - Payload when map is loaded
       * @param {Map} e.map - Mapbox GL Map object
       * @returns {void}
       */
      function mapMoved(e: { map: Map }): void {
        const coords = e.map.getCenter();
        state.map.bbox = map.getBounds().toArray();
        emit('update:center', [coords.lng, coords.lat]);
        emit('update:bounds', state.map.bbox);
      }
      /**
       * Updates the current map style
       *
       * @param {string} e - String of the new style
       * @returns {void} - Returns void
       */
      function updateBasemap(e: string): void {
        state.utils.basemaps.data.basemaps.forEach((basemap) => {
          if (basemap.style === e) {
            basemap.enabled = true;
          } else {
            basemap.enabled = false;
          }
        });
        map.setStyle(e);
      }
      /**
       * Zooms the map in by currentZoom + 1
       *
       * @returns {void}
       */
      function mapZoomIn(): void {
        if (map !== null) {
          const currentZoom = map.getZoom();
          map.zoomTo(currentZoom + 1);
        }
      }
      /**
       * Zooms the map out by currentZoom - 1
       *
       * @returns {void}
       */
      function mapZoomOut(): void {
        if (map !== null) {
          const currentZoom = map.getZoom();
          map.zoomTo(currentZoom - 1);
        }
      }
      /**
       * Eases the map to given pitch
       * and bearing
       *
       * @param {Record<string,number>} root0 - Pitch & Bearing
       * @param {number} root0.pitch - Pitch
       * @param {number} root0.bearing - Bearing
       * @returns {void}
       */
      function mapEaseTo({
        pitch,
        bearing,
      }: {
        pitch: number;
        bearing: number;
      }): void {
        map.easeTo({
          pitch,
          bearing,
        });
      }
      /**
       * Fly the map to the specific location
       *
       * @param {Record<string, number>} root0 - Lat, Lng & zoom of the location
       * @param {number} root0.lng – Lat
       * @param {number} root0.lat - Lng
       * @param {number} root0.zoom - Zoom
       * @returns {void}
       */
      function mapFlyTo({
        lng,
        lat,
        zoom,
      }: {
        lng: number;
        lat: number;
        zoom: number;
      }): void {
        map.flyTo({
          center: [lng, lat],
          zoom,
          speed: 3,
          curve: 1,
        });
      }
      /**
       * Toggles the tool enabled on the map
       *
       * @param {string} type - Toggle the tool type
       * @returns {void} void
       */
      function toggleTool(type: string): void {
        switch (type) {
          case 'geocoder':
            state.utils.geocoder.shown = !state.utils.geocoder.shown;
            break;
          case 'basemaps':
            state.utils.basemaps.shown = !state.utils.basemaps.shown;
            break;
          case 'compass':
            state.utils.compass.shown = !state.utils.compass.shown;
            state.utils.compass.data.bearing = 0;
            mapEaseTo({ pitch: 0, bearing: 0 });
            state.utils.compass.shown = false;
            break;
          case 'locate':
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                mapFlyTo({
                  lng: pos.coords.longitude,
                  lat: pos.coords.latitude,
                  zoom: 15,
                });
              });
            }
            break;
          default:
            break;
        }
      }

      return {
        state,
        map,
        mapLoaded,
        mapClicked,
        mapMoved,
        mapZoomIn,
        mapZoomOut,
        mapFlyTo,
        toggleTool,
        updateBasemap,
      };
    },
  });
</script>
