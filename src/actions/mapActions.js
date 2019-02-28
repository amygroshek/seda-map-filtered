import { push } from 'connected-react-router'
import { addFeatureToPathname, removeLocationFromPathname } from '../modules/router';

/**
 * Pushes a location to the route based on a feature
 * @param {*} dispatch 
 * @param {string} pathname
 * @param {object} feature 
 */
const addFeatureToRoute = (dispatch, pathname, feature) => {
  const newRoute = addFeatureToPathname(pathname, feature)
  dispatch(push(newRoute))
}

/**
 * Pushes a location to the route based on a feature
 * @param {*} dispatch 
 * @param {string} pathname
 * @param {object} feature 
 */
const removeFeatureFromRoute = (dispatch, pathname, feature) => {
  const newRoute = removeLocationFromPathname(pathname, feature.properties.id)
  dispatch(push(newRoute))
}

export const onHoverFeature = (feature) => ({
  type: 'SET_HOVERED_FEATURE',
  feature
});

export const onCoordsChange = (coords) => ({
  type: 'SET_COORDS',
  coords
});

export const onViewportChange = (viewport) => ({
  type: 'SET_MAP_VIEWPORT',
  viewport
});

export const onDemographicChange = (demographic) => ({
  type: 'SET_MAP_DEMOGRAPHIC',
  demographic
});

export const onMetricChange = (metric) => ({
  type: 'SET_MAP_METRIC',
  metric
});

export const onRegionChange = (region) => ({
  type: 'SET_MAP_REGION',
  region
});

export const onSelectFeature = (feature, region) => 
  (dispatch, getState) => {
    dispatch({
      type: 'ADD_SELECTED_FEATURE',
      feature,
      region
    });
    addFeatureToRoute(dispatch, getState().router.location.pathname, feature)
  }


export const onRemoveSelectedFeature = (feature, region) => 
  (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_SELECTED_FEATURE',
      feature,
      region
    });
    removeFeatureFromRoute(dispatch, getState().router.location.pathname, feature)
  }