const idLengths = {
  2: 'states',
  5: 'counties',
  7: 'districts',
  12: 'schools'
}

export const intToRegionId = (value, region) => {
  const s = "0000000000000" + value;
  const length = Object.keys(idLengths)
    .find(k => idLengths[k] === region)
  if (length) {
    return s.substr(s.length - parseInt(length));
  }
  throw new Error('no id length for region ' + region)
}

/**
 * Checks if a property of two objects are equal
 */
export const isPropEqual = (obj1, obj2, propName) => {
  if (!obj1 && !obj2) { return true; }
  if (obj1 && !obj2) { return false; }
  if (!obj1 && obj2) { return false; }
  return (obj1.hasOwnProperty(propName) && 
          obj2.hasOwnProperty(propName) &&
          obj1[propName] === obj2[propName])
}

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
 * Gets the region that corresponds to the provided ID
 * @param {string} id 
 */
export const getRegionFromId = (id) => {
  
  if (!idLengths[id.length]) {
    throw new Error('No region corresponding to provided ID');
  }
  return idLengths[id.length]
}

export const getSingularRegion = (region) => {
  switch(region) {
    case 'districts':
      return 'school district'
    case 'counties':
      return 'county'
    case 'schools':
      return 'school'
    default:
      throw new Error(`region ${region} does not have singular`)
  }
}