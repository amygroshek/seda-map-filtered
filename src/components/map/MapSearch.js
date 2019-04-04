import React from 'react'
import { connect } from 'react-redux';
import { onViewportChange, onRegionChange } from '../../actions/mapActions';
import {FlyToInterpolator} from 'react-map-gl';
import * as ease from 'd3-ease';
import { loadLocation } from '../../actions/featuresActions';
import SedaSearch from 'react-seda-search';
import LANG from '../../constants/lang';
import { getRegionFromId } from '../../utils';


const mapDispatchToProps = (dispatch) => ({
  selectSearchResult: (hit) => {
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
    }
  }
})

const MapSearch = ({selectSearchResult, onSelected}) => {
  return (
    <div className="map-search">
      <SedaSearch
        algoliaId={process.env.REACT_APP_ALGOLIA_ID}
        algoliaKey={process.env.REACT_APP_ALGOLIA_KEY}
        indices={['cities', 'counties', 'districts', 'schools']}
        onSuggestionSelected={(hit) => {
          selectSearchResult(hit);
          onSelected && onSelected(hit);
        }}
        inputProps={{
          placeholder: LANG['MAP_SEARCH_PLACEHOLDER']
        }}
      />
    </div>
  )
}

export default connect(null, mapDispatchToProps)(MapSearch)


