import React from 'react'
import { connect } from 'react-redux'
import Map from '../../components/map-view/Map';
import MapControls from '../../components/map-view/MapControls';
import MapLegend from '../../components/map-view/MapLegend';
import MapScatterplot from '../../components/map-view/MapScatterplot';
import MapSearch from '../../components/map-view/MapSearch';

const MapView = props => (
  <div className="map-view-wrapper">
    <div className="map-view-container">
      <Map />
      <div className="map-view-top-wrapper">
        <MapSearch />
      </div>
      <div className="map-view-bottom-wrapper">
        <MapLegend />
        <MapControls />
        <MapScatterplot />
      </div>
    </div>
  </div>
)

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({

})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
