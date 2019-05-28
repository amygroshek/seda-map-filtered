
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadRouteLocations } from '../../actions/featuresActions';
import MapSection from '../../components/sections/MapSection';
import SedaHeader from '../../components/seda/SedaHeader';

export class MapView extends Component {
  static propTypes = {
    loadRouteLocations: PropTypes.any,
    match: PropTypes.object,
    selectedLocationCount: PropTypes.number,
  }

  componentDidMount() { 
    this.props.loadRouteLocations(
      this.props.match.params.locations
    );
  }

  render() {
    return (
      <div id="scrollWrapper" className="map-tool">
        <SedaHeader 
          onMenuClick={() => { console.log('menu') }}
        />
        <MapSection 
          selectedLocationCount={this.props.selectedLocationCount}
        />
      </div>
    )
  }
}

const mapStateToProps = (
  { scatterplot: { loaded }, selected, sections },
  { match: { params: { region } } }
) => {
  return {
    active: sections.active,
    mapScatterplotLoaded: loaded && loaded['map'],
    selectedLocationCount:
      selected && selected[region] && selected[region].length ?
        selected[region].length : 0,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapView)
