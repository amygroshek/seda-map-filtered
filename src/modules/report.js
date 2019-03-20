import { combineReducers } from "redux";

const createSectionReducer = (sectionId, defaultState) =>
  (state = defaultState, action) => {
    if (action.section !== sectionId) { return state; }
    switch(action.type) {
      case 'SET_REPORT_VAR':
      case 'SET_REPORT_HIGHLIGHT':
      default:
        return state
    }
  }

/**
 * Reducer for the socioeconomic section
 */
const socioeconomic = createSectionReducer('socioeconomic', {
  xVar: 'all_ses',
  yVar: 'all_avg',
  zVar: 'sz',
  highlight: '01',
});

/**
 * Reducer for the opportunity differences section
 */
const opportunity = createSectionReducer('opportunity', {
  xVar: 'np_avg',
  yVar: 'wb_avg',
  zVar: 'sz',
  highlight: '01',
});

/**
 * Reducer for the achievement section
 */
const achievement = createSectionReducer('achievement', {
  xVar: 'wb_ses',
  yVar: 'wb_avg',
  zVar: 'sz',
  highlight: '01',
});

export default combineReducers({
  socioeconomic,
  opportunity,
  achievement
})