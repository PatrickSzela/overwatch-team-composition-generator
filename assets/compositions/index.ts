import heroes, { Hero, HeroTypes } from '../heroes';

export interface Composition {
  name: string;
  extends?: string;
  slots: Array<CompositionSlot>;
}

export interface CompositionSlot {
  allowedTypes: Array<HeroTypes>;
  hero?: Hero;
}

const compositionsImported: __WebpackModuleApi.RequireContext = require.context('./', true, /\.json$/);
const compositions: { [index: string]: Composition } = {};

compositionsImported.keys().forEach((key) => {
  const compKey = key.replace('./', '').replace('.json', '');
  compositions[compKey] = compositionsImported(key) as Composition;

  // convert hero string to actual hero object
  compositions[compKey].slots.forEach((element) => {
    if (Object.prototype.hasOwnProperty.call(element, 'hero') && element.hero) {
      element.hero = heroes[element.hero as any];
    } else {
      delete element.hero;
    }
  });
});

// merge array of heroes based on `extends` key
Object.keys(compositions).forEach((element) => {
  const composition = compositions[element];
  if (
    Object.prototype.hasOwnProperty.call(composition, 'extends') &&
    Object.prototype.hasOwnProperty.call(compositions, composition.extends as string)
  ) {
    const extended = compositions[composition.extends as string];

    composition.slots.forEach((element, index) => {
      Object.assign(element, extended.slots[index]);
    });

    Object.assign({}, extended, composition);
  }
});

export default compositions;
