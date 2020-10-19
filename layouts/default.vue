<template>
  <div class="layout layout--default">
    <the-header></the-header>
    <main>
      <nuxt />
    </main>
    <the-footer></the-footer>
    <browser-not-supported-snackbar></browser-not-supported-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '~/components/TheHeader.vue';
import TheFooter from '~/components/TheFooter.vue';
import BrowserNotSupportedSnackbar from '~/components/BrowserNotSupportedSnackbar.vue';

export default Vue.extend({
  components: {
    TheHeader,
    TheFooter,
    BrowserNotSupportedSnackbar
  }
});
</script>

<style lang="scss">
// layout styles works weirdly (https://github.com/nuxt/nuxt.js/issues/3877) so just use BEM
// also when style is scoped stuff is not getting applied to contents of the page

@import '~assets/scss/variables';

.layout--default {
  > main {
    flex-grow: 1; // push footer to the bottom
    flex-shrink: 0; // IE11 fix
    display: flex;
    flex-direction: column;
    max-width: $max-width;
    align-self: center;
    width: 100%;

    > *:first-child {
      padding-top: 0;
    }
  }
}
</style>
