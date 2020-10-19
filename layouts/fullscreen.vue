<template>
  <div class="layout layout--fullscreen">
    <fullscreen-background :src="image" :color="color" darken blur></fullscreen-background>

    <overwatch-spinner v-if="loadingState === loadingStates.Loading" class="map-spinner" light></overwatch-spinner>

    <nuxt />

    <browser-not-supported-snackbar></browser-not-supported-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BrowserNotSupportedSnackbar from '~/components/BrowserNotSupportedSnackbar.vue';
import FullscreenBackground from '~/components/FullscreenBackground.vue';
import OverwatchSpinner from '~/components/OverwatchSpinner.vue';
import maps, { Map } from '~/assets/maps';

export enum LoadingStates {
  Loading = 'loading',
  Failed = 'failed',
  Finished = 'finished'
}

// function isMap(map: string) {
//   return Object.prototype.hasOwnProperty.call(maps, map);
// }

export default Vue.extend({
  components: {
    BrowserNotSupportedSnackbar,
    FullscreenBackground,
    OverwatchSpinner
  },
  data() {
    return {
      background: new Image(),
      loadingState: LoadingStates.Finished,
      image: ''
    };
  },
  computed: {
    loadingStates() {
      return LoadingStates;
    },
    maps(): { [index: string]: Map } {
      return maps;
    },
    currentMap(): Map {
      return maps[this.mapKey];
    },
    mapKey() {
      return this.$store.state.map;
    },
    color(): string {
      return require('~/assets/maps/' + this.mapKey + '/background.jpg?lqip-colors')[0];
    }
  },
  watch: {
    mapKey: {
      handler(value: string) {
        if (!value) return;
        this.fetchBackground();

        // if (this.selectedTeamSlot) {
        //   this.selectedTeamSlot.hero = heroes[value];
        // }
      },
      immediate: true
    }
  },
  mounted() {
    this.background.onload = () => {
      this.loadingState = LoadingStates.Finished;
      this.image = this.background.src;
    };
    this.background.onerror = () => {
      this.loadingState = LoadingStates.Failed;
    };
  },
  methods: {
    fetchBackground() {
      this.loadingState = LoadingStates.Loading;
      // eslint-disable-next-line no-undef
      if (Modernizr.webp) {
        this.background.src = require('~/assets/maps/' + this.mapKey + '/background.jpg?webp');
      } else {
        this.background.src = require('~/assets/maps/' + this.mapKey + '/background.jpg');
      }
    }
  }
});
</script>

<style lang="scss">
// layout styles works weirdly (https://github.com/nuxt/nuxt.js/issues/3877) so just use BEM
// also when style is scoped stuff is not getting applied to contents of the page
// background and layout are already set in global.scss

@import '~assets/scss/variables';
@import '@material/layout-grid/mixins';

.page {
  display: flex;
  flex-direction: column;
  align-self: center;
  height: 100%;
  width: 100%;
  //max-width: $max-width;

  @each $size in map-keys($mdc-layout-grid-columns) {
    @include mdc-layout-grid-media-query_($size) {
      > *:not(.back-button) {
        padding: 0 map-get($mdc-layout-grid-default-margin, $size) map-get($mdc-layout-grid-default-gutter, $size);
      }

      > header {
        padding-top: map-get($mdc-layout-grid-default-margin, $size) !important;
      }
    }
  }

  > main {
    flex-grow: 1;
    flex-shrink: 0; // IE11 fix
    display: flex;
    flex-direction: column;
  }
}

.map-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  opacity: 0.2;
  z-index: -1;
}
</style>
