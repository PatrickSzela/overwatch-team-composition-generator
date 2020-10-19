<template>
  <!-- client-only to fix flashing content when loaded because Material Components Vue doesn't support SSR -->
  <client-only>
    <div class="page">
      <transition v-if="!isScreenTooSmall && selectedHero" name="fade">
        <div
          v-if="loadingState === loadingStates.Finished"
          class="hero-background"
          :style="{ backgroundImage: 'url(' + fullBodyImage.src + ')' }"
        ></div>
      </transition>

      <overwatch-spinner v-if="!isScreenTooSmall && loadingState === loadingStates.Loading" light></overwatch-spinner>

      <team-composition>
        <team-composition-group
          v-for="(team, teamKey) in teams"
          :key="teamKey"
          :label="(teamKey + 1).toString()"
          :side="teamKey ? 'right' : 'left'"
          @fillRandomly="onFillRandomly(team)"
        >
          <team-composition-item
            v-for="(slot, slotKey) in team.slots"
            :key="`${teamKey}_${slotKey}`"
            v-model="selectedTeamSlotKey"
            :value="`${teamKey}_${slotKey}`"
            :hero="slot.hero ? slot.hero.id : ''"
            :name="slot.hero ? slot.hero.name : ''"
            :side="teamKey ? 'right' : 'left'"
            :allowed-types="slot.allowedTypes"
            :pinned="pinnedSlots.includes(slot)"
            @pinned.stop="onTeamCompositionItemPinned(slot)"
          >
          </team-composition-item>
        </team-composition-group>
      </team-composition>

      <header>
        <div class="header__title-container">
          <h1 class="typography--display">Select a hero</h1>

          <div class="header__row header__row--map">
            <span>Map:</span>

            <select-fixed id="mapSelect" v-model="selectedMapKey" name="map" enhanced>
              <m-list-item
                v-for="(map, key) in maps"
                :key="key"
                :data-value="key"
                :ripple="false"
                :selected="selectedMap.id === key"
              >
                <template slot="text">
                  {{ map.name }}
                </template>
              </m-list-item>
            </select-fixed>
          </div>

          <div class="header__row header__row--composition">
            <span>Composition:</span>

            <select-fixed id="mapSelect" v-model="selectedCompositionKey" name="composition" enhanced>
              <m-list-item
                v-for="(composition, key) in mainCompositions"
                :key="key"
                :data-value="key"
                :ripple="false"
                :selected="selectedCompositionKey === key"
              >
                <template slot="text">
                  {{ composition.name }}
                </template>
              </m-list-item>

              <m-list-item
                v-for="(composition, key) in secondaryCompositions"
                :key="key"
                :data-value="key"
                :ripple="false"
                :selected="selectedCompositionKey === key"
              >
                <template slot="text">
                  {{ composition.name }}
                </template>
              </m-list-item>
            </select-fixed>
          </div>
        </div>
      </header>

      <main>
        <hero-select>
          <hero-select-group
            v-for="(heroTypeKey, heroType) in heroTypes"
            :key="heroTypeKey"
            :label="heroType"
            :type="heroTypeKey"
          >
            <hero-select-item
              v-for="(hero, heroKey) in filteredHeroes[heroTypeKey]"
              :key="heroKey"
              v-model="selectedHeroKey"
              :value="heroKey"
              :name="hero.name"
              :disabled="!isHeroAllowed(hero) && heroKey !== selectedHeroKey"
              @dblclick.native="onHeroPicked"
            />
          </hero-select-group>
        </hero-select>

        <div class="buttons">
          <m-button
            class="mdc-button--secondary select-hero-button"
            :ripple="false"
            raised
            title="Choose currently selected hero and go to the next slot"
            :disabled="
              !isHeroAllowed(selectedHero) &&
              (selectedTeamSlot && selectedTeamSlot.hero ? selectedTeamSlot.hero.id !== selectedHeroKey : true)
            "
            @click="onHeroPicked"
          >
            Select
          </m-button>
        </div>
      </main>

      <the-footer />
    </div>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue';

import TheFooter from '~/components/TheFooter.vue';
import OverwatchSpinner from '~/components/OverwatchSpinner.vue';
import SelectFixed from '~/components/SelectFixed.vue';
import heroes, { filteredHeroes, Hero, HeroTypes } from '~/assets/heroes';
import compositions, { Composition, CompositionSlot } from '~/assets/compositions';

