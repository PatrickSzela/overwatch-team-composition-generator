<template>
  <div
    class="icon"
    :class="[`icon--${icon}`, { 'icon--outlined': outlined, 'icon--toggled-off': !toggled }]"
    :style="{ width: size, height: size }"
    :title="title"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <div class="icon__icon" :style="{ maskImage: url }"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '24px'
    },
    outlined: {
      type: Boolean,
      default: false
    },
    toggled: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    url(): string {
      return 'url(' + require('~/assets/images/' + this.icon + '.svg?url') + ')';

      // console.log(require('~/assets/images/' + this.type + '.svg'));
      // return require('~/assets/images/' + this.type + '.svg?url');
    }
  }
});
</script>

<style lang="scss" scoped>
.icon {
  $icon: &;
  position: relative;
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 0 1.5px rgba(0, 0, 0, 0.3));
  transition: opacity 75ms ease-in-out;

  &__icon {
    background-color: white;
    mask-size: 100%;
    mask-repeat: no-repeat;
    mask-position: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &--outlined {
    border-radius: 50%;
    border: solid 1px white;
    filter: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    background: rgba(black, 0.15);

    #{$icon}__icon {
      mask-size: 50%;
    }
  }

  &--toggled-off {
    opacity: 0.5;

    &:hover {
      opacity: 0.7;
    }
  }

  &--pin {
    #{$icon}__icon {
      transform: rotate(45deg);
    }
  }
}
</style>
