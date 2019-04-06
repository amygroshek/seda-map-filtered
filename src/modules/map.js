import { combineReducers } from "redux";


const viewport = (state = null, action) => {
  switch (action.type) {
    case 'SET_MAP_VIEWPORT':
      return {
        ...state,
        ...action.viewport
      }
    default:
      return state;
  }
}

const highlightState = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_STATE_HIGHLIGHT':
      return action.on
    default:
      return state
  }
}

const usState = (state = null, action) => {
  switch (action.type) {
    case 'SET_US_STATE':
      return action.stateId
    default:
      return state
  }
}

const map = combineReducers({ viewport, usState, highlightState })

export const getChoroplethProperty = (options) => {
  const { metric, demographic } = options;
  return demographic + '_' + metric;
}

export default map;