import { combineReducers } from "redux";
import { DEFAULT_VIEWPORT } from '../constants/dataOptions';

const viewport = (state = null, action) => {
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



const coords = (state = { x: 0, y: 0 }, action) => {
  switch (action.type) {
    case 'SET_COORDS':
      return action.coords
    default:
      return state;
  }
}

const map = combineReducers({ coords, viewport })

export const getChoroplethProperty = (options) => {
  const { metric, demographic } = options;
  return demographic + '_' + metric;
}

export default map;


/**
 * Gets the viewport to use for the map based on the viewport
 * state and route parameters.
 * @param {*} vp 
 * @param {*} routeParams 
 * @returns {object} valid viewport object
 */
export const getMapViewport = (vp, routeParams) => {
  if (vp && vp.zoom && vp.latitude && vp.longitude) {
    // viewport is valid
    return vp;
  } else if (routeParams && routeParams.zoom && routeParams.lat && routeParams.lon) {
    // no valid viewport in store, use the one in the route
    return {
      latitude: parseFloat(routeParams.lat),
      longitude: parseFloat(routeParams.lon),
      zoom: parseFloat(routeParams.zoom),
      ...vp
    }
  }
  // no viewport in store or route, use default
  return {
    ...DEFAULT_VIEWPORT,
    ...vp
  }
}