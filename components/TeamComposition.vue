<template>
  <div class="team-composition">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/mixins.scss';

.team-composition {
  $team-composition: &;
  @include scrollbar(&);
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-bottom: 0 !important;
  flex-shrink: 0;

  &-group {
    scroll-snap-align: center;

    &:first-child {
      scroll-snap-align: end;
      padding-right: 16px;

      #{$team-composition}-group__label {
        right: 28px;
      }
    }

    &:last-child {
      scroll-snap-align: start;
      padding-left: 16px;

      #{$team-composition}-group__label {
        left: 28px;
      }
    }

    &__label {
      position: sticky;
    }
  }
}
</style>
