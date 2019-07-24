import { combineReducers } from "redux";


/**
 * Reducer to track hovered feature
 */
const hovered = (state = null, action) => {
  switch(action.type) {
    case 'SET_HOVERED_FEATURE':
      return action.feature || null;
    default:
      return state;
  }
}

/**
 * Reducer to track active section
 * @param {*} state 
 * @param {*} action 
 */
const active = (state = 'map', action) => {
  switch(action.type) {
    case 'SET_ACTIVE_SECTION':
      return state !== action.sectionId ?
        action.sectionId : state
    default:
      return state
  }
}

export default combineReducers({
  hovered,
  active
})


/**
 * Gets the id of the hovered feature
 * @param {*} hovered 
 */
export const getHoveredId = (hovered) =>
  hovered && hovered.properties && hovered.properties.id ?
    hovered.properties.id : ''