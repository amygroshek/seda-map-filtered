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
  if (!id) { return null; }
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

export const underscoreCombine = (...values) => values.join('_')

export const underscoreSplit = (value) => value.split('_')

export const makeId = () =>
  '_' + Math.random().toString(36).substr(2, 9)