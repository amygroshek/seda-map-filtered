const selected = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SELECTED_FEATURE':
      return [ ...state, action.feature ]
    case 'REMOVE_SELECTED_FEATURE':
      return state.filter(({ properties: id }) => 
        id !== action.feature.properties.id
      );
    default:
      return state;
  }
}

export default selected;