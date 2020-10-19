<template>
  <label class="team-composition-item team-composition-item" :class="classes" @click="onClick">
    <input
      :id="value"
      v-model="innerChecked"
      type="radio"
      :value="value"
      class="team-composition-item__input"
      v-bind="$attrs"
    />

    <!-- <overwatch-spinner v-if="!hero" light></overwatch-spinner> -->
    <h1 v-if="!hero">?</h1>

    <div class="team-composition-item__background">
      <div class="team-composition-item__portrait" :style="{ backgroundImage: portrait }"></div>
    </div>

    <div class="team-composition-item__icons">
      <icon
        v-for="heroType in allowedTypes"
        :key="heroType"
        class="team-composition-item__icon"
        size="14px"
        :icon="heroType"
      />
    </div>

    <div
      class="team-composition-item__label-wrapper"
      :class="{ 'team-composition-item__label-wrapper--long': name.length >= 10 }"
    >
      <span class="team-composition-item__label">{{ name }}</span>
    </div>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
// import OverwatchSpinner from '~/components/OverwatchSpinner.vue';
import Icon from '~/components/Icon.vue';

export default Vue.extend({
  components: {
    // OverwatchSpinner,
    Icon
  },
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
    side: {
      type: String,
      default: 'left'
    },
    hero: {
      type: String,
      default: ''
    },
    allowedTypes: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    classes(): object {
      return {
        'team-composition-item--selected': this.innerChecked === this.value,
        'team-composition-item--right': this.side === 'right'
      };
    },
    portrait(): string {
      if (!this.hero) return '';
      return 'url(' + require('~/assets/heroes/' + this.hero + '/portrait-team.png?webp') + ')';
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
      this.innerChecked = this.value;
    }
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/scss/variables';
@import '@material/animation/functions';
@import '@material/typography/mixins';

$red: #c80013;
$blue: #27aae1;
$green: #00ff00;
$orange: #f89e1b;

@keyframes blinking {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
}

.team-composition-item {
  $team-composition-item: &;
  height: 80px;
  width: 100px;
  position: relative;
  cursor: pointer;

  h1 {
    color: white;
    position: absolute;
    top: 41%;
    left: 57%;
    margin: 0;
    z-index: 1;
    transform: skewX(15deg) translate(-50%, -50%);
    user-select: none;
    font-size: 3.5em !important;
    text-shadow: 0 0 3px rgba(black, 0.35);
  }

  &__input {
    display: none;
  }

  &__background {
    transform: skewX(-15deg);
    width: 100%;
    height: 100%;

    &::after {
      content: '';
      position: absolute;
      top: 105%;
      right: 0;
      left: 0;
      height: 4px;
      background-color: $orange;
      transition: opacity 75ms ease-out;
      z-index: 1;
      opacity: 0;
      filter: blur(0.5px);
      pointer-events: none;
    }
  }

  &__portrait {
    background-color: rgba($blue, 0.7);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 25px;
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
      background-position: center;
      position: absolute;
      top: -20px;
      right: -10px;
      bottom: 0;
      left: -12px;
    }
  }

  &__label-wrapper {
    @include mdc-typography(button);
    position: absolute;
    width: 100%;
    left: -7px;
    bottom: 0;
    white-space: nowrap;
    margin: 0;
    color: white;
    box-sizing: border-box;
    padding: 3px 8px 0px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 25px;
    user-select: none;
    // transform: scaleX(0.9);
    font-size: 0.85em;
    letter-spacing: -1px;
    z-index: 1;

    &--long {
      font-size: 0.775em;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(darken(desaturate($blue, 25), 20), 0.5);
      transform: skewX(-15deg);
      z-index: -1;
    }
    // &::before {
    //   content: '';
    //   position: absolute;
    //   top: 0;
    //   right: 0;
    //   bottom: 0;
    //   left: 0;
    //   border: solid 1px white;
    //   background: black;
    //   transform: skewX(-15deg);
    //   z-index: -1;
    //   border-radius: 4px;
    //   transition: background-color 75ms ease-in-out, box-shadow 75ms ease-in-out, border-color 75ms ease-in-out,
    //     transform 75ms ease-in-out;
    // }
  }

  &__label {
    transform: scaleX(0.95);
  }

  &__icons {
    display: flex;
    position: absolute;
    right: 8px;
    bottom: 30px;
    margin: 0 -4px;

    .icon {
      margin: 0 2px;
    }
  }

  .overwatch-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-42.5%, -90%);
    width: 36px;
    z-index: 1;
    opacity: 0.7;
  }

  &:hover:not(&--selected) {
    #{$team-composition-item} {
      &__background {
        &::after {
          opacity: 1;
        }
      }
    }
  }

  &--selected {
    #{$team-composition-item} {
      &__background {
        &::after {
          animation: blinking 1s infinite ease-out alternate-reverse;
        }
      }
    }
  }

  &--right {
    h1 {
      left: 53%;
    }

    #{$team-composition-item} {
      &__background {
        transform: skewX(15deg);
      }

      &__portrait {
        background-color: rgba($red, 0.7);
        &::after {
          transform: skewX(-15deg);
        }
      }

      &__label-wrapper {
        left: 7px;
        &::before {
          background-color: rgba(darken(desaturate($red, 25), 20), 0.5);
          transform: skewX(15deg);
        }
      }

      &__icons {
        left: 8px;
        right: auto;
      }
    }

    .overwatch-spinner {
      transform: translate(-57.5%, -90%);
    }
  }
}
</style>
