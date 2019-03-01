import * as algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_ID, 
  process.env.REACT_APP_ALGOLIA_KEY
);
const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX);

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