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
 * Gets the metric object corresponding to the provided ID
 */
export const getMetricById = (id) =>
  METRICS.find(m => m.id === id)

/**
 * Gets the demographic object corresponding to the provided ID
 * @param {*} id 
 */
export const getDemographicById = (id) =>
  DEMOGRAPHICS.find(d => d.id === id)

/**
 * Gets the region object corresponding to the provided ID
 */
export const getRegionById = (id) =>
  REGIONS.find(r => r.id === id)

/**
 * Gets the region object corresponding to the provided ID
 */
export const getGapById = (id) =>
  GAPS.find(r => r.id === id)



/**
 * Gets the label for the provided metric ID
 * @param {string} id 
 * @return {string}
 */
export const getMetricLabel = (id) => {
  let metric = METRICS.find(d => d.id === id);
  if (!metric) {
    throw new Error('no metric found for ' + id)
  }
  return metric.label;
}

export const getMaxLocations = () => {
  return MAX_LOCATIONS;
}

/**
 * Returns an array containing the min and max for the
 * provided varname and region
 */
export const getRangeFromVarName = (varName, region, type) => {
  const metricId = getMetricIdFromVarName(varName)
  const demId = getDemographicIdFromVarName(varName)
  return getMetricRange(metricId, demId, region, type);
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
 * @param {string} id 
 * @param {string} variant 
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
  const [ min, max ] = getRangeFromVarName(varName, region)
  return Math.min(1, Math.max(0, (value - min) / (max - min)))
}

/**
 * Gets an object mapping metric ID to label
 * @param {array} metricIds an array of metric IDs
 * @param {string} demographic the demographic for the metrics
 */
export const getLabelsFromVarNames = (varNames) => {
  return varNames.reduce((labelCollection, varName) => {
    labelCollection[varName] = getLabelFromVarName(varName);
    return labelCollection;
  }, {})
}

/**
 * Gets expanded min / max of a metric by adding a provided
 * number of steps to each.
 * @param {string} metricId the metric to pad min / max values from
 * @param {int} padSteps the number of steps to expand the min / max
 */
export const getPaddedMinMax = (metricId, padSteps = 0) => {
  const m = getMetricById(metricId);
  const numSteps = getChoroplethColors().length-1
  let { min, max } = m;
  if (padSteps) {
    const stepSize = Math.abs(max - min) / numSteps;
    min = Math.round((min - (stepSize * padSteps))*10)/10;
    max = Math.round((max + (stepSize * padSteps))*10)/10;
  }
  return { min, max }
}

/**
 * Pads both sides of the provided stops by the given amount
 * @param {*} stops 
 * @param {*} amount 
 */
export const getPaddedStops = (stops, amount) => {
  const targetLength = (stops.length-1) + (amount*2)
  const newStops = [];
  for(var i = 0; i < targetLength; i++) {
    newStops[i] = (i >= (targetLength - stops.length + amount)) ?
      ((i <= stops.length - 1) ? stops[i] : stops[stops.length - 1])
      : stops[0]
  }
  return newStops
}

export const getLabelFromVarName = (varName) => {
  const [demId, metricId] = varName.split('_');
  return getMetricLabel(metricId) 
    + ' (' + getDemographicLabel(demId) + ')'
}

export const getMetricIdFromVarName = (varName) =>
  varName.split('_')[1]

export const getMetricFromVarName = (varName) =>
  getMetricById(getMetricIdFromVarName(varName))

export const getDemographicIdFromVarName = (varName) =>
  varName.split('_')[0]

export const getDemographicFromVarName = (varName) => {
  const id = getDemographicIdFromVarName(varName)
  const dem = getDemographicById(id);
  return dem ? dem : getGapById(id)
}


export const isGapVar = (varName) => {
  const id = getDemographicIdFromVarName(varName)
  return Boolean(getGapById(id))
}

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