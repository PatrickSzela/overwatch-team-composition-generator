<template>
  <div class="mdc-card__secondary">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
@import '@material/layout-grid/_mixins';

.mdc-card__secondary {
  padding: 16px;

  .mdc-card--layout-margin & {
    @each $size in map-keys($mdc-layout-grid-default-margin) {
      @include mdc-layout-grid-media-query_($size) {
        padding: map-get($mdc-layout-grid-default-margin, $size);
      }
    }
  }

  .mdc-card--layout-gutter & {
    @each $size in map-keys($mdc-layout-grid-default-gutter) {
      @include mdc-layout-grid-media-query_($size) {
        padding: map-get($mdc-layout-grid-default-gutter, $size);
      }
    }
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
}
</style>
