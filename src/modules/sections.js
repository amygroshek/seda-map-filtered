import { combineReducers } from "redux";
import { SECTIONS } from '../constants/dataOptions';

/**
 * Get the reducer for storing the hovered feature in each section
 * @param {*} sectionId 
 */
const getSectionHoveredReducer = (sectionId) =>
  (state = null, action) => {
    if (action.sectionId !== sectionId) {
      return state;
    }
    switch(action.type) {
      case 'SET_HOVERED_FEATURE':
        return action.feature || null;
      default:
        return state;
    }
  }

/**
 * Updates the metric part of a variable string
 * @param {*} varName 
 * @param {*} newMetric 
 */
const updateVarMetric = (varName, newMetric) =>
  varName.split('_')[0] + '_' + newMetric

/**
 * Updates the demographic part of a variable string
 * @param {*} varName 
 * @param {*} newDemographic 
 */
const updateVarDemographic = (varName, newDemographic) =>
  newDemographic + '_' + varName.split('_')[1]

/**
 * Gets the updated xVar and yVar for a section when an option is updated
 * @param {string} sectionId the section to retrieve updated vars for
 * @param {string} optionId the option to change
 * @param {string} value the new value for the option
 * @param {object} state { xVar, yVar } 
 */
const getUpdatedVarsForSection = (sectionId, optionId, value, state) => {
  switch (sectionId) {
    case 'map':
      return getUpdatedSocioeconomicVars(optionId, value, state)
    case 'socioeconomic':
      return getUpdatedSocioeconomicVars(optionId, value, state)
    case 'opportunity':
      return getUpdatedOpportunityVars(optionId, value, state)
    case 'achievement':
      return getUpdatedAchievementVars(optionId, value, state)
    default:
      return getUpdatedSocioeconomicVars(optionId, value, state)
  }
}

/**
 * Gets the vars reducer for a given `sectionId`
 * @param {*} sectionId 
 */
const getSectionVarsReducer = (sectionId) =>
  (state = SECTIONS[sectionId], action) => {
    if (action.sectionId !== sectionId) { return state; }
    switch(action.type) {
      case 'SET_REPORT_VARS':
        return {
          ...state,
          ...getUpdatedVarsForSection(
            sectionId, 
            action.optionId, 
            action.value, 
            state
          )
        }
      default:
        return state
    }
  }

/**
 * Get updated var state on option change for socioeconomic conditions section
 * @param {*} optionId 
 * @param {*} value 
 * @param {object} state { xVar, yVar } 
 */
const getUpdatedSocioeconomicVars = (optionId, value, { xVar, yVar }) => {
  switch(optionId) {
    case 'demographic':
      return {
        xVar: updateVarDemographic(xVar, value),
        yVar: updateVarDemographic(yVar, value)
      }
    case 'metric':
      return {
        yVar: updateVarMetric(yVar, value)
      }
    default:
      return {}
  }
}

/**
 * Get updated var state on option change for opportunity differences section
 * @param {string} optionId 
 * @param {string} value
 * @param {object} state { xVar, yVar } 
 */
const getUpdatedOpportunityVars = (optionId, value, { xVar, yVar }) => {
  switch(optionId) {
    case 'subgroupX':
      return {
        xVar: updateVarDemographic(xVar, value),
      }
    case 'subgroupY':
      return {
        yVar: updateVarDemographic(yVar, value),
      }
    case 'metric':
      return {
        xVar: updateVarMetric(xVar, value),
        yVar: updateVarMetric(yVar, value)
      }
    default:
      return {}
  }
}

/**
 * Get updated var state on option change for achievement gaps section
 * @param {string} optionId 
 * @param {string} value
 * @param {object} state { xVar, yVar } 
 */
const getUpdatedAchievementVars = (optionId, value, { xVar, yVar }) => {
  switch(optionId) {
    case 'gap':
      return {
        xVar: updateVarDemographic(xVar, value),
        yVar: updateVarDemographic(yVar, value)
      }
    case 'secondary':
      return {
        xVar: updateVarMetric(yVar, value)
      }
    default:
      return {}
  }
}

const reducers = Object.keys(SECTIONS).reduce(
  (obj, key) => {
    obj[key] = combineReducers({
      vars: getSectionVarsReducer(key),
      hovered: getSectionHoveredReducer(key)
    })
    return obj
  }, {}
);

export default combineReducers(reducers)