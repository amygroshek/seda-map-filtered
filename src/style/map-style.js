import { fromJS } from 'immutable';
import MAP_STYLE from './style.json';
import { getStopsForMetric } from '../modules/config.js';


const noDataFill = "#cccccc";

const getFillStyle = (dataProp) => {
  const stops = getStopsForMetric(dataProp.split('_')[1]).reduce(
    (acc, curr) => [ ...acc, ...curr ], []
  );
  return [ 
    "case",
    [ "has", dataProp ],
    [
      "interpolate", ["linear"],
      [ "get", dataProp ],
      -9999, noDataFill,
      ...stops
    ],
    noDataFill
  ]
}

export const getDotLayer = (region, dataProp) => fromJS({
  id: 'dots',
  source: 'composite',
  'source-layer': region,
  type: 'circle',
  interactive: true,
  paint: {
    'circle-color': getFillStyle(dataProp),
    'circle-opacity': 0.8,
    'circle-radius': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      0,
      2,
      14,
      16
    ],
    'circle-stroke-color': '#dce0de',
    'circle-stroke-width': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      6,
      0,
      14,
      2
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
  interactive: true,
  paint: {
    'fill-color': getFillStyle(dataProp),
    'fill-opacity': [
      "interpolate",
      [ "linear" ],
      [ "zoom" ],
      4,
      0,
      12,
      0.666
    ]
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);