import HeroSelect from '~/components/HeroSelect.vue';
import HeroSelectGroup from '~/components/HeroSelectGroup.vue';
import HeroSelectItem from '~/components/HeroSelectItem.vue';

import TeamComposition from '~/components/TeamComposition.vue';
import TeamCompositionGroup from '~/components/TeamCompositionGroup.vue';
import TeamCompositionItem from '~/components/TeamCompositionItem.vue';

import maps from '~/assets/maps';

export enum LoadingStates {
  Loading = 'loading',
  Failed = 'failed',
  Finished = 'finished'
}

export default Vue.extend({
  components: {
    OverwatchSpinner,
    HeroSelect,
    HeroSelectGroup,
    HeroSelectItem,
    TeamComposition,
    TeamCompositionGroup,
    TeamCompositionItem,
    SelectFixed,
    TheFooter
  },
  data() {
    return {
      selectedHeroKey: Object.keys(heroes)[Math.floor(Math.random() * Object.keys(heroes).length)],
      selectedTeamSlotKey: '0_0',
      selectedCompositionKey: '2_2_2',
      loadingState: LoadingStates.Finished,
      fullBodyImage: new Image(),
      isScreenTooSmall: true,
      pinnedSlots: [] as Array<CompositionSlot>
    };
  },
  computed: {
    heroTypes() {
      return HeroTypes;
    },
    heroes() {
      return heroes;
    },
    filteredHeroes() {
      return filteredHeroes;
    },
    loadingStates() {
      return LoadingStates;
    },
    selectedTeam(): Composition {
      const indexes = this.selectedTeamSlotKey.split('_').map((item) => Number(item));

      return this.teams[indexes[0]];
    },
    selectedTeamSlot(): CompositionSlot {
      const indexes = this.selectedTeamSlotKey.split('_').map((item) => Number(item));

      return this.teams[indexes[0]].slots[indexes[1]];
    },
    selectedHero(): Hero {
      return this.heroes[this.selectedHeroKey];
    },
    // allowedHeroesInSelectedSlot(): typeof heroes {
    //   console.log('allowed');
    //   const heroesInSlots = {} as typeof heroes;

    //   this.selectedTeam.slots.forEach((slot) => {
    //     if (slot.hero) {
    //       heroesInSlots[slot.hero.id] = slot.hero;
    //     }
    //   });

    //   const filtered = Object.entries(heroes).filter((element) => {
    //     const heroInSlots = !Object.keys(heroesInSlots).includes(element[0]);
    //     const isHeroTypeAllowed = this.selectedTeamSlot
    //       ? this.selectedTeamSlot.allowedTypes.includes(element[1].type)
    //       : false;

    //     return heroInSlots && isHeroTypeAllowed;
    //   });

    //   return Object.fromEntries(filtered);
    // },
    selectedMap: {
      get() {
        return maps[this.$store.state.map];
      },
      set(value: string) {
        this.$store.commit('map', value);
      }
    },
    selectedMapKey: {
      get() {
        return this.$store.state.map;
      },
      set(value: string) {
        this.$store.commit('map', value);
      }
    },
    maps(): typeof maps {
      return maps;
    },
    allowedHeroesInSelectedSlot(): typeof heroes {
      return this.allowedHeroes(this.selectedTeam, this.selectedTeamSlot);
    },
    teams(): Array<Composition> {
      return [
        JSON.parse(JSON.stringify(this.selectedComposition)),
        JSON.parse(JSON.stringify(this.selectedComposition))
      ];
    },
    selectedComposition(): Composition {
      return compositions[this.selectedCompositionKey];
    },
    compositions() {
      return compositions;
    },
    mainCompositions() {
      return Object.fromEntries(Object.entries(compositions).filter((element) => !element[1].extends));
    },
    secondaryCompositions() {
      return Object.fromEntries(Object.entries(compositions).filter((element) => element[1].extends));
    }
  },
  watch: {
    selectedHeroKey: {
      handler(value: string) {
        if (!value) return;
        this.preloadFullBody(value);

        // if (this.selectedTeamSlot) {
        //   this.selectedTeamSlot.hero = heroes[value];
        // }
      },
      immediate: true
    },
    selectedTeamSlotKey: {
      handler(value: string) {
        if (!value) return;
        if (this.selectedTeamSlot && this.selectedTeamSlot.hero) {
          this.selectedHeroKey = this.selectedTeamSlot.hero.id;
          this.$forceUpdate();
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.fullBodyImage.onload = () => {
      this.loadingState = LoadingStates.Finished;
    };
    this.fullBodyImage.onerror = () => {
      this.loadingState = LoadingStates.Failed;
    };

    window.addEventListener('resize', this.onWindowResize);

    // won't work when called immediately
    setTimeout(() => {
      this.onWindowResize();

      if (this.selectedHeroKey) {
        this.preloadFullBody(this.selectedHeroKey);
      }
    }, 1);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    heroFullBody: (name: string) => {
      if (!name) return '';
      return 'url(' + require('~/assets/heroes/' + name + '/full-body.png?webp') + ')'; // converting to webp doesn't work after resizing (https://github.com/bazzite/nuxt-optimized-images/issues/2)
    },
    preloadFullBody(image: string) {
      if (this.isScreenTooSmall) return;

      this.loadingState = LoadingStates.Loading;
      this.fullBodyImage.src = require('assets/heroes/' + image + '/full-body.png?webp');
    },
    onWindowResize() {
      this.isScreenTooSmall = window.innerWidth < 1200;
    },
    onHeroPicked() {
      if (
        this.isHeroAllowed(this.selectedHero) ||
        (this.selectedTeamSlot && this.selectedTeamSlot.hero
          ? this.selectedTeamSlot.hero.id === this.selectedHeroKey
          : false)
      ) {
        this.selectedTeamSlot.hero = this.selectedHero;

        // this.pinnedSlots.push(this.selectedTeamSlot);

        const slot = this.selectedTeamSlotKey.split('_').map((element) => Number(element));

        slot[1] += 1;

        if (slot[1] > this.teams[slot[0]].slots.length - 1) {
          slot[1] = 0;
          slot[0] += 1;
        }

        if (slot[0] > this.teams.length - 1) {
          slot[0] = 0;
          slot[1] = 0;
        }

        this.selectedTeamSlotKey = `${slot[0]}_${slot[1]}`;

        this.$forceUpdate();
      }
    },
    allowedHeroes(team: Composition, slot: CompositionSlot): typeof heroes {
      const heroesInSlots = {} as typeof heroes;

      team.slots.forEach((slot) => {
        if (slot.hero) {
          heroesInSlots[slot.hero.id] = slot.hero;
        }
      });

      const filtered = Object.entries(heroes).filter((element) => {
        const heroInSlots = !Object.keys(heroesInSlots).includes(element[0]);
        const isHeroTypeAllowed = slot ? slot.allowedTypes.includes(element[1].type) : false;

        return heroInSlots && isHeroTypeAllowed;
      });

      return Object.fromEntries(filtered);
    },
    isHeroAllowed(hero: Hero): boolean {
      return Object.keys(this.allowedHeroesInSelectedSlot).includes(hero.id);
    },
    onFillRandomly(team: Composition) {
      const allSlotsFilled = !team.slots.filter((element) => !element.hero && !this.pinnedSlots.includes(element))
        .length;

      team.slots.forEach((element) => {
        if ((element.hero && !allSlotsFilled) || this.pinnedSlots.includes(element)) return;

        const allowedHeroes = this.allowedHeroes(team, element);
        const hero = heroes[Object.keys(allowedHeroes)[Math.floor(Math.random() * Object.keys(allowedHeroes).length)]];
        element.hero = hero;
      });

      const slot = this.selectedTeamSlotKey;
      this.selectedTeamSlotKey = '';
      this.selectedTeamSlotKey = slot;
      this.$forceUpdate();
    },
    onTeamCompositionItemPinned(slot: CompositionSlot) {
      if (!this.pinnedSlots.includes(slot)) {
        this.pinnedSlots.push(slot);
      } else {
        this.pinnedSlots = this.pinnedSlots.filter((item) => item !== slot);
      }
    }
  },
  layout: 'fullscreen'
});
</script>

<style lang="scss" scoped>
@import '~/assets/scss/variables';
@import '~/assets/scss/mixins';
@import '@material/layout-grid/_mixins';
@import '@material/select/mixins';
@import '@material/typography/mixins';

.page {
  position: relative;
  height: auto;
  flex: 1;
}

header {
  text-align: center;
  padding-top: 24px !important;

  .header__title-container {
    flex: 1;
    text-align: center;
    // position: absolute;
    @include mdc-layout-grid-media-query_('desktop') {
      text-align: left;
    }
  }

  .header__row {
    display: flex;
    align-items: baseline;
    margin-top: -6px;
    justify-content: center;

    @include mdc-layout-grid-media-query_('desktop') {
      justify-content: flex-start;
    }

    span {
      margin: 0 12px 0 0 !important;
      text-shadow: inherit;
      color: inherit;
    }
    // margin-top: -20px;

    &--map {
      color: $mdc-theme-secondary;
      text-shadow: 0 0 2px rgba(black, 0.25), 0 0 15px rgba($mdc-theme-secondary, 0.15);

      span {
        @include mdc-typography('headline5');
        @include headline-media-sizes('headline5');
        margin-left: 3px !important;
      }

      /deep/.mdc-select__selected-text {
        @include mdc-typography('headline5');
      }

      /deep/.mdc-select__selected-text,
      /deep/.mdc-select__dropdown-icon {
        @include headline-media-sizes('headline5');
      }

      /deep/.mdc-select__dropdown-icon {
        @include mdc-select-dd-arrow-svg-bg_($mdc-theme-secondary, 1);
      }

      /deep/.mdc-select--focused .mdc-select__dropdown-icon,
      /deep/.mdc-select:hover .mdc-select__dropdown-icon,
      /deep/.mdc-select:focus .mdc-select__dropdown-icon,
      /deep/.mdc-select:active .mdc-select__dropdown-icon {
        @include mdc-select-dd-arrow-svg-bg_(#ffffff, 1);
      }
    }

    &--composition {
      color: white;
      text-shadow: 0 0 2px rgba(black, 0.25), 0 0 15px rgba(white, 0.15);

      span {
        @include mdc-typography('headline1');
        @include headline-media-sizes('headline1');
        margin-left: -5px !important;
      }

      /deep/.mdc-select__selected-text {
        @include mdc-typography('headline1');
      }

      /deep/.mdc-select__selected-text,
      /deep/.mdc-select__dropdown-icon {
        @include headline-media-sizes('headline1');
      }
    }
  }

  h1 {
    margin-bottom: -0.25em !important;
  }
}

.hero-background {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%; // 100vh;
  background-position: center 15%;
  background-size: 200%;
  background-repeat: no-repeat;
  padding: 0;
  pointer-events: none;
  z-index: -1;
}

main {
  justify-content: flex-end;
  flex: 1;
}

.overwatch-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 97px;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.select-hero-button {
  font-size: 1.35em;
  height: 45px;
  padding-left: 32px;
  padding-right: 32px;
}

.mdc-select {
  background: transparent;
  margin: -8px;
  color: inherit;
  z-index: 1;

  // @media (max-width: mdc-layout-grid-breakpoint-max('tablet')) {
  //   margin-top: 0;
  //   margin-bottom: 0;

  //   &:first-child {
  //     margin-top: -8px;
  //   }

  //   &:last-child {
  //     margin-bottom: -8px;
  //   }
  // }

  &:hover,
  &:focus,
  &:active,
  &--focused {
    background: $mdc-theme-surface-secondary;

    /deep/ .mdc-select__selected-text {
      color: white !important;
    }
  }

  /deep/ &__selected-text {
    color: inherit !important;
    transform: none !important;
    margin: 0 0 $text-uppercase-margin-bottom 0 !important;
    min-width: initial;
    padding-right: 1.125em;
  }

  /deep/ &__dropdown-icon {
    @include mdc-select-dd-arrow-svg-bg_(#ffffff, 1);
    background-size: 100% !important;
    height: 0.35em;
    width: 0.35em;
    right: 16px;

    .mdc-select--focused &,
    .mdc-select:hover &,
    .mdc-select:focus &,
    .mdc-select:active & {
      @include mdc-select-dd-arrow-svg-bg_(#ffffff, 1);
    }
  }
}

.footer {
  padding: 0;
}
</style>
