const features = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_SELECTED_FEATURE':
      return { 
        ...state, 
        [action.feature.properties.id]: action.feature
      }
    case 'LOAD_FEATURES_SUCCESS':
      return {
        ...state,
        ...action.features.reduce((acc, curr) => ({
          ...acc,
          [curr.properties.id]: curr
        }), {})
      }
    case 'REMOVE_SELECTED_FEATURE':
      return Object.keys(state)
        .filter((id) => id !== action.feature.properties.id)
        .reduce((acc, curr) => ({ ...acc, [curr]: state[curr] }), {});
    default:
      return state;
  }
}

export default features;