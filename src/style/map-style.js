import { fromJS } from 'immutable';
import MAP_STYLE from './style.json';
import { getStopsForVarName } from '../modules/config.js';


const noDataFill = "#ccc";

const getFillStyle = (varName) => {
  const stops = getStopsForVarName(varName).reduce(
    (acc, curr) => [ ...acc, ...curr ], []
  );
  return [ 
    "case",
    [ "has", varName ],
    [
      "interpolate", ["linear"],
      [ "get", varName ],
      -9999, noDataFill,
      ...stops
    ],
    noDataFill
  ]
}

export const getDotHighlightLayer = (region, dataProp) => fromJS({
  id: 'dots-highlight',
  source: 'composite',
  'source-layer': region,
  type: 'circle',
  minzoom: 2,
  interactive: true,
  paint: {
    'circle-color': [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      '#f00',
      ["string", ["feature-state", "selected"], 'rgba(0,0,0,0)']
    ],
    'circle-radius': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      2,
      2,
      4,
      5,
      14,
      16
    ],
    'circle-stroke-color': [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      '#fff',
      ["boolean", ["feature-state", "selected"], false],
      '#fff',
      'rgba(0,0,0,0)'
    ],
    'circle-stroke-width': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      4,
      0,
      6,
      1,
      14,
      4
    ]
  }
})

export const getDotLayer = (region, dataProp) => fromJS({
  id: 'dots',
  source: 'composite',
  'source-layer': region,
  type: 'circle',
  minzoom: 2,
  interactive: true,
  paint: {
    'circle-color': getFillStyle(dataProp),
    'circle-opacity': 1,
    'circle-radius': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      2,
      1,
      4,
      2,
      14,
      12
    ],
    'circle-stroke-color': '#fff',
    'circle-stroke-width': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      4,
      0,
      6,
      0.5,
      14,
      2
    ]
  }
});

export const getDotCasingLayer = (region, dataProp) => fromJS({
  id: 'dots-casing',
  source: 'composite',
  'source-layer': region,
  type: 'circle',
  minzoom: 2,
  interactive: false,
  paint: {
    'circle-stroke-opacity': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      2,
      0,
      6,
      0,
      7,
      0.333
    ],
    'circle-radius': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      2,
      0,
      4,
      2,
      14,
      12
    ],
    'circle-color': 'transparent',
    'circle-stroke-color': '#031232',
    'circle-stroke-width': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      4,
      0,
      6,
      1.5,
      14,
      3
    ]
  }
});


export const getChoroplethOutline = (region) => fromJS({
  "id": "choropleth-outline",
  "source": 'composite',
  "source-layer": region,
  type: 'line',
  paint: {
    'line-color': ["case",
      ["boolean", ["feature-state", "hover"], false],
      '#f00',
      ["string", ["feature-state", "selected"], 'rgba(0,0,0,0)']
    ],
    "line-width": ["case",
      [ "any",
        [ "boolean", ["feature-state", "hover"], false ],
        [ "to-boolean", ["feature-state", "selected"] ]
      ],
      2.5,
      0
    ],
  }
})

/**
 * Gets the mapboxgl layer for the choropleth outline
 * @param {string} region 
 */
export const getChoroplethOutlineCasing = (region) => fromJS({
  "id": "choropleth-outline-casing",
  "source": 'composite',
  "source-layer": region,
  type: 'line',
  paint: {
    'line-color': '#fff',
    "line-opacity": ["case",
      [ "any",
        [ "boolean", ["feature-state", "hover"], false ],
        [ "to-boolean", ["feature-state", "selected"] ]
      ],
      1,
      0
    ],
    "line-width": ["case",
      [ "any",
        [ "boolean", ["feature-state", "hover"], false ],
        [ "to-boolean", ["feature-state", "selected"] ]
      ],
      1.5,
      0
    ],
    'line-gap-width': ["case",
      [ "any",
        [ "boolean", ["feature-state", "hover"], false ],
        [ "to-boolean", ["feature-state", "selected"] ]
      ],
      2.5,
      0
    ]
  }
})

export const getChoroplethLayer = (region, dataProp) => fromJS({
  id: 'choropleth',
  source: 'composite',
  'source-layer': region,
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': getFillStyle(dataProp),
    'fill-opacity': 0.9
  }
});

export const getBackgroundChoroplethLayer = (region, dataProp) => fromJS({
  id: 'choropleth-bg',
  source: 'composite',
  'source-layer': region,
  type: 'fill',
  minzoom: 2,
  interactive: true,
  paint: {
    'fill-color': getFillStyle(dataProp),
    'fill-opacity': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      2,
      0.1,
      10,
      0.666
    ]
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);