
export const onScatterplotData = (data, region) => {
  return ({
    type: 'FETCH_VAR_SUCCESS',
    region,
    data: data[region]
  })
}

export const onScatterplotError = (err) => {
  return {
    type: 'FETCH_VAR_ERROR',
    errorMessage: err && err.message ? err.message : err
  }
}