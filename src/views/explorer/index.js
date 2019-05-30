
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadRouteLocations } from '../../actions/featuresActions';
import MapSection from '../../components/sections/MapSection';
import DefaultPage from '../../components/templates/DefaultPage';

export class ExplorerView extends Component {
  static propTypes = {
    loadRouteLocations: PropTypes.any,
    match: PropTypes.object,
  }

  componentDidMount() { 
    this.props.loadRouteLocations(
      this.props.match.params.locations
    );
  }

  render() {
    return (
      <DefaultPage>
        <MapSection />
      </DefaultPage>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations)),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(ExplorerView)
