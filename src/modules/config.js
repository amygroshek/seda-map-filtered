import { 
  METRICS, 
  DEMOGRAPHICS, 
  GAPS, 
  REGIONS, 
  SELECTED_COLORS, 
  CHOROPLETH_COLORS, 
  BASE_VARS,
  MAP_ID_LENGTH_TO_REGION,
  MAX_LOCATIONS
} from '../constants/dataOptions';

/**
 * Gets the configuration for base variables
 */
export const getBaseVars = () => BASE_VARS

/**
 * Gets the configuration for selected colors
 */
export const getSelectedColors = () => SELECTED_COLORS

/**
 * Gets the configuration for choropleth colors
 */
export const getChoroplethColors = () => CHOROPLETH_COLORS

export const getColorStep = (stepNum) => getChoroplethColors()[stepNum]

export const getColorForValue = () => {}

/**
 * Gets the configuation for regions
 */
export const getRegions = () => REGIONS

/**
 * Gets the configuration for demographics
 */
export const getDemographics = () => DEMOGRAPHICS

/**
 * Gets the configuration for metrics
 */
export const getMetrics = () => METRICS

/**
 * Gets the configuration for gaps
 */
export const getGaps = () => GAPS

/**
 * Gets the maximum number of locations
 */
export const getMaxLocations = () => MAX_LOCATIONS

/**
 * Gets the metric object corresponding to the provided ID
 */
export const getMetricById = (id) =>
  getMetrics().find(m => m.id === id)

/**
 * Gets the demographic object corresponding to the provided ID
 * @param {*} id 
 */
export const getDemographicById = (id) =>
  getDemographics().find(d => d.id === id)

/**
 * Gets the region object corresponding to the provided ID
 */
export const getRegionById = (id) =>
  getRegions().find(r => r.id === id)

/**
 * Gets the region object corresponding to the provided ID
 */
export const getGapById = (id) =>
  getGaps().find(r => r.id === id)

/**
 * Gets the label for the provided metric ID
 * @param {string} id 
 * @return {string}
 */
export const getMetricLabel = (id) => {
  let metric = getMetrics().find(d => d.id === id);
  if (!metric) {
    throw new Error('no metric found for ' + id)
  }
  return metric.label;
}

/**
 * Gets the label for the provided demographic ID
 * @param {string} id 
 * @returns {string}
 */
export const getDemographicLabel = (id) => {
  let dem = DEMOGRAPHICS.find(d => d.id === id);
  if (!dem) {
    dem = GAPS.find(d => d.id === id)
  }
  if (!dem) {
    throw new Error('no demographic found for ' + id)
  }
  return dem.label;
}

/**
 * Gets the label for the provided region ID
 * @param {string} id 
 * @returns {string}
 */
export const getRegionLabel = (id) => {
  let region = REGIONS.find(r => r.id === id);
  if (!region) {
    throw new Error('no region found for ' + id)
  }
  return region.label;
}

export const intToRegionId = (value, region) => {
  const s = "0000000000000" + value;
  const length = Object.keys(MAP_ID_LENGTH_TO_REGION)
    .find(k => MAP_ID_LENGTH_TO_REGION[k] === region)
  if (length) {
    return s.substr(s.length - parseInt(length));
  }
  throw new Error('no id length for region ' + region)
}

/**
 * Gets the region that corresponds to the provided ID
 * @param {string} id 
 */
export const getRegionFromId = (id) => {
  if (!id) { return null; }
  if (!MAP_ID_LENGTH_TO_REGION[id.length]) {
    throw new Error('No region corresponding to provided ID');
  }
  return MAP_ID_LENGTH_TO_REGION[id.length]
}

/**
 * Gets an object mapping of variable name to label
 * @param {array} varNames an array of variable names
 */
export const getLabelsFromVarNames = (varNames) => {
  return varNames.reduce((labelCollection, varName) => {
    labelCollection[varName] = getLabelFromVarName(varName);
    return labelCollection;
  }, {})
}

/**
 * Returns a string with the label for the given variable name, in
 * the format {METRIC_LABEL} ({DEMOGRAPHIC_LABEL})
 * @param {*} varName 
 */
export const getLabelFromVarName = (varName) => {
  const [demId, metricId] = varName.split('_');
  return getMetricLabel(metricId) 
    + ' (' + getDemographicLabel(demId) + ')'
}

/**
 * Returns the metric id portion of the variable name
 */
export const getMetricIdFromVarName = (varName) =>
  varName.split('_')[1]

/**
 * Returns the metric object that corresponds to the metric
 * id in the variable name.
 * @param {string} varName 
 */
export const getMetricFromVarName = (varName) =>
  getMetricById(getMetricIdFromVarName(varName))

/**
 * Returns the demographic id portion of the variable name
 */
export const getDemographicIdFromVarName = (varName) =>
  varName.split('_')[0]

