import { fromJS } from 'immutable';
import MAP_STYLE from './style.json';
import { getStopsForVarName, getRegionFromId } from '../modules/config.js';

const noDataFill = "#ccc";

const getFillStyle = (varName, region, colors) => {
  const stops = getStopsForVarName(varName, region, colors).reduce(
    (acc, curr) => [ ...acc, ...curr ], []
  );
  return [ 
    "case",
    [ '==', [ 'get', varName], 0], noDataFill,
    [ "has", varName ],
    [
      "interpolate", ["linear"],
      [ "get", varName ],
      ...stops
    ],
    noDataFill
  ]
}


const getCircleOpacity = (region) =>
  region === 'schools' ?
    [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      2, 0,
      3, 1
    ] : [
      "interpolate",
      ["exponential", 2],
      [ "zoom" ],
      8, 0,
      10, 1
    ]

const getCircleRadius = (region, offset = 0) =>
  region === 'schools' ? [
    "interpolate",
    [ "linear" ],
    [ "zoom" ],
    2, (2 + offset),
    4, (3 + offset),
    14, (12 + offset)
  ] : [
    "interpolate",
    [ "linear" ],
    [ "zoom" ],
    7, 0,
    8, (1 + offset),
    14, (12 + offset)
  ]

const getCircleMinZoom = (region) =>
  region === 'schools' ? 2 : 8

  
export const getCircleHighlightLayer = ({layerId, region}) => fromJS({
  id: layerId || (region + '-circle-highlight'),
  source: 'composite',
  'source-layer': 'schools',
  type: 'circle',
  minzoom: getCircleMinZoom(region),
  interactive: false,
  layout: {
    'visibility': region === 'schools' ? 'visible' : 'none'
  },
  paint: {
    'circle-color': [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      '#f00',
      ["string", ["feature-state", "selected"], 'rgba(0,0,0,0)']
    ],
    'circle-opacity': 1,
    'circle-radius': getCircleRadius(region),
    'circle-stroke-opacity': 1,
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



export const getCircleLayer = ({
  layerId, 
  region, 
  metric,
  demographic, 
  colors, 
  highlightedState
}) => {

  return fromJS({
    id: layerId || ('schools-circle'),
    source: 'composite',
    'source-layer': 'schools',
    type: 'circle',
    minzoom: getCircleMinZoom(region),
    interactive: region === 'schools',
    ...getHighlightedStateFilter(highlightedState),
    layout: {
      'visibility': demographic === 'all' ? 'visible' : 'none'
    },
    paint: {
      'circle-color': getFillStyle([demographic, metric].join('_'), 'schools', colors),
      'circle-opacity': getCircleOpacity(region),
      'circle-radius': getCircleRadius(region),
      'circle-stroke-opacity': getCircleOpacity(region),
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
  })
};

export const getCircleCasingLayer = ({layerId, demographic, region, highlightedState}) => fromJS({
  id: layerId || (region + '-circle-casing'),
  source: 'composite',
  'source-layer': 'schools',
  type: 'circle',
  minzoom: getCircleMinZoom(region),
  interactive: false,
  ...getHighlightedStateFilter(highlightedState),
  layout: {
    'visibility': demographic === 'all' ? 'visible' : 'none'
  },
  paint: {
    'circle-stroke-opacity': getCircleOpacity(region),
    'circle-radius': getCircleRadius(region, 1),
    'circle-color': 'transparent',
    'circle-stroke-color': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      6, '#ccc',
      8,
      '#5d5d5d',
    ],
    'circle-stroke-width': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      8,
      0.5,
      10,
      1,
      14,
      2
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

const getHighlightedStateFilter = (state) =>
  state && state !== 'us' ? 
    { filter: [ "==", ["get", "state"], state.toUpperCase()] } : 
    {}


const isIdInRegion = (id, region) => {
  if (!region || !id) { return false }
  return getRegionFromId(id) === region
}

export const getChoroplethLayer = ({
  layerId, 
  region, 
  metric,
  demographic, 
  colors, 
  highlightedState
}) => fromJS({
  id: layerId || (region + '-choropleth'),
  source: 'composite',
  'source-layer': region === 'schools' ? 'districts' : region,
  type: 'fill',
  interactive: region !== 'schools',
  ...getHighlightedStateFilter(highlightedState),
  paint: {
    'fill-color': getFillStyle([demographic, metric].join('_'), region, colors),
    'fill-opacity': region === 'schools' ? [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      3, 0,
      8, 0.5,
      10, 0.666,

    ] : 1
  }
});

export const getChoroplethLayers = (context) => {
  return [
    { 
      z: 1, 
      style: getChoroplethLayer(context), 
      hasFeatureId: (id) => isIdInRegion(id, context.region)
    },
    { z: 50, style: getChoroplethOutline(context) },
    { z: 50, style: getChoroplethOutlineCasing(context) }
  ]
}

export const getCircleLayers = (context) => {
  return [
    {
      z: 50, 
      style: getCircleLayer(context), 
      idMap: true,
      hasFeatureId: (id) => isIdInRegion(id, context.region)
    },
    { z: 50, style: getCircleCasingLayer(context) },
    { z: 50, style: getCircleHighlightLayer(context) }
  ]
}

export const defaultMapStyle = fromJS(MAP_STYLE);