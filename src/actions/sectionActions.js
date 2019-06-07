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

