import { combineReducers } from "redux";

const feature = (state = null, action) => {
  switch (action.type) {
    case 'SET_HOVERED_FEATURE':
      return action.feature || null
    default:
      return state;
  }
}

const coords = (state = { x: 0, y: 0 }, action) => {
  switch (action.type) {
    case 'SET_COORDS':
      return action.coords
    default:
      return state;
  }
}

const hovered = combineReducers({
  feature, coords
})

export default hovered;