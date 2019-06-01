
import { withRouter } from 'react-router-dom';
import React, { useEffect } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadRouteLocations } from '../../actions/featuresActions';
import SedaMapChartView from '../../components/seda/SedaMapChartView';
import SedaPage from '../../components/seda/SedaPage';

const ExplorerView = ({ loadRouteLocations, locations }) => {
  useEffect(() => {
    loadRouteLocations(locations)
  }, [])
  return (
    <SedaPage>
      <SedaMapChartView />
    </SedaPage>
  )
}

ExplorerView.propTypes = {
  locations: PropTypes.string,
  loadRouteLocations: PropTypes.func,
}

const mapStateToProps = 
  (state, { match: { params: { locations }}}) => ({  locations })

const mapDispatchToProps = (dispatch) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ExplorerView)
