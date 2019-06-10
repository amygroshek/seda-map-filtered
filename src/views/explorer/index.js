
import { withRouter } from 'react-router-dom';
import React, { useEffect, useMemo } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadRouteLocations } from '../../actions/featuresActions';
import SedaExplorer from '../../components/seda/SedaExplorer';
import SedaPage from '../../components/seda/SedaPage';
import SedaLocations from '../../components/seda/SedaLocations';
import { MAX_LOCATIONS } from '../../constants/dataOptions';
import { onViewportChange } from '../../actions/mapActions';
import { getMapContainerSize } from '../../components/molecules/BaseMap';

const ExplorerView = ({ loadRouteLocations, locations, selected, onViewChange }) => {
  useEffect(() => {
    loadRouteLocations(locations)
      .then(()=> {
        // set map size when locations load
        onViewChange('map')
      })
  }, [])
  const cardCountClass = useMemo(() => {
    switch(selected.length) {
      case 0:
        return 'locations--none';
      case 1:
      case 2:
      case 3:
        return 'locations--min';
      case MAX_LOCATIONS:
        return 'locations--max';
      default:
        return 'locations--mid';
    } 
  }, [ selected ])
  return (
    <SedaPage classes={{ 
      root: 'page--explorer', 
      main: 'page__body--explorer page__' + cardCountClass 
    }}>
      <SedaExplorer 
        classes={{root:"section--explorer"}}
        onViewChange={onViewChange}
      />
      { Boolean(selected.length) && <SedaLocations /> }
    </SedaPage>
  )
}

ExplorerView.propTypes = {
  selected: PropTypes.array,
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
  onViewChange: (view) => {
    if (view === 'map' || view ==='split') {
      dispatch(onViewportChange(
        getMapContainerSize()
      ))
    }
  }
})


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ExplorerView)
