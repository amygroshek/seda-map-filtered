
import { scaleLinear } from 'd3-scale';

/**
 * Maps the data object to new keys based on the provided keyMap
 * @param {object} obj the object for which the keys should be mapped
 * @param {object} keyMap a map of { oldKey: newKey }
 * @returns {object} object containing the new keys in keyMap
 */
export const mapObjectKeys = (obj, keyMap) =>
  Object.keys(keyMap).reduce((acc, curr) => {
    if (obj[curr]) {
      acc[keyMap[curr]] = obj[curr];
    }
    return acc;
  }, {})

/**
 * Returns keys that exist in the object
 */
export const getKeysInObject = (keys, obj = {}) =>
  keys.filter((k) => obj.hasOwnProperty(k))


export const makeId = () =>
  '_' + Math.random().toString(36).substr(2, 9)


/**
 * Returns the value for a css variable
 * @param {*} varname 
 */
export const getCSSVariable = (varname) => 
  // eslint-disable-next-line no-undef
  getComputedStyle(document.documentElement)
    .getPropertyValue(varname)


export const formatNumber = (val, decimals = 2) => {
  if (!val && val !== 0) { return 'N/A' }
  const factor = Math.pow(10, decimals);
  return Math.round(val*factor)/factor
}

export const formatRate = (v) => {
  if (!v && v !== 0) { return 'N/A' }
  return Math.round((v-1)*100) + '%';
}

const formatFreeLunch = (v) => {
  if (!v && v !== 0) { return 'N/A' }
  return Math.round(v * 100) + '%'
}

export const parseColor = (input) => {
  if (input.substr(0,1)==="#") {
    const collen=(input.length-1)/3;
    const fact=[17,1,0.062272][collen-1];
    return [
        Math.round(parseInt(input.substr(1,collen),16)*fact),
        Math.round(parseInt(input.substr(1+collen,collen),16)*fact),
        Math.round(parseInt(input.substr(1+2*collen,collen),16)*fact)
    ];
  }
  return input.split("(")[1].split(")")[0].split(",").map(Math.round);
}


/**
 * 
 * @param {*} value 
 * @param {*} range 
 */
export const getPercentFromValue  = (value, range = [-0.5, 0.5]) => {
  if (!value && value !== 0) { return null }
  return (value - range[0]) / (range[1] - range[0])
}

/**
 * Returns a number between -1 and 1 of where the value falls in
 * the range.
 */
export const getPositionFromValue = (value, range = [-0.5, 0.5]) => {
  if (!value && value !== 0) { return null; }
  const totalRange = range[1] - range[0];
  const targetRange = [ range[0] / totalRange, range[1] / totalRange ]; 
  const scale = scaleLinear()
    .domain(range)
    .range(targetRange)
    .clamp(true);
  return scale(value);
}
  

/**
 * 
 */
export const getValueFromPosition = (percent, range = [-0.5, 0.5]) => {
  if (!percent && percent !== 0) { return null }
  const totalRange = range[1] - range[0];
  const targetRange = [ range[0] / totalRange, range[1] / totalRange ]; 
  const scale = scaleLinear()
    .domain(range)
    .range(targetRange)
    .clamp(true);
  return formatNumber(scale.invert(percent));
}
  

export const getFormatterForMetric = (metric) => {
  switch(metric) {
    case 'grd':
      return formatRate
    case 'frl':
      return formatFreeLunch
    default:
      return formatNumber
  }
}
