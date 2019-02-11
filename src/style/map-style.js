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

export const defaultMapStyle = fromJS(MAP_STYLE);