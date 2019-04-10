import { updateCurrentState } from "./mapActions";
import { updateRoute } from "../modules/router";
import { onScatterplotData, onScatterplotLoaded } from "./scatterplotActions";
import { loadLocation } from "./featuresActions";

export const onHoverFeature = (feature, sectionId) => ({
  type: 'SET_HOVERED_FEATURE',
  feature,
  sectionId
});

const getDispatchForSection = (dispatch, section, ownProps) =>
  (id, option) => {
    switch(id) {
      case 'highlight':
        if (option.value === 'us') {
          dispatch(updateCurrentState(null))
        } else {
          dispatch(updateCurrentState(option.id))
        }
        return;
      case 'region':
        return updateRoute(ownProps, { region: option.id })
      default:
        return dispatch({
          type: 'SET_REPORT_VARS',
          sectionId: section,
          optionId: id,
          value: option.id
        })
    }
  }

export const sectionMapDispatchToProps = (sectionId) =>
  (dispatch, ownProps) => ({
    onOptionChange: 
      getDispatchForSection(dispatch, sectionId, ownProps),
    onData: (data, region) =>
      dispatch(onScatterplotData(data, region)),
    onReady: () => 
      dispatch(onScatterplotLoaded(sectionId)),
    onHover: (feature) =>
      dispatch(onHoverFeature(feature, sectionId)),
    onClick: (location) =>
      dispatch(loadLocation(location))
  })

