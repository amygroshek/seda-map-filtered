import { combineReducers } from "redux";
import { DEFAULT_VIEWPORT } from '../constants/dataOptions';

/**
 * Stores state of current map viewport
 * e.g.
 *  {
 *    width: 400,
 *    height: 400,
 *    latitude: 37.5,
 *    longitude: -107.3,
 *    zoom: 5
 *  }
 * @param {*} state 
 * @param {*} action 
 */
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


/**
 * Stores state of coordinates used for tooltip
 * e.g.
 *  {
 *    x: 25,
 *    y: 75,
 *  }
 * @param {*} state 
 * @param {*} action 
 */
const coords = (state = { x: 0, y: 0 }, action) => {
  switch (action.type) {
    case 'SET_COORDS':
      return action.coords
    default:
      return state;
  }
}

/**
 * Maps the property ID to the feature ID
 * @param {array} features array of GeoJSON features
 * @returns {object} e.g. { "120156001683": 17645 }
 */
const getIdMapFromFeatures = (features) => {
  const idMap = features.reduce((obj, f) => {
    if(
      f && f.id &&
      f.properties && f.properties.id &&
      f.properties.id.length === 12
    ) {
      obj[f.properties.id] = f.id
    }
    return obj;
  }, {})
  return idMap
}

const containsNewFeatures = (idMap, features) => {
  for (let i = 0; i < features.length; i++) {
    if (features[i] && !idMap[features[i].properties.id]) {
      return true
    }
  }
  return false;
}

/**
 * Stores a map of the feature ID from the tileset to the
 * school ID.  This is required because school ids are
 * 12 characters long and too large to use as a feature ID
 * when converted to integers.  Instead, school features are
 * assigned a random number when the tileset generates, and
 * we use this map to find the tileset feature ID when given
 * a school ID.
 * e.g.
 *  {
 *    "120192003670": 17462,
 *    ...
 *  }
 * @param {*} state 
 * @param {*} action 
 */
const idMap = (state = {}, {type, features}) => {
  if (!features || !features.length || !features[0] || !type) { return state; }
  switch (type) {
    case 'ADD_TO_FEATURE_ID_MAP':
      if (!containsNewFeatures(state, features)) { return state }
      return {
        ...state,
        ...getIdMapFromFeatures(features)
      }
    default:
      return state
  }
}

const map = combineReducers({ coords, viewport, idMap })

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