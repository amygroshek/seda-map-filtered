import axios from 'axios';
import { parse } from 'papaparse';

/**
 * Fetches data and returns a promise that contains 
 * an array of all the requested vars data on success.
 * @param {Array<String>} vars array of variable names to fetch
 * @param {string} region region to fetch for (counties, districts, schools)
 * @returns {Promise<Array<object>>}
 */
const fetchVarsForRegion = (vars = [], region) =>
  Promise.all(
    vars.map(v => axios
      .get(`${process.env.REACT_APP_VARS_ENDPOINT}${region}-${v}.csv`)
      .then((res) => {
        const parsed = parse(res.data);
        if (parsed.errors.length) {
          throw new Error(res.errors[0])
        }
        return parsed.data.reduce((acc, curr) => {
            acc[curr[0]] = parseFloat(curr[1]);
            return acc;
          }, {});
      })
    )
  ).then(data => vars.reduce((acc, curr, i) => {
    acc[curr] = data[i];
    return acc;
  }, {}))

/**
 * Fetches the data for the variables and dispatches events
 * @param {Array<String>} vars array of variable names to fetch
 * @param {string} region region to fetch for (counties, districts, schools)
 */
export const loadVarsForRegion = (vars = [], region) => 
  (dispatch) => {
    dispatch({ type: 'FETCH_VAR_REQUEST' })
    fetchVarsForRegion(vars, region)
      .then(data => {
        dispatch({
          type: 'FETCH_VAR_SUCCESS',
          region,
          data
        })
      })
      .catch(err => dispatch({
        type: 'FETCH_VAR_ERROR',
        errorMessage: err.message ? err.message : err
      }))
  }
