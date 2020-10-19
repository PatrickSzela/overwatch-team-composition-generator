<template>
  <div class="fullscreen-background" :class="classes">
    <div class="fullscreen-background__image" :style="styles"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    src: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    darken: Boolean,
    blur: Boolean
  },
  computed: {
    classes() {
      return {
        'fullscreen-background--blur': this.blur,
        'fullscreen-background--darken': this.darken
      };
    },
    styles() {
      return {
        backgroundColor: this.color,
        backgroundImage: `url(${this.src})`
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.fullscreen-background {
  $fullscreen-background: &;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  z-index: -1;
  pointer-events: none;

  &--darken,
  &--blur {
    &:after {
      content: ' ';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  &--darken:after {
    background: rgba(0, 0, 0, 0.25);
  }

  &--blur {
    transform: scale(1.05);
    #{$fullscreen-background}__image {
      filter: blur(5px);
    }
  }

  &__image {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  // &--blur:after {
  //   backdrop-filter: blur(4px);
  // }
}
</style>
