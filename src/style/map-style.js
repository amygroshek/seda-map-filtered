import { fromJS } from 'immutable';
import MAP_STYLE from './style.json';
import { getStopsForMetric } from '../constants/dataOptions';

const noDataFill = "#cccccc";

const getFillStyle = (dataProp) => {
  const metric = dataProp.split('_')[1];
  const stops = getStopsForMetric(metric).reduce(
    (acc, curr) => [ ...acc, ...curr ], []
  );
  return [ 
    "case",
    [ "has", dataProp ],
    [
      "interpolate",
      [ "linear" ],
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
      10
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

export const getChoroplethLayer = (region, dataProp) => fromJS({
  id: 'choropleth',
  source: 'composite',
  'source-layer': region,
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': getFillStyle(dataProp),
    'fill-opacity': 0.8
  }
});

export const getBackgroundChoroplethLayer = (region, dataProp) => fromJS({
  id: 'choropleth',
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
      6,
      0,
      12,
      0.666
    ]
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);