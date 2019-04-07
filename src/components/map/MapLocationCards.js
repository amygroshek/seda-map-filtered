import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'redux'
import LocationCards from '../base/LocationCards';
import { onRemoveSelectedFeature, onViewportChange } from '../../actions/mapActions';
import { getLocationFromFeature, parseLocationsString } from '../../modules/router';
import { onHoverFeature } from '../../actions/mapActions';

const mapStateToProps = (
  { selected, features, hovered: { feature } },
  { 
    match: { params: { region } } 
  }
) => ({
  hovered: feature && feature.properties && feature.properties.id ?
    feature.properties.id : null,
  features: selected[region]
    .map(l => 
      features[l] && features[l].properties ? 
        features[l] : null
    )
    .filter(l => l)
})

const mapDispatchToProps = (dispatch) => ({
  onCardDismiss: (feature) => 
    dispatch(onRemoveSelectedFeature(
      feature
    )),
  onCardHover: (feature) => {
    dispatch(onHoverFeature(feature))
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