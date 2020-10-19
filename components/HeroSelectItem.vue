<template>
  <label class="hero-select-item" :class="classes" v-bind="$attrs" @click="onClick">
    <input
      :id="value"
      v-model="innerChecked"
      type="radio"
      :value="value"
      class="hero-select-item__input"
      v-bind="$attrs"
      :disabled="disabled"
    />

    <div class="hero-select-item__background">
      <div class="hero-select-item__portrait" :style="{ backgroundImage: portrait }"></div>
    </div>

    <h6 class="hero-select-item__label">{{ name }}</h6>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    checked: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes(): object {
      return {
        'hero-select-item--selected': this.innerChecked === this.value,
        'hero-select-item--disabled': this.disabled
      };
    },
    portrait(): string {
      return 'url(' + require('~/assets/heroes/' + this.value + '/portrait.png?webp') + ')';
    },
    innerChecked: {
      get(): string {
        return this.checked;
      },
      set(value: string) {
        this.$emit('change', value);
      }
    }
  },
  methods: {
    onClick() {
      // if (this.disabled) return;
      this.innerChecked = this.value;
    }
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/scss/variables';
@import '@material/animation/functions';

.hero-select-item {
  $hero-select-item: &;
  height: 70px;
  width: 48px;
  position: relative;
  cursor: pointer;
  transition: opacity 75ms ease-in-out;

  &__input {
    display: none;
  }

  &__background {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    transform: skewX(-15deg);
    width: 100%;
    height: 100%;
    transition: transform 75ms ease-out, background-color 75ms ease-out;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: inherit;
      transition: opacity 75ms ease-out, border-color 75ms ease-out, box-shadow, 35ms ease-out;
      z-index: 1;
    }

    &::before {
      border-top: solid 3px white;
      border-bottom: solid 3px white;
    }

    &::after {
      border: solid 3px white;
      opacity: 0;
      right: -1px;
      left: -1px;
      filter: blur(0.33px);
    }
  }

  &__portrait {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background-size: 0;
    z-index: -1;
    border-radius: inherit;

    &::after {
      content: '';
      transform: skewX(15deg);
      background-image: inherit;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: top center;
      position: absolute;
      top: -10px;
      right: -7px;
      bottom: 0;
      left: -8px;
    }
  }

  &__label {
    position: absolute;
    // left: -4px;
    bottom: 0;
    white-space: nowrap;
    margin: 0;
    left: calc(50% - 10px);
    transform: translate(-50%, 66%);
    color: white;
    text-shadow: 0 0 white;
    font-size: 1.25em;
    transition: opacity 75ms ease-in-out, color 75ms ease-in-out, transform 75ms ease-in-out,
      text-shadow 75ms ease-in-out;
    opacity: 0;
    box-sizing: border-box;
    padding: 3px 8px 0px 5px;
    display: flex;
    align-items: center;
    min-height: 25px;
    user-select: none;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border: solid 1px white;
      background: black;
      transform: skewX(-15deg);
      z-index: -1;
      border-radius: 4px;
      transition: background-color 75ms ease-in-out, box-shadow 75ms ease-in-out, border-color 75ms ease-in-out,
        transform 75ms ease-in-out;
    }
  }

  &:hover:not(&--selected) {
    z-index: 1;

    #{$hero-select-item} {
      &__background {
        transform: scale(1.15) skewX(-15deg);

        &::after {
          opacity: 1;
        }
      }

      &__label {
        opacity: 1;
      }
    }
  }

  &--selected {
    z-index: 2;

    #{$hero-select-item} {
      &__background {
        transform: scale(1.2) skewX(-15deg);
        background-color: $mdc-theme-secondary;

        &::before {
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: solid 3px white;
          z-index: 2;
        }

        &::after {
          border-color: white;
          box-shadow: inset 0 0 3px 1px rgba($mdc-theme-secondary, 0.5), 0 0 2px 3px white,
            0 0 8px 4px rgba($mdc-theme-secondary, 0.75), 0 0 50px 4px $mdc-theme-secondary;
          opacity: 1;
          filter: blur(1px);
        }
      }

      &__label {
        opacity: 1;
        color: $mdc-theme-on-surface;
        text-shadow: 0 0 $mdc-theme-on-surface;
        transform: translate(-53%, 80%);

        &::before {
          box-shadow: /*0 0 2.5px 3px white,*/ 0 0 5px /*2px*/ $mdc-theme-secondary; //  , 0 0 25px 2px rgba($mdc-theme-secondary, 0.5);
          background-color: white;
          //transform: scaleY(0.7) skewX(-10deg);
          border-color: transparent;
          filter: blur(1px);
        }
      }
    }
  }

  &--disabled:not(:hover) {
    opacity: 0.3;
    // cursor: default;
    // pointer-events: none;
  }
}
</style>
