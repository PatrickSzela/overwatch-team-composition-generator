<template>
  <nav class="hero-select">
    <slot></slot>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables';
@import '@material/layout-grid/_mixins';
@import '~/assets/scss/mixins.scss';

.hero-select {
  $hero-select: &;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  scroll-snap-type: x mandatory;
  @include scrollbar(&);

  &-group {
    scroll-snap-align: center;
    box-sizing: border-box;
  }

  @mixin scrollable($size) {
    overflow-x: scroll;
    margin: 0 -1 * map-get($mdc-layout-grid-default-margin, $size);

    #{$hero-select} {
      &-group {
        padding: map-get($mdc-layout-grid-default-gutter, $size) map-get($mdc-layout-grid-default-margin, $size);
        min-width: 100%;
      }
    }
  }

  @media (max-width: $max-width - 1) {
    justify-content: flex-start;
    @include scrollable('desktop');
  }

  @each $size in map-keys($mdc-layout-grid-columns) {
    @include mdc-layout-grid-media-query_($size) {
      @if $size != 'desktop' {
        @include scrollable($size);
      }
    }
  }
}
</style>
