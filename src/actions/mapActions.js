import {FlyToInterpolator} from 'react-map-gl';
import * as ease from 'd3-ease';
import { addFeatureToRoute, removeFeatureFromRoute, updateRegionInRoute } from '../modules/router';
import { getStateViewport } from '../constants/statesFips';

/** ACTIONS */

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
export const onCoordsChange = (coords) => ({
  type: 'SET_COORDS',
  coords
});

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

/** THUNKS */

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

/**
 * Thunk that updates the region in the route
 * @param {*} region 
 */
export const onRegionChange = (region) => 
  (dispatch, getState) =>
    updateRegionInRoute(
      dispatch, 
      getState().router.location.pathname, 
      region
    )

/**
 * Thunk that adds a feature to the selected list
 * and updates the route
 * @param {object} feature  
 * @param {string} region e.g. "counties" 
 */
export const onSelectFeature = (feature, region) => 
  (dispatch, getState) => {
    dispatch({
      type: 'ADD_SELECTED_FEATURE',
      feature,
      region
    });
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