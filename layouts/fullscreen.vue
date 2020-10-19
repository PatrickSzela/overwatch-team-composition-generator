<template>
  <div class="layout layout--fullscreen">
    <fullscreen-background :src="image" :color="color" darken blur></fullscreen-background>

    <nuxt />

    <browser-not-supported-snackbar></browser-not-supported-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BrowserNotSupportedSnackbar from '~/components/BrowserNotSupportedSnackbar.vue';
import FullscreenBackground from '~/components/FullscreenBackground.vue';
import maps, { Map } from '~/assets/maps';

// function isMap(map: string) {
//   return Object.prototype.hasOwnProperty.call(maps, map);
// }

export default Vue.extend({
  components: {
    BrowserNotSupportedSnackbar,
    FullscreenBackground
  },
  computed: {
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
    },
    image(): string {
      // eslint-disable-next-line no-undef
      if (Modernizr.webp) {
        return require('~/assets/maps/' + this.mapKey + '/background.jpg?webp');
      } else {
        return require('~/assets/maps/' + this.mapKey + '/background.jpg');
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
</style>
