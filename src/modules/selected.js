import { combineReducers } from "../../../../Library/Caches/typescript/3.3/node_modules/redux";

/** Stores a list of feature IDs by region */
const createRegionListReducer = (region) => 
  (state = [], action) => {
    switch (action.type) {
      case 'ADD_SELECTED_FEATURE':
        return (action.region === region || region === 'all') ? 
          [ ...state, action.feature.properties.id ] : state;
      case 'REMOVE_SELECTED_FEATURE':
        return (action.region === region || region === 'all') ? 
          state.filter(id => 
            id !== action.feature.properties.id
          ) : state;
      default:
        return state;
    }
  }

const features = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_SELECTED_FEATURE':
      return { 
        ...state, 
        [action.feature.properties.id]: action.feature
      }
    case 'REMOVE_SELECTED_FEATURE':
      return Object.keys(state)
        .filter((id) => id !== action.feature.properties.id)
        .reduce((acc, curr) => ({ ...acc, [curr]: state[curr] }), {});
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
  features,
  ...listReducers
})