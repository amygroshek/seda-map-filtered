import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'redux'
import LocationCards from '../base/LocationCards';
import { onRemoveSelectedFeature, onViewportChange } from '../../actions/mapActions';
import { getLocationFromFeature, parseLocationsString } from '../../modules/router';
import { onHoverFeature } from '../../actions/mapActions';

const mapStateToProps = (
  { selected, features, sections },
  { 
    match: { params: { region } },
    section 
  }
) => ({
  hovered: sections[section] && sections[section].hovered && 
    sections[section].hovered.properties && 
    sections[section].hovered.properties.id ?
      sections[section].hovered.properties.id : null,
  features: selected[region]
    .map(l => 
      features[l] && features[l].properties ? 
        features[l] : null
    )
    .filter(l => l)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCardDismiss: (feature) => 
    dispatch(onRemoveSelectedFeature(
      feature
    )),
  onCardHover: (feature) => {
    dispatch(onHoverFeature(feature, ownProps.section))
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
  }
})

export default compose(
  withRouter, 
  connect(mapStateToProps, mapDispatchToProps)
)(LocationCards)