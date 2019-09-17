import { connect } from 'react-redux';
import {FlyToInterpolator} from 'react-map-gl';
import * as ease from 'd3-ease';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { onViewportChange, loadLocation, onRouteUpdates, onSearchSelection } from '../../actions';
import { getRegionFromFeatureId } from '../../modules/config';
import Search from '../molecules/Search';
import { getStateAbbrFromName } from '../../constants/statesFips';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSuggestionSelected: (hit) => {
    const region = getRegionFromFeatureId(hit.id)
    const state = getStateAbbrFromName(hit.state_name);
    const routeUpdates = {}
    if (hit) {
      dispatch(onViewportChange({ 
        latitude: parseFloat(hit.lat), 
        longitude: parseFloat(hit.lon),
        zoom: hit.id ? (hit.id.length + 3.5) : 10,
        transitionDuration: 3000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: ease.easeCubic
      }))
      if (region) {
        routeUpdates['region'] = region
      }
      if (state) {
        routeUpdates['highlightedState'] = state.toLowerCase()
      }
      if (hit.id) {
        dispatch(loadLocation({ 
          id: hit.id,
          lat: hit.lat,
          lon: hit.lon
        }, 'search'))
      }
      dispatch(onSearchSelection(hit))
      dispatch(onRouteUpdates(routeUpdates, ownProps))
    }
  }
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(Search)


