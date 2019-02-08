import { fromJS } from 'immutable';
import MAP_STYLE from './style.json';
import { metrics } from '../constants/dataOptions';

// TODO: set to true when tilesets have been generated
// don't use the data prop until the tilesets are ready
const ready = false;

const getStopsForMetric = (metric) => {
  const match = metrics.find(m => m.id === metric);
  if (!match) { 
    throw new Error('No metric found matching ' + metric); 
  }
  return match.stops;
}

export const getChoroplethLayer = (region, dataProp) => fromJS({
  id: 'choropleth',
  source: 'composite',
  'source-layer': region,
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': {
      property: ready ? dataProp : 'mn_' + dataProp.split('_')[1],
      stops: getStopsForMetric(dataProp.split('_')[1])
    },
    'fill-opacity': 0.8
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);