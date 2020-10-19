export interface MapPoint {
  name: string;
  src: string;
}

export enum MapTypes {
  Assault = 'assault',
  Control = 'control',
  Hybrid = 'hybrid',
  Escord = 'escort'
}

export interface Map {
  id: string;
  name: string;
  type: MapTypes;
  points?: { [index: string]: MapPoint };
}

const mapsImported: __WebpackModuleApi.RequireContext = require.context('./', true, /\.json$/);
const maps: { [index: string]: Map } = {};
export const filteredMaps: { [index in MapTypes]: Map } = Object.create(MapTypes);

mapsImported.keys().forEach((key) => {
  const id = key.replace('./', '').replace('/data.json', '');
  maps[id] = mapsImported(key) as Map;
  maps[id].id = id;
});

Object.keys(maps).forEach((key) => {
  filteredMaps[maps[key].type] = {
    ...filteredMaps[maps[key].type],
    ...{ [key]: maps[key] }
  };
});

export default maps;
