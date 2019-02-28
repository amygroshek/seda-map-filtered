import { loadLocationsFromString } from "../utils/tilequery";

const onLoadFeaturesRequest = (locations) => ({
  type: 'LOAD_FEATURES_REQUEST',
  locations
});

const onLoadFeaturesSuccess = (features) => ({
  type: 'LOAD_FEATURES_SUCCESS',
  features
})

const onLoadFeaturesError = (error) => ({
  type: 'LOAD_FEATURES_ERROR',
  error
})

export const loadLocations = (locations) => 
  (dispatch) => {
    dispatch(onLoadFeaturesRequest(locations))
    loadLocationsFromString(locations)
      .then(features => {
        dispatch(onLoadFeaturesSuccess(features))
      })
      .catch((error) => {
        dispatch(onLoadFeaturesError(error))
      })
  }