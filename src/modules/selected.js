import { combineReducers } from "../../../../Library/Caches/typescript/3.3/node_modules/redux";

const idLengths = {
  'counties': 5,
  'districts': 7,
  'schools': 12
}

/** Stores a list of feature IDs by region */
const createRegionListReducer = (region) => 
  (state = [], action) => {
    switch (action.type) {
      case 'ADD_SELECTED_FEATURE':
        return (action.region === region || region === 'all') ? 
          [ ...state, action.feature.properties.id ] : state;
      case 'LOAD_FEATURES_SUCCESS':
        return [
          ...state,
          ...action.features
            .filter(f => f.properties.id.length === idLengths[region])
            .map(f => f.properties.id)
        ]
      case 'REMOVE_SELECTED_FEATURE':
        return (action.region === region || region === 'all') ? 
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

export default combineReducers(listReducers)