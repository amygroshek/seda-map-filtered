const initialState = {
  data: {},
  errorMessage: null
}

export const scatterplot = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_VAR_SUCCESS':
      return {
        ...state,
        data: { 
          ...state.data,
          [action.region]: {
            ...state.data[region],
            [action.varName]: {
              ...state.data[region][varName],
              ...action.data 
            }
          }          
        }
      }
    case 'FETCH_VAR_ERROR':
      return {
        ...state,
        errorMessage: action.errorMessage
      }
    default:
      return state;
  }
}

export const fetchData = (varName, region) = (dispatch) => {
  const url = `/assets/data/${region}/${varName}.csv`;
  return axios.get(url).then((res) => {
    const parsed = parse(res.data);
    if (parsed.errors.length) {
      throw new Error(res.errors[0])
    }
    const data = parsed.data
      .reduce((acc, curr) => {
        acc[curr[0]] = curr[1];
        return acc;
      }, {});
    dispatch({
      type: 'FETCH_VAR_SUCCESS',
      varName,
      region,
      data
    })
  })
  .catch(err => dispatch({
    type: 'FETCH_VAR_ERROR',
    errorMessage: err.message ? err.message : err
  }))
}

export default scatterplot;