import { connect } from 'react-redux';
import {FlyToInterpolator} from 'react-map-gl';
import * as ease from 'd3-ease';

import { onViewportChange, onRegionChange } from '../../actions/mapActions';
import { loadLocation } from '../../actions/featuresActions';
import { getRegionFromId } from '../../modules/config';
import Search from '../molecules/Search';


const mapDispatchToProps = (dispatch, ownProps) => ({
  onSuggestionSelected: (hit) => {
    if (hit) {
      dispatch(onViewportChange({ 
        latitude: parseFloat(hit.lat), 
        longitude: parseFloat(hit.lon),
        zoom: hit.id ? hit.id.length : 10,
        transitionDuration: 3000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: ease.easeCubic
      }))
      const region = getRegionFromId(hit.id)
      if (region) {
        dispatch(onRegionChange(region))
      }
      if (hit.id) {
        dispatch(loadLocation({ 
          id: hit.id,
          lat: hit.lat,
          lon: hit.lon
        }))
      }
      ownProps.onSuggestionSelected &&
        ownProps.onSuggestionSelected(hit)
    }
  }
})

export default connect(null, mapDispatchToProps)(Search)


