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
    default:
      return state;
  }
}

export default features;

/**
 * Gets a property from a feature, returns null if not found
 * @param {Feature} feature GeoJSON feature
 * @param {string} propName property name to grab
 */
export const getFeatureProperty = (feature, propName) => {
  if (
    feature && 
    feature.properties && 
    feature.properties[propName]
  ) {
    return feature.properties[propName]
  }
  return null;
}