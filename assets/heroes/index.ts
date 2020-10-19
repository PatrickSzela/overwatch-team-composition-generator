export enum HeroTypes {
  Tank = 'tank',
  Damage = 'damage',
  Support = 'support'
}

export interface Hero {
  id: string;
  name: string;
  type: HeroTypes;
}

const heroesImported: __WebpackModuleApi.RequireContext = require.context('./', true, /\.json$/);
const heroes: { [index: string]: Hero } = {};
export const filteredHeroes: { [index in HeroTypes]: Hero } = Object.create(HeroTypes);

// heroesImported
//   .keys()
//   .forEach((key) => (heroes[key.replace('./', '').replace('/data.json', '')] = heroesImported(key) as Hero));

heroesImported.keys().forEach((key) => {
  const id = key.replace('./', '').replace('/data.json', '');
  heroes[id] = heroesImported(key) as Hero;
  heroes[id].id = id;
});

Object.keys(heroes).forEach((key) => {
  filteredHeroes[heroes[key].type] = {
    ...filteredHeroes[heroes[key].type],
    ...{ [key]: heroes[key] }
  };
});

export default heroes;
