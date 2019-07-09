
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


export const formatNumber = (val) =>
  Math.round(val*100)/100

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