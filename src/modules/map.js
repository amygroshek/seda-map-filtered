import { combineReducers } from "redux";

const defaultOptions = {
  metric: 'avg',
  region: 'counties',
  demographic: 'all',
}

const options = (state = defaultOptions, action) => {
  switch (action.type) {
    case 'SET_MAP_REGION':
      return {
        ...state,
        region: action.region
      }
    case 'SET_MAP_DEMOGRAPHIC':
      return {
        ...state,
        demographic: action.demographic
      }
    case 'SET_MAP_METRIC':
      return {
        ...state,
        metric: action.metric
      }
    default:
      return state;
  }
}

const defaultViewport = {
  latitude: 38,
  longitude: -97,
  zoom: 3.5
}
const viewport = (state = defaultViewport, action) => {
  switch (action.type) {
    case 'SET_MAP_VIEWPORT':
      return {
        ...state,
        ...action.viewport
      }
    default:
      return state;
  }
}

const map = combineReducers({ viewport, options })

export const getChoroplethProperty = (options) => {
  const { metric, demographic } = options;
  return demographic + '_' + metric;
}

export default map;