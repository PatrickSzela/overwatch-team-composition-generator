<template>
  <m-select ref="select" v-model="innerSelected" v-bind="$attrs">
    <slot></slot>
  </m-select>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    selected: {
      type: String,
      required: true
    },
    disabled: Boolean
  },
  computed: {
    menu(): any {
      return this.select.menu_;
    },
    menuElement(): HTMLElement {
      return this.select.menuElement_;
    },
    select(): any {
      const select = this.$refs.select as any;
      return select.mdcSelect;
    },
    selectElement(): HTMLElement {
      return this.menu.items[this.select.selectedIndex];
    },
    innerSelected: {
      get(): string {
        return this.selected;
      },
      set(value: string) {
        this.$emit('change', value);
      }
    }
  },
  mounted() {
    this.removeEmptyListItem();
    this.updateLabel();
    this.handleDisable();
    this.responsiveMenu();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
    this.removeMenu();
  },
  updated() {
    this.updateLabel();
    this.handleDisable();
  },
  methods: {
    updateLabel() {
      // because <m-select> in some cases doesn't update currently selected item, do it manually
      this.select.selectedText_.textContent = this.menu.items[this.select.selectedIndex].textContent;
    },
    handleDisable() {
      // disable selects that have only one option (or less)
      this.select.disabled = this.disabled;
    },
    removeEmptyListItem() {
      // remove first list item that gets created automatically by <m-select>
      if (this.selectElement.parentNode) {
        this.selectElement.parentNode.removeChild(this.selectElement);
      }
    },
    removeMenu() {
      // menu aren't getting cleaned up automatically
      if (this.menuElement.parentNode) {
        this.menuElement.parentNode.removeChild(this.menuElement);
      }
    },
    responsiveMenu() {
      // resize menus to be min-width of their assigned selects. Also menu is places directly in body and there's no other way to access it. Very ugly.
      const observer = new MutationObserver(() => {
        if (this.menuElement.classList.contains('mdc-menu-surface--open')) {
          if (this.menu.open) {
            window.addEventListener('resize', this.onWindowResize, { once: true });
          }

          if (window.innerWidth < 840) {
            this.menuElement.style.right = this.menuElement.style.left;
            this.menuElement.style.minWidth = '';
          } else {
            this.menuElement.style.right = '';
            this.menuElement.style.minWidth = this.select.root_.getBoundingClientRect().width + 'px';
          }
        }
      });

      observer.observe(this.menuElement, {
        attributes: true,
        attributeFilter: ['class'],
        childList: false,
        characterData: false
      });
    },
    onWindowResize() {
      this.menu.open = false;
    }
  }
});
</script>
