import { combineReducers } from "redux";

const createSectionReducer = (sectionId, defaultState) =>
  (state = defaultState, action) => {
    if (action.section !== sectionId) { return state; }
    switch(action.type) {
      case 'SET_REPORT_VAR':
        return {
          ...state,

        }
      default:
        return state
    }
  }

const defaultSocioeconomic = {
  xVar: 'all_ses',
  yVar: 'all_avg',
  zVar: 'sz',
};

/**
 * Reducer for the socioeconomic section
 */
const socioeconomic = 
  (state = defaultSocioeconomic, action) => {
    switch(action.type) {
      case 'SET_REPORT_OPTION':
        return action.section === 'socioeconomic' ?
          {
            ...state,
            xVar: action.id === 'demographic' ? 
              action.value + '_' + state.xVar.split('_')[1] : 
              state.xVar,
            yVar: action.id === 'demographic' ? 
              action.value + '_' + state.xVar.split('_')[1] : 
              action.id === 'metric' ?
                state.yVar.split('_')[0] + '_' + action.value :
                state.yVar
          } : state
      default:
        return state
    }
  }



const defaultOpportunity = {
  xVar: 'np_avg',
  yVar: 'p_avg',
  zVar: 'sz',
};

/**
 * Reducer for the opportunity differences section
 */
const opportunity = 
  (state = defaultOpportunity, action) => {
    switch(action.type) {
      case 'SET_REPORT_OPTION':
        return action.section === 'opportunity' ?
          {
            ...state,
            xVar: action.id === 'subgroupX' ? 
              action.value + '_' + state.xVar.split('_')[1] : 
              action.id === 'metric' ?
                state.xVar.split('_')[0] + '_' + action.value :
                state.xVar,
            yVar: action.id === 'subgroupY' ? 
              action.value + '_' + state.xVar.split('_')[1] : 
              action.id === 'metric' ?
                state.yVar.split('_')[0] + '_' + action.value :
                state.yVar
          } : state
      default:
        return state
    }
  }

/**
 * Reducer for the achievement section
 */
const achievement = createSectionReducer('achievement', {
  xVar: 'wb_ses',
  yVar: 'wb_avg',
  zVar: 'sz',
});

export default combineReducers({
  socioeconomic,
  opportunity,
  achievement
})