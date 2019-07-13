import { loadFeaturesFromRoute, loadFeatureFromCoords } from "../utils/tilequery";
import { getRegionFromFeatureId } from "../modules/config";
import {FlyToInterpolator} from 'react-map-gl';
import * as ease from 'd3-ease';
import { addFeatureToRoute, removeFeatureFromRoute, updateRoute } from '../modules/router';
import { getStateViewport } from '../constants/statesFips';

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

/** Returns an action that pins the provided feature */
const addSelectedFeature = (feature, region) => ({
  type: 'ADD_SELECTED_FEATURE',
  feature,
  region,
})

/** Returns an action that sets the active location  */
export const setActiveLocation = (feature) => ({
  type: 'SET_ACTIVE_LOCATION',
  feature
})

/** Returns an action that clears the active location  */
export const clearActiveLocation = () => (
  { type: 'CLEAR_ACTIVE_LOCATION'}
)

/**
 * Returns an action to set the viewport to match the size 
 * of the element matching the provided provided class name
 * @param {*} className class of element to match dimensions for (default 'map')
 */
export const updateMapSize = (className = 'map') => {
  const el = document.getElementsByClassName(className)[0]
  const size = el ? 
    ({ width: el.clientWidth, height: el.clientHeight }) :
    ({ width: 400, height: 400 })
  return onViewportChange(size)
}

/**
 * Returns an action to map school ids
 * in the feature properties to the feature ids
 * @param {*} features 
 */
export const addToFeatureIdMap = (features) => ({
  type: 'ADD_TO_FEATURE_ID_MAP',
  features
})

/**
 * Returns an action to set the hovered feature for
 * a section.
 */
export const onHoverFeature = (feature, sectionId) => ({
  type: 'SET_HOVERED_FEATURE',
  feature,
  sectionId
});

/**
 * Returns an action to set the coordinates
 * for the map tooltip.
 * @param {object} coords e.g. { x: 10, y: 20 }
 */
export const onCoordsChange = (coords) => {
  return ({
    type: 'SET_COORDS',
    coords
  });
} 

/**
 * Returns an action to update the map viewport.
 * @param {object} viewport new viewport to go to
 * @param {boolean} transition true if the viewport should fly to the new viewport
 */
export const onViewportChange = (viewport, transition = false) => {
  if (transition) {
    viewport = { 
      ...viewport,
      transitionDuration: 3000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: ease.easeCubic
    }
  }
  return ({
    type: 'SET_MAP_VIEWPORT',
    viewport
  });
}

/**
 * Action to dispatch when receiving fetched scatterplot data
 * for a region.
 * @param {object} data 
 * @param {string} region 
 */
export const onScatterplotData = (data, region) => {
  return ({
    type: 'SCATTERPLOT_DATA_RECEIVED',
    region,
    data
  })
}

/**
 * Action to dispatch when receiving fetched scatterplot data
 * for a region.
 * @param {object} data 
 * @param {string} region 
 */
export const onScatterplotError = (e, sectionId) => {
  return ({
    type: 'SCATTERPLOT_ERROR',
    message: e.message || e,
    sectionId
  })
}

/**
 * Action to dispatch when all data vars for a scatterplot are loaded
 * @param {string} scatterplotId 
 */
export const onScatterplotLoaded = (scatterplotId) => ({
  type: 'SCATTERPLOT_LOADED',
  scatterplotId
});

/**
 * Action to dispatch when loading new vars on scatterplot
 * @param {string} scatterplotId 
 */
export const onScatterplotUnloaded = (scatterplotId) => ({
  type: 'SCATTERPLOT_UNLOADED',
  scatterplotId
});


/** THUNKS */

/**
 * Thunk that loads a provided location and updates route
 * @param {object} location object with id,lat,lon
 *  e.g. { id: 120156001683, lat: 27.83, lon: -82.61 } 
 */
export const loadLocation = (location) =>
  (dispatch) => {
    dispatch(onLoadFeaturesRequest([location]))
    loadFeatureFromCoords(location)
      .then(feature => {
        dispatch(onLoadFeaturesSuccess([feature]))
        dispatch(handleLocationActivation(feature))
      })
      .catch((error) => {
        dispatch(onLoadFeaturesError(error))
      })
    }

/**
 * Thunk that loads locations from the route pathname
 * @param {*} locations contains comma separated id,lat,lon,
 *  with multuple locations concatenated with a '+'.
 *  e.g. "12019,28.89,-81.17+12015,27.83,-82.61" 
 */
export const loadRouteLocations = (locations, region) => 
  (dispatch) => {
    dispatch(onLoadFeaturesRequest(locations))
    return loadFeaturesFromRoute(locations)
      .then(features => {
        let activeFeature = false;
        dispatch(onLoadFeaturesSuccess(features))
        dispatch(addToFeatureIdMap(features))
        features.forEach((f) => {
          const featureRegion = getRegionFromFeatureId(f.properties.id)
          dispatch(addSelectedFeature(f, featureRegion))
          if (!activeFeature && featureRegion === region) {
            dispatch(setActiveLocation(f))
            activeFeature = true;
          }
        })
      })
      .catch((error) => {
        dispatch(onLoadFeaturesError(error))
      })
  }

/**
 * Thunk that will navigate to the provided state bounding box
 * @param {string} abbr state abbreviation (e.g. "CA")
 */
export const navigateToStateByAbbr = (abbr) =>
  (dispatch, getState) => {
    const state = getState()
    const vp = getStateViewport(abbr, state.map.viewport);
    return dispatch(onViewportChange(vp, true))
  }

export const onDemographicChange = (demographic, ownProps) =>
  (dispatch) => {
    updateRoute(ownProps, { demographic })
  }

export const onHighlightedStateChange = (stateAbbr, ownProps) => (dispatch) => {
  updateRoute(ownProps, { 
    highlightedState: stateAbbr
  })
  dispatch(navigateToStateByAbbr(stateAbbr))
}

/**
 * Thunk that updates the region in the route
 * @param {*} region 
 */
export const onRegionChange = (region, ownProps) => 
  (dispatch) => {
    const routeUpdates = { region };
    // set demographic to 'all' if switching to schools
    if (region === 'schools') {
      routeUpdates['demographic'] = 'all';
    }
    updateRoute(ownProps, routeUpdates)
    dispatch(clearActiveLocation())
  }
    

/**
 * Thunk that adds a feature to the selected list
 * and updates the route
 * @param {object} feature  
 * @param {string} region e.g. "counties" 
 */
export const onPinFeature = (feature, region) => 
  (dispatch, getState) => {
    dispatch(addSelectedFeature(feature, region));
    addFeatureToRoute(dispatch, getState().router.location.pathname, feature)
  }

/**
 * Thunk that dispatches remove action and
 * removes the feature from the route.
 * @param {object} feature
 */
export const onRemoveSelectedFeature = (feature) => 
  (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_SELECTED_FEATURE',
      feature
    });
    removeFeatureFromRoute(dispatch, getState().router.location.pathname, feature)
  }

/**
 * Thunk that adds a selected feature to the collection and
 * activates the location.
 */
export const handleLocationActivation = (feature) => 
  (dispatch, getState) => {
    dispatch(
      addSelectedFeature(feature, getRegionFromFeatureId(feature.properties.id))
    )
    dispatch(setActiveLocation(feature))
    const pathname = getState().router.location.pathname;
    addFeatureToRoute(dispatch, pathname, feature)
  }

/** Thunk that dispatches the toggle help panel action */
export const toggleHelp = (forceOpen = false) => 
  (dispatch, getState) => {
    const state = getState();
    const helpOpen = state.ui.helpOpen;
    dispatch({
      type: 'TOGGLE_HELP',
      open: !helpOpen || forceOpen
    })
  }