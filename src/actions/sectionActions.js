import { onScatterplotData, onScatterplotLoaded, onScatterplotError } from "./scatterplotActions";
import { loadLocation } from "./featuresActions";
import { onRemoveSelectedFeature, onViewportChange } from "./mapActions";
import { parseLocationsString, getLocationFromFeature } from '../modules/router';

export const onHoverFeature = (feature, sectionId) => ({
  type: 'SET_HOVERED_FEATURE',
  feature,
  sectionId
});

export const getCardDispatchForSection = (dispatch, section) => ({
  onCardDismiss: (feature) => 
    dispatch(onRemoveSelectedFeature(
      feature
    )),
  onCardHover: (feature) => {
    dispatch(onHoverFeature(feature, section))
  },
  onCardClick: (feature) => {
    const l = parseLocationsString(
      getLocationFromFeature(feature)
    )[0];
    if (l) {
      dispatch(onViewportChange({ 
        latitude: parseFloat(l.lat), 
        longitude: parseFloat(l.lon),
        zoom: l.id.length + 2
      }, true))
    }
  },
})

export const getScatterplotDispatchForSection = (dispatch, sectionId) => ({
  onScatterplotData: (data, region) =>
    dispatch(onScatterplotData(data, region)),
  onScatterplotReady: () => 
    dispatch(onScatterplotLoaded(sectionId)),
  onScatterplotHover: (feature) =>
    dispatch(onHoverFeature(feature, sectionId)),
  onScatterplotClick: (location) =>
    dispatch(loadLocation(location)),
  onScatterplotError: (e, sectionId) => {
    dispatch(onScatterplotError(e, sectionId))
  }
})

export const sectionMapDispatchToProps = (sectionId) =>
  (dispatch, ownProps) => ({
    ...getCardDispatchForSection(dispatch, sectionId),
    ...getScatterplotDispatchForSection(dispatch, sectionId)
  })

