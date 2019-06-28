
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
 * Gets the range for the provided dataset, while filtering
 * out extreme outliers
 * @param {object} data 
 */
// const getDataRange = (data) => {
//   const values = Object.keys(data)
//     .map(k => parseFloat(data[k]))
//     .filter(v => v > -9999)
//     .sort((a, b) => a - b);
//   return [
//     d3array.min(values), 
//     d3array.max(values)
//   ]
// }

