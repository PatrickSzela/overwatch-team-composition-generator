<template>
  <m-snackbar
    class="browser-not-supported-snackbar"
    :open="open"
    :has-dismiss="true"
    :timeout-ms="10000"
    label-text="You are using a browser which is not fully supported. Try Google Chrome or Mozilla Firefox!"
  ></m-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';

let openCached = false;

export default Vue.extend({
  data() {
    return {
      open: openCached
    };
  },
  mounted() {
    /* eslint-disable no-undef */
    openCached =
      !Modernizr.webp ||
      !Modernizr.webpalpha ||
      !Modernizr.webplossless ||
      !Modernizr.fullscreen ||
      !Modernizr.flexbox ||
      !Modernizr.cssgrid ||
      !Modernizr.cssfilters;

    this.open = openCached;
    /* eslint-enable no-undef */
  }
});
</script>

<style lang="scss" scoped>
.browser-not-supported-snackbar {
  bottom: initial;
  top: 0;
}
</style>
