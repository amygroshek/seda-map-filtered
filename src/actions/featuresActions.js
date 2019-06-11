import { loadFeaturesFromRoute, loadFeatureFromCoords } from "../utils/tilequery";
import { addFeatureToRoute } from '../modules/router';
import { addToFeatureIdMap } from "./mapActions";


/** ACTIONS */

/**
 * Returns an action to dispatch when a request
 * to load features has been made 
 * @param {*} locations 
 */
const onLoadFeaturesRequest = (locations) => ({
  type: 'LOAD_FEATURES_REQUEST',
  locations
});

/**
 * Returns an action to dispatch when features have 
 * loaded successfully.
 * @param {*} features 
 */
const onLoadFeaturesSuccess = (features) => ({
  type: 'LOAD_FEATURES_SUCCESS',
  features
})

/**
 * Returns an action to dispatch when there was an
 * error loading features
 */
const onLoadFeaturesError = (error) => ({
  type: 'LOAD_FEATURES_ERROR',
  error
})

/** THUNKS */

/**
 * Thunk that loads a provided location and updates route
 * @param {object} location object with id,lat,lon
 *  e.g. { id: 120156001683, lat: 27.83, lon: -82.61 } 
 */
export const loadLocation = (location) =>
  (dispatch, getState) => {
    const pathname = getState().router.location.pathname;
    dispatch(onLoadFeaturesRequest([location]))
    loadFeatureFromCoords(location)
      .then(feature => {
        dispatch(onLoadFeaturesSuccess([feature]))
        addFeatureToRoute(dispatch, pathname, feature)
      })
      .catch((error) => {
        console.error(error)
        dispatch(onLoadFeaturesError(error))
      })
    }

/**
 * Thunk that loads locations from the route pathname
 * @param {*} locations contains comma separated id,lat,lon,
 *  with multuple locations concatenated with a '+'.
 *  e.g. "12019,28.89,-81.17+12015,27.83,-82.61" 
 */
export const loadRouteLocations = (locations) => 
  (dispatch) => {
    dispatch(onLoadFeaturesRequest(locations))
    return loadFeaturesFromRoute(locations)
      .then(features => {
        dispatch(onLoadFeaturesSuccess(features))
        dispatch(addToFeatureIdMap(features))
      })
      .catch((error) => {
        console.error(error)
        dispatch(onLoadFeaturesError(error))
      })
  }
