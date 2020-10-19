<template>
  <div class="radio-button">
    <input :id="value" v-model="innerChecked" type="radio" v-bind="$attrs" :value="value" />
    <m-button :ripple="false" :raised="innerChecked === value" :tabindex="-1" @click="onClick">{{ label }}</m-button>
  </div>
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
    label: {
      type: String,
      required: true
    },
    checked: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
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
      this.innerChecked = this.value;
    }
  }
});
</script>

<style lang="scss" scoped>
// some styles are also set in global.scss
.radio-button {
  input {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
}
</style>
