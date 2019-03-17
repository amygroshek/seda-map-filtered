const statesFips = { 
  '10': { full: 'Delaware', abbr: 'DE' },
  '11': { full: 'District of Columbia', abbr: 'DC' },
  '12': { full: 'Florida', abbr: 'FL' },
  '13': { full: 'Georgia', abbr: 'GA' },
  '15': { full: 'Hawaii', abbr: 'HI' },
  '16': { full: 'Idaho', abbr: 'ID' },
  '17': { full: 'Illinois', abbr: 'IL' },
  '18': { full: 'Indiana', abbr: 'IN' },
  '19': { full: 'Iowa', abbr: 'IA' },
  '20': { full: 'Kansas', abbr: 'KS' },
  '21': { full: 'Kentucky', abbr: 'KY' },
  '22': { full: 'Louisiana', abbr: 'LA' },
  '23': { full: 'Maine', abbr: 'ME' },
  '24': { full: 'Maryland', abbr: 'MD' },
  '25': { full: 'Massachusetts', abbr: 'MA' },
  '26': { full: 'Michigan', abbr: 'MI' },
  '27': { full: 'Minnesota', abbr: 'MN' },
  '28': { full: 'Mississippi', abbr: 'MS' },
  '29': { full: 'Missouri', abbr: 'MO' },
  '30': { full: 'Montana', abbr: 'MT' },
  '31': { full: 'Nebraska', abbr: 'NE' },
  '32': { full: 'Nevada', abbr: 'NV' },
  '33': { full: 'New Hampshire', abbr: 'NH' },
  '34': { full: 'New Jersey', abbr: 'NJ' },
  '35': { full: 'New Mexico', abbr: 'NM' },
  '36': { full: 'New York', abbr: 'NY' },
  '37': { full: 'North Carolina', abbr: 'NC' },
  '38': { full: 'North Dakota', abbr: 'ND' },
  '39': { full: 'Ohio', abbr: 'OH' },
  '40': { full: 'Oklahoma', abbr: 'OK' },
  '41': { full: 'Oregon', abbr: 'OR' },
  '42': { full: 'Pennsylvania', abbr: 'PA' },
  '44': { full: 'Rhode Island', abbr: 'RI' },
  '45': { full: 'South Carolina', abbr: 'SC' },
  '46': { full: 'South Dakota', abbr: 'SD' },
  '47': { full: 'Tennessee', abbr: 'TN' },
  '48': { full: 'Texas', abbr: 'TX' },
  '49': { full: 'Utah', abbr: 'UT' },
  '50': { full: 'Vermont', abbr: 'VT' },
  '51': { full: 'Virginia', abbr: 'VA' },
  '53': { full: 'Washington', abbr: 'WA' },
  '54': { full: 'West Virginia', abbr: 'WV' },
  '55': { full: 'Wisconsin', abbr: 'WI' },
  '56': { full: 'Wyoming', abbr: 'WY' },
  '01': { full: 'Alabama', abbr: 'AL' },
  '02': { full: 'Alaska', abbr: 'AK' },
  '04': { full: 'Arizona', abbr: 'AZ' },
  '05': { full: 'Arkansas', abbr: 'AR' },
  '06': { full: 'California', abbr: 'CA' },
  '08': { full: 'Colorado', abbr: 'CO' },
  '09': { full: 'Connecticut', abbr: 'CT' } 
}

/**
 * Gets the property for the given identifier.
 * @param {string} id identifier for any geography
 * @param {string} prop property name to get from the states object
 */
const getStateProp = (id, prop) => {
  if (typeof id !== 'string') {
    throw new Error('state identifier must be string')
  }
  if (id.length > 2) {
    id = id.substring(0,2);
  }
  return statesFips[id] && statesFips[id][prop] ?
    statesFips[id][prop] : null;
}

/**
 * Gets the state abbreviation for the provided identifier
 * @param {string} id identifier for any geography
 */
export const getStateAbbr = (id) => 
  getStateProp(id, 'abbr')

/**
 * Gets the state name for the provided identifier
 * @param {string} id identifier for any geography
 */
export const getStateName = (id) =>
  getStateProp(id, 'full')