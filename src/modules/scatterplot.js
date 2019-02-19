import { combineReducers } from "redux";

export const data = (state = {}, action) => {
  switch(action.type) {
    case 'FETCH_VAR_SUCCESS':
      return {
        ...state,
        [action.region]: {
          ...state[action.region],
          ...action.data
        }
      }
    default:
      return state;
  }
}

export const isLoading = (state = false, action) => {
  switch(action.type) {
    case 'FETCH_VAR_REQUEST':
      return true
    case 'FETCH_VAR_SUCCESS':
      return false
    case 'FETCH_VAR_ERROR':
      return false
    default:
      return state
  }
}

export const errorMessage = (state = null, action) => {
  switch(action.type) {
    case 'FETCH_VAR_REQUEST':
      return null
    case 'FETCH_VAR_SUCCESS':
      return null
    case 'FETCH_VAR_ERROR':
      return action.errorMessage
    default:
      return state;
  }
}

export const scatterplot = combineReducers({
  data,
  isLoading,
  errorMessage
})

export default scatterplot;