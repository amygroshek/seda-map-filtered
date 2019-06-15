import { fromJS } from 'immutable';
import MAP_STYLE from './style.json';
import { getStopsForVarName } from '../modules/config.js';

const noDataFill = "#ccc";

const getFillStyle = (varName, region, colors) => {
  const stops = getStopsForVarName(varName, region, colors).reduce(
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

export const getCircleHighlightLayer = ({layerId, region}) => fromJS({
  id: layerId || (region + '-circle-highlight'),
  source: 'composite',
  'source-layer': region,
  type: 'circle',
  minzoom: 2,
  interactive: false,
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

export const getCircleLayer = ({layerId, region, dataProp, colors}) => fromJS({
  id: layerId || (region + '-circle'),
  source: 'composite',
  'source-layer': region,
  type: 'circle',
  minzoom: 2,
  interactive: true,
  paint: {
    'circle-color': getFillStyle(dataProp, region, colors),
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

export const getCircleCasingLayer = ({layerId, region}) => fromJS({
  id: layerId || (region + '-circle-casing'),
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


export const getChoroplethOutline = ({layerId, region}) => fromJS({
  "id": layerId || (region + '-choropleth-outline'),
  "source": 'composite',
  "source-layer": region,
  type: 'line',
  interactive: false,
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
export const getChoroplethOutlineCasing = ({layerId, region}) => fromJS({
  "id": layerId || (region + '-choropleth-outline-casing'),
  "source": 'composite',
  "source-layer": region,
  type: 'line',
  interactive: false,
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

export const getChoroplethLayer = ({layerId, region, dataProp, colors}) => fromJS({
  id: layerId || (region + '-choropleth'),
  source: 'composite',
  'source-layer': region,
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': getFillStyle(dataProp, region, colors),
    'fill-opacity': 0.9
  }
});

export const getBackgroundChoroplethLayer = ({layerId, region, dataProp, colors}) => fromJS({
  id: layerId || ('districts-bg-choropleth'),
  source: 'composite',
  'source-layer': 'districts',
  type: 'fill',
  minzoom: 2,
  interactive: false,
  paint: {
    'fill-color': getFillStyle(dataProp, region, colors),
    'fill-opacity': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      2,
      0.1,
      7,
      0.666,
      10,
      0.8
    ]
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);