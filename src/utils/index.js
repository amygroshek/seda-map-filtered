
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

export const mergeDatasets = (set1, set2) =>
  Object.keys(set1).reduce(
    (acc, curr) => {
      if (
        set2.hasOwnProperty(curr) && 
        parseFloat(set2[curr]) > -9999 &&
        parseFloat(set1[curr]) > -9999 &&
        curr !== "" && curr !== "id"
      ) {
        acc[curr] = [ 
          parseFloat(set1[curr]), 
          parseFloat(set2[curr]),
          curr
        ]
      }
      return acc;
    }, {}
  )