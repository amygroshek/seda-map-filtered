
import { withRouter } from 'react-router-dom';
import React, { useEffect } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadRouteLocations } from '../../actions/featuresActions';
import SedaExplorer from '../../components/seda/SedaExplorer';
import SedaPage from '../../components/seda/SedaPage';
import SedaLocations from '../../components/seda/SedaLocations';


const ExplorerView = ({ loadRouteLocations, locations, selected }) => {
  useEffect(() => {
    loadRouteLocations(locations)
  }, [])
  return (
    <SedaPage classes={{ 
      root: 'page--explorer', 
      main: 'page__body--explorer' 
    }}>
      <SedaExplorer classes={{root:"section--explorer"}} />
      { Boolean(selected.length) && <SedaLocations /> }
    </SedaPage>
  )
}

ExplorerView.propTypes = {
  locations: PropTypes.string,
  loadRouteLocations: PropTypes.func,
}

const mapStateToProps = 
  (
    { selected },
    { match: { params: { locations, region }}}
  ) => ({
    locations,
    selected: selected[region] || []
  })

const mapDispatchToProps = (dispatch) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ExplorerView)
