<template>
  <div class="icon" :class="{ 'icon--outlined': outlined }" :style="{ width: size, height: size }" v-bind="$attrs">
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
}
</style>
