
import { getStateSelectOptions } from '../constants/statesFips';
import { getMetrics, getRegions, getDemographics, getGaps } from './config';
import { getDemographicIdFromVarName, getMetricIdFromVarName } from './config';
import { getLang } from '../constants/lang'

export const getAllMetricsControl = (metric, id = 'metric', label = 'Data Metric') => ({
  id,
  label,
  value: metric,
  hint: '',
  options: getMetrics()
})

export const getMetricControl = (metric, id = 'metric', label = 'Data Metric') => ({
  id,
  label,
  value: metric,
  hint: '',
  options: getMetrics()
    .filter(m => ['avg', 'grd', 'coh'].indexOf(m.id) > -1)
})

export const getSecondaryMetricControl = (metric, id = 'metric') => ({
  id,
  label: 'Data Metric',
  value: metric,
  hint: '',
  options: getMetrics()
    .filter(m => ['ses', 'seg'].indexOf(m.id) > -1)
})

export const getRegionControl = (region, id = 'region') => ({
  id,
  label: 'Region',
  value: region,
  options: getRegions(),
  hint: '',
})

export const getAllDemographicsControl = (
  demographic, 
  id = 'demographic', 
  label = 'Demographics'
) => ({
  id,
  label,
  value: demographic,
  // filter free lunch program
  options: getDemographics(),
  hint: '',
  formatter: (option) => option.label + ' students'
})

export const getDemographicControl = (
  demographic, 
  id = 'demographic', 
  label = 'Demographics'
) => ({
  id,
  label,
  value: demographic,
  // filter free lunch program
  options: getDemographics().filter(d => d.id !== 'frl'),
  hint: '',
  formatter: (option) => option.label + ' students'
})

export const getDemographicGapControl = (
  value, 
  id = 'demographic', 
  label = 'Demographics'
) => ({
  id,
  label,
  value,
  options: [
    ...getDemographics().filter(d => d.id !== 'frl'), 
    ...getGaps()
  ],
  hint: '',
  formatter: (option) => option.label + (
    value.length === 1 || value === 'all' ? ' students' : ''
  )
})

export const getHighlightControl = (highlight) => ({
  id: 'highlight',
  label: 'Highlight',
  value: highlight ? highlight : 'us',
  options: [
    {
      id: 'us',
      label: 'U.S.'
    },
    ...getStateSelectOptions()
  ]
})

export const getGapControl = (gap) => ({
  id: 'gap',
  label: 'Gap Type',
  value: gap,
  options: getGaps()
})

/**
 * Gets an array of controls for the section
 * @param {string} region 
 * @param {object} vars 
 * @param {string} highlightedState 
 */
export const getOpportunityControls = (region, vars, highlightedState) => ({
  text: getLang('OPP_DIFF_CONTROL_TEXT'),
  controls: [
    getDemographicControl(
      getDemographicIdFromVarName(vars.xVar),
      'subgroupX',
      'Subgroup 1'
    ),
    getDemographicControl(
      getDemographicIdFromVarName(vars.yVar), 
      'subgroupY',
      'Subgroup 2'
    ),
    getRegionControl(region),
    getHighlightControl(highlightedState)
  ]
})

/**
 * Gets an array of controls for the section
 * @param {string} region 
 * @param {object} vars 
 * @param {string} highlightedState 
 */
export const getAchievementControls = (region, vars, highlightedState) => ({
  text: getLang('ACH_GAPS_CONTROL_TEXT'),
  controls: [
    getGapControl(
      getDemographicIdFromVarName(vars.xVar), 
      'gap',
      'Achievement Gap'
    ),
    getSecondaryMetricControl(
      getMetricIdFromVarName(vars.xVar),
      'secondary'
    ),
    getRegionControl(region),
    getHighlightControl(highlightedState)
  ]
})

/**
 * Gets the controls for the map section
 * @param {string} metric 
 * @param {string} demographic 
 * @param {string} region 
 * @param {string} highlightedState 
 */
export const getMapControls = 
  (region, vars, highlightedState) => {
    const controls = [
      getRegionControl(region),
      getHighlightControl(highlightedState)
    ];
    // add demographic control if not schools
    if (region !== 'schools') {
      const dem = getDemographicIdFromVarName(vars.xVar)
      controls.splice(0, 0, getDemographicGapControl(dem));
    }
    return {
      text: region === 'schools' ? 
        getLang('MAP_CONTROL_TEXT_SCHOOLS') :
        getLang('MAP_CONTROL_TEXT'),
      controls
    }
  }
