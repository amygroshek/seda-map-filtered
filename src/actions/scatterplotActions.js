import { updateCurrentState } from './mapActions';
import { updateRoute } from '../modules/router';

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

export const getDispatchForSection = (dispatch, section, ownProps) =>
  (id, option) => {
    switch(id) {
      case 'highlight':
        if (option.value === 'us') {
          dispatch(updateCurrentState(null))
        } else {
          dispatch(updateCurrentState(option.id))
        }
        return;
      case 'region':
        return updateRoute(ownProps, { region: option.id })
      default:
        return dispatch({
          type: 'SET_REPORT_OPTION',
          section,
          id,
          value: option.id
        })
    }
  }