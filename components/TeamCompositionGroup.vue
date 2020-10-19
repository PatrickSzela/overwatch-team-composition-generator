<template>
  <div class="team-composition-group" :class="{ 'team-composition-group--right': side === 'right' }">
    <span class="team-composition-group__label-wrapper">
      <m-button
        class="team-composition-group__fill-randomly"
        :ripple="false"
        title="Fill every unpinned slot with randomly selected set of heroes"
        @click="fillRandomly"
      >
        Fill randomly
      </m-button>

      <span class="team-composition-group__label" contenteditable="true"> Team {{ label }} </span>
    </span>

    <div class="team-composition-group__items">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true
    },
    side: {
      type: String,
      default: 'left'
    }
  },
  methods: {
    fillRandomly() {
      this.$emit('fillRandomly');
    }
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/scss/variables';
@import '@material/typography/mixins';

.team-composition-group {
  $team-composition-group: &;
  display: flex;
  flex-direction: column;
  margin: 9px 0;
  flex-shrink: 0;

  &__label-wrapper {
    @include mdc-typography(button);
    color: black;
    margin-bottom: 4px;
    position: relative;
    text-align: right;
    // left: 6px;
    // text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    margin-top: 0;
    position: relative;
    margin-bottom: 12px;
    font-size: 1.5em;
    letter-spacing: -1px;
    display: flex;
    justify-content: space-between;
    min-height: 35px;
    align-items: center;
    padding: 0 32px;
    margin-right: -12px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: white;
      z-index: -1;
    }

    &::before {
      right: 6px;
      left: 0px;
      transform: skewX(-15deg);
    }

    &::after {
      right: 50%;
    }
  }

  &__label {
    // transform: scaleX(0.9);
    display: flex;
    justify-content: center;
  }

  &__items {
    display: flex;
    // flex-wrap: wrap;
    // justify-content: center;
    // margin: -2px;
    // overflow-x: auto;
    padding: 0px 12px 6px;

    .team-composition-item {
      margin: 2px;
    }
  }

  &__fill-randomly {
    font-size: 0.6em;
    background-color: transparent !important;
    height: 23px;
    padding-left: 10px;
    padding-right: 10px;
    color: black !important;
    z-index: 1;
    position: relative;
    left: 12px;

    &::before {
      border-color: black;
    }

    &::after {
      background-color: transparent;
    }

    // /deep/.mdc-button__label {
    //   height: inherit;
    //   margin-bottom: 0;
    // }
  }

  &--right & {
    &__label-wrapper {
      text-align: left;
      margin-right: 0;
      margin-left: -12px;

      &::before {
        transform: skewX(15deg);
        right: 6px;
        left: 6px;
      }

      &::after {
        right: 0;
        left: 50%;
      }
    }

    &__fill-randomly {
      order: 1;
      left: -12px;
    }
  }

  @media (min-width: $max-width) {
    &:first-child {
      #{$team-composition-group}__items {
        padding-left: 36px;
      }
    }

    &:last-child {
      #{$team-composition-group}__items {
        padding-right: 36px;
      }
    }
  }
}
</style>
