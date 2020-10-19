<template>
  <footer class="footer">
    <div class="footer__content">
      <p class="footer__blizzard">
        Some images are property of Blizzard Entertainment:<br />
        ®2016 Blizzard Entertainment, Inc. All rights reserved. Overwatch is a trademark or registered trademark of
        Blizzard Entertainment, Inc. in the U.S. and/or other countries.
      </p>

      <p class="footer__author">
        Website created by <a :href="authorUrl" target="”_blank”" rel="noopener">{{ authorName }}</a>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    authorName() {
      return process.env.author_name;
    },
    authorUrl() {
      return process.env.author_url;
    }
  }
});
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
@import '@material/typography/_mixins';
@import '@material/layout-grid/_mixins';
@import '@material/theme/_mixins';

.footer {
  @include mdc-theme-prop(color, 'text-primary-on-dark');
  background-color: $mdc-theme-surface-secondary;
  display: flex;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column; // TODO: broken in IE11 but at this point I'm not sure if I even care
    //max-width: $max-width;
    box-sizing: border-box;
    justify-content: space-between;
    flex: 1;

    @each $size in map-keys($mdc-layout-grid-columns) {
      @include mdc-layout-grid-media-query_($size) {
        padding: 24px map-get($mdc-layout-grid-default-margin, $size);
      }
    }
  }

  &__blizzard,
  &__author {
    @include mdc-typography('caption');
    font-size: 0.875em;
  }

  &__author {
    padding-top: 8px;
  }

  @include mdc-layout-grid-media-query_('desktop') {
    &__content {
      flex-direction: row;
      align-items: center;
    }

    &__author {
      text-align: right;
      flex-shrink: 0;
      padding-left: 32px;
      margin-bottom: 0;
      padding-top: 0;
    }
  }

  a {
    font-weight: 500;
  }
}
</style>
