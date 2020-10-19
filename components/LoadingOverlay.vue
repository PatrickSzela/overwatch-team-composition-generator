<template>
  <transition name="fade--dialog">
    <div v-if="loading" class="loading-overlay">
      <overwatch-spinner light></overwatch-spinner>
      <h6>Loading...</h6>

      <m-snackbar v-model="failed" label-text="Failed while loading a page."></m-snackbar>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import OverwatchSpinner from '~/components/OverwatchSpinner.vue';

export default Vue.extend({
  components: {
    OverwatchSpinner
  },
  data() {
    return {
      loading: false,
      enabled: false,
      failed: false,
      timeout: 0
    };
  },
  methods: {
    start() {
      this.enabled = true;
      this.timeout = window.setTimeout(() => {
        if (this.enabled) {
          this.loading = true;
        }
      }, 200);
    },
    finish() {
      this.enabled = false;
      this.loading = false;
      window.clearTimeout(this.timeout);
    },
    // no idea why but this method never gets called?
    fail() {
      this.failed = true;
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@material/layout-grid/_mixins';
@import '@material/typography/_mixins';

.loading-overlay {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: 14px 12px;
  user-select: none;
  background: $mdc-theme-surface-secondary;

  @each $size in map-keys($mdc-layout-grid-default-margin) {
    @include mdc-layout-grid-media-query_($size) {
      top: map-get($mdc-layout-grid-default-margin, $size);
    }
  }

  .overwatch-spinner {
    width: 33px;
    padding-right: 12px;
  }

  h6 {
    @include mdc-typography('button');
    color: white;
    font-size: 1.075em;
    margin-bottom: $text-uppercase-margin-bottom;
  }
}
</style>
