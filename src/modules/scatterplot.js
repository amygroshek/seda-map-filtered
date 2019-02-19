const initialState = {
  data: {},
  errorMessage: null,
  isLoading: false
}

export const scatterplot = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_VAR_REQUEST':
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_VAR_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: { 
          ...state.data,
          [action.region]: {
            ...state.data[action.region],
            ...action.data
          }          
        }
      }
    case 'FETCH_VAR_ERROR':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage
      }
    default:
      return state;
  }
}

export default scatterplot;