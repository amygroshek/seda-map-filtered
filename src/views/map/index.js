import Map from '../../components/map-view/Map';
import MapHeader from '../../components/map-view/MapHeader';
import MapLegend from '../../components/map-view/MapLegend';
import MapScatterplot from '../../components/map-view/MapScatterplot';
import MapSearch from '../../components/map-view/MapSearch';
import MapTooltip from '../../components/map-view/MapTooltip';
import MapSelectedLocations from '../../components/map-view/MapSelectedLocations';
import ReportCard from '../../components/report-card/ReportCard';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadRouteLocations } from '../../actions/featuresActions';


export class MapView extends Component {
  static propTypes = {
    loadRouteLocations: PropTypes.any,
    match: PropTypes.object,
    demographic: PropTypes.string, 
    onDemographicChange: PropTypes.func,
    mapScatterplotLoaded: PropTypes.bool
  }

  componentDidMount() { 
    this.props.loadRouteLocations(
      this.props.match.params.locations
    );
  }

  render() {
    return (
      <div className="map-view">
        <MapTooltip />
        <div className="map-view__header">
          <MapHeader />
          <MapSearch />
        </div>
        <div className="map-view__container">
          <div className="map-view__map">
            <Map />
            <MapLegend />
          </div>
          <div className="map-view__scatterplot-overlay">
            <MapScatterplot />
            <MapSelectedLocations />
          </div>
        </div>
        {
          // show report card once map scatterplot is loaded
          this.props.mapScatterplotLoaded &&
            <div className="map-view__report-card">
              <ReportCard />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ scatterplot: { loaded } }) => ({
  mapScatterplotLoaded: loaded && loaded['map']
})

const mapDispatchToProps = (dispatch) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapView)
