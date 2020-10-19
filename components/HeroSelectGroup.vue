<template>
  <div class="hero-select-group">
    <div class="hero-select-group__label">
      <icon :icon="type" outlined />
      <h5>{{ label }}</h5>
    </div>

    <div class="hero-select-group__items">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Icon from '~/components/Icon.vue';

export default Vue.extend({
  components: {
    Icon
  },
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.hero-select-group {
  display: flex;
  flex-direction: column;
  margin: 9px;

  &__label {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;

    h5 {
      color: white;
      margin-bottom: 4px;
      position: relative;
      text-align: center;
      left: 3px;
      text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      margin-top: 0;
      margin-bottom: -4px;
      margin-left: 0;
      margin-right: 0;
      line-height: 34px;
    }

    @media (min-width: 1860px) {
      justify-content: flex-start;
      position: relative;
      left: 12px;
    }
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: -2px;

    .hero-select-item {
      margin: 2px;
    }
  }
}
</style>
