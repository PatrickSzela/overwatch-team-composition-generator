<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo-overwatch" />
      <h4 class="header__logo-title">
        Team Composition Generator
      </h4>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixins.scss';

.header {
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  flex-shrink: 0;

  &__logo {
    &-overwatch {
      @include webp('~assets/images/ow_logo.png');
      padding-bottom: calc(80 / 460 * 100%);
      background-position: center;
      background-size: cover;
      margin-top: -10px;
      filter: drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.35));
    }

    &-title {
      @include text-primary-centered;
      text-shadow: 2px 4px 7px rgba(0, 0, 0, 0.5);
      margin-top: -5px;
      margin-bottom: $text-uppercase-margin-bottom;
      padding: 0 0.65em;
      user-select: none;
    }
  }
}
</style>
