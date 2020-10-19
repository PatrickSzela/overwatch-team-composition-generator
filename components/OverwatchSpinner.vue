<template>
  <div class="overwatch-spinner" :class="classes" v-bind="$attrs">
    <div class="overwatch-spinner__container">
      <div v-for="i in 7" :key="i" class="overwatch-spinner__hexagon"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    light: Boolean
  },
  computed: {
    classes() {
      return {
        'overwatch-spinner--light': this.light
      };
    }
  }
});
</script>

<style lang="scss" scoped>
// fading animation based on https://github.com/govcharenko/overwatch-loader
// works best if .overwatch-spinner has width divisible by 33
$time: 2.5;
$opacity: 1;
$count: 7;

@keyframes fade {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  7.14% {
    opacity: $opacity;
    transform: scale(1);
  }

  50% {
    opacity: $opacity;
    transform: scale(1);
  }
  64.14% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}

.overwatch-spinner {
  overflow: hidden;

  &__container {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    margin-bottom: calc(-1 * (2 * 100% / 18));
  }

  &__hexagon {
    width: calc(100% / 3);
    height: calc(100% / 3);
    background-image: url('~assets/svg/hexagon_dark.svg'); // inlining svg in CSS is weird
    position: absolute;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0;
    animation: fade infinite cubic-bezier(0.445, 0.05, 0.55, 0.95) #{$time}s;

    // fix blurriness in Firefox
    backface-visibility: hidden;
    //transform-style: preserve-3d;

    @for $i from 0 through $count - 1 {
      &:nth-child(#{$i + 1}) {
        animation-delay: #{$i * ($time/(2 * $count))}s;
      }
    }

    &:nth-child(1),
    &:nth-child(2) {
      top: 0;
    }

    &:nth-child(3),
    &:nth-child(6) {
      top: calc((100% / 3) * 5 / 6);
    }

    &:nth-child(4),
    &:nth-child(5) {
      top: calc((100% / 3) * 10 / 6);
    }

    &:nth-child(1),
    &:nth-child(5) {
      left: calc((100% / 3) * 0.5);
    }

    &:nth-child(2),
    &:nth-child(4) {
      right: calc((100% / 3) * 0.5);
    }

    &:nth-child(6) {
      left: 0;
    }

    &:nth-child(7) {
      left: calc(100% / 3);
      top: calc((100% / 3) * 5 / 6);
    }

    &:nth-child(3) {
      right: 0;
    }
  }

  &--light &__hexagon {
    background-image: url('~assets/svg/hexagon_light.svg');
  }
}
</style>
