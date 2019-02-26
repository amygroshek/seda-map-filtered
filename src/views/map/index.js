import React from 'react'
import Map from '../../components/map-view/Map';
import MapControls from '../../components/map-view/MapControls';
import MapLegend from '../../components/map-view/MapLegend';
import MapScatterplot from '../../components/map-view/MapScatterplot';
import MapSearch from '../../components/map-view/MapSearch';
import MapTooltip from '../../components/map-view/MapTooltip';
import MapSelectedLocations from '../../components/map-view/MapSelectedLocations';

const MapView = () => (
  <div className="map-view">
    <div className="map-view__container">
      <Map />
      <MapTooltip />
      <div className="map-view__search-overlay">
        <MapSearch />
      </div>
      <div className="map-view__locations">
        <MapSelectedLocations />
      </div>
      <div className="map-view__controls-overlay">
        <MapLegend />
        <MapControls />
      </div>
      <div className="map-view__scatterplot-overlay">
        <MapScatterplot />
      </div>
    </div>
  </div>
)


export default MapView
