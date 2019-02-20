import * as algoliasearch from 'algoliasearch';

const client = algoliasearch('VQGKAQUEHP', 'd57cfd62e7ef2abb89335bf26080e3fd');
const index = client.initIndex('dev_seda');

export const fetchResults = (query) => (dispatch) => {
  dispatch({
    type: 'FETCH_PLACE_REQUEST',
    query
  })
  return index.search({ query })
    .then(res => dispatch({
      type: 'FETCH_PLACE_SUCCESS',
      results: res.hits.reduce((acc, curr) => {
        const { id, name, lon, lat } = curr;
        acc[id] = { id, name, lon, lat }
        return acc;
      }, {})
    }))
    .catch(err => dispatch({
      type: 'FETCH_PLACE_ERROR',
      errorMessage: err.message ? err.message : err
    }))
}