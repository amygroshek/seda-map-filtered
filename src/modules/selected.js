import { combineReducers } from "redux";
import { MAP_REGION_TO_ID_LENGTH } from '../constants/dataOptions';

/** Stores a list of feature IDs by region */
const createRegionListReducer = (region) => 
  (state = [], action) => {
    switch (action.type) {
      case 'ADD_SELECTED_FEATURE':
        if(
          (action.region === region || region === 'all') &&
          state.indexOf(action.feature.properties.id) === -1
        ) {
          return state.length === 7 ?
            [ ...state.slice(1), action.feature.properties.id ] :
            [ ...state, action.feature.properties.id ]
        }
        return state   
      case 'LOAD_FEATURES_SUCCESS':
        return [
          ...state,
          ...action.features
            .filter(f =>
              (
                region === 'all' || 
                f.properties.id.length === MAP_REGION_TO_ID_LENGTH[region]
              ) &&
              state.indexOf(f.properties.id) === -1
            )
            .map(f => f.properties.id)
        ]
      case 'REMOVE_SELECTED_FEATURE':
        return (
          action.feature.properties.id.length === MAP_REGION_TO_ID_LENGTH[region] || 
          region === 'all'
        ) ? 
          state.filter(id => 
            id !== action.feature.properties.id
          ) : state;
      default:
        return state;
    }
  }

const listReducers = ['all', 'counties', 'districts', 'schools']
  .reduce((acc, curr) => {
    acc[curr] = createRegionListReducer(curr);
    return acc;
  }, {})

export default combineReducers({
  ...listReducers,
})
