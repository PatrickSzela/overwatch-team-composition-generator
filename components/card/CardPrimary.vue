<template>
  <div class="mdc-card__primary">
    <component :is="titleTag" v-if="title" class="mdc-card__title">{{ title }}</component>
    <component :is="subtitleTag" v-if="subtitle" class="mdc-card__subtitle">{{ subtitle }}</component>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    titleTag: {
      type: String,
      default: 'h2'
    },
    subtitleTag: {
      type: String,
      default: 'h6'
    }
  }
});
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
@import '@material/layout-grid/_mixins';
@import '@material/typography/_mixins';

.mdc-card {
  &__primary {
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

  &__title {
    margin-bottom: $text-uppercase-margin-bottom !important;

    &:not(:last-child) {
      margin-bottom: calc(#{$text-uppercase-margin-bottom} + 8px) !important;
    }
  }

  &__subtitle {
    @include mdc-typography('subtitle2');
    margin-top: 0;
    margin-bottom: $text-uppercase-margin-bottom !important;
  }
}
</style>