/**
 * Returns the demographic object that corresponds to the demographic
 * id in the variable name.
 * @param {string} varName 
 */
export const getDemographicFromVarName = (varName) => {
  const id = getDemographicIdFromVarName(varName)
  const dem = getDemographicById(id);
  return dem ? dem : getGapById(id)
}

/**
 * Returns array of gap demographics that contain the provided demographic id
 * e.g. 'b' will return [ 'wb' ]
 */
export const getGapsForDemographicId = (id) => {

}

/**
 * Returns true if the variable name (e.g. wb_avg) represents a gap
 */
export const isGapVar = (varName) => {
  const id = getDemographicIdFromVarName(varName)
  return Boolean(getGapById(id))
}

/**
 * Returns true if the demographic id represents a gap
 */
export const isGapDemographic = (id) => {
  return Boolean(getGapById(id))
}

/**
 * Gets the variables for the map section
 * @param {string} region 
 * @param {string} metric 
 * @param {string} demographic 
 */
export const getExplorerVarsFromSelection = (region, metric, demographic) => ({
  yVar: region === 'schools' ? 
    'all_' + metric : 
    demographic + '_' + metric,
  xVar: region === 'schools' ? 
    'frl_pct' : 
    demographic + '_ses',
  zVar: 'all_sz'
})


/**
 * Gets the color stops for the provided metric ID
 * @param {string} id 
 * @returns {array}
 */
export const getStopsForVarName = (varName, region, colors = getChoroplethColors()) => {
  const demId = getDemographicIdFromVarName(varName);
  const metricId = getMetricIdFromVarName(varName);
  const [ min, max ] = getMetricRange(metricId, demId, region, 'map')
  const range = Math.abs(max - min);
  const stepSize = range / (colors.length-1);
  return colors.map((c, i) =>
    [ (min + (i * stepSize)), c ]
  )
}

/**
 * Gets the percent value of where the value sites on
 * the scale for the metric.
 * @param {*} value 
 * @param {*} metricId 
 * @returns {number} between 0 - 1
 */
export const getValuePositionForMetric = (value, varName, region) => {
  const [ min, max ] = getMetricRangeFromVarName(varName, region)
  return Math.min(1, Math.max(0, (value - min) / (max - min)))
}


/**
 * Returns true if the provided key matches the region, 
 * demographic, and type passed
 */
const isRangeKeyMatch = (key, { region, demographic, type }) => {
  if (key === '*') { return true; }
  const [t, r, d = false ] = key.split('_');
  return (t === '*' || t === type) &&
    (r === '*' || r === region) &&
    (
      d === '*' || 
      d === demographic || 
      (d === 'gap' && isGapDemographic(demographic)) ||
      !d
    );
}

/**
 * gets the range for the metric, or an alternate range
 * if a variant is specified
 * @param {string} id metric id
 * @param {string} demographic demographic to get the range for
 * @param {string} region region to get the range for
 * @param {string} type type of range, if using separate map / chart ranges (e.g. 'map') 
 */
export const getMetricRange = (id, demographic, region, type = '') => {
  const metric = getMetricById(id)
  if (!metric || !metric.range ) {
    throw new Error(`no range specified for metric ${id}`)
  }
  const rangeKey = 
    Object.keys(metric.range)
      .find(k => isRangeKeyMatch(k, { demographic, region, type }))
  return rangeKey && metric.range[rangeKey] ? metric.range[rangeKey] : null
}

/**
 * Returns an array containing the min and max for the
 * provided varname and region
 */
export const getMetricRangeFromVarName = (varName, region, type) => {
  const metricId = getMetricIdFromVarName(varName)
  const demId = getDemographicIdFromVarName(varName)
  return getMetricRange(metricId, demId, region, type);
}


export const getGradient = ({
  colors = getChoroplethColors(), 
  legendRange = [0,1], 
  colorRange = [0,1], 
  vertical = false
}) => {
  const legendExtent = legendRange[1] - legendRange[0]; // 6
  const colorExtent = colorRange[1] - colorRange[0]; // 7
  // size of the color range relative to the legend range
  const colorRangePercent = 100 * colorExtent / legendExtent; // 116.666%
  const steps = colors.length - 1;
  const colorStepSize = colorRangePercent / steps; // 16.666665714285714%
  const colorStartPercent = 100 *
    (colorRange[0] - legendRange[0]) / 
    (legendRange[1] - legendRange[0])
    // 100 * -1 / 6 = -16.6666%
  const colorStepsString = colors.map((c, i) =>  c + ' ' + 
    (colorStartPercent + (colorStepSize * i)) + '%'
  ).join(',')
  return vertical ?
    'linear-gradient(to top, ' + colorStepsString + ')' :
    'linear-gradient(to right, ' + colorStepsString + ')';
}

