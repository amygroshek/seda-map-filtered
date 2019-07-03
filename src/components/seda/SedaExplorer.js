
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { updateRoute } from '../../modules/router';
import { updateMapSize, loadRouteLocations } from '../../actions';

import SplitSection from '../templates/SplitSection';
import SedaLocations from './SedaLocations';
import SedaMap from './SedaMap';
import SedaChart from './SedaChart';
import SedaHelp from './SedaHelp';
import SedaIntro from './SedaIntro';
import SedaLocationPanel from './SedaLocationPanel';

const ExplorerView = ({ 
  loadRouteLocations, 
  locations, 
  selected,
  locationActive,
  helpOpen,
  view, 
  activeView,
  onMetricChange,
  onLayoutChange,
}) => {
  // use state to track if the intro is on / off
  const [introOn, setIntroOn] = useState(false);

  // flag potential layout change after loading locations
  useEffect(() => {
    loadRouteLocations(locations)
      .then(()=> {
        // set map size when locations load
        onLayoutChange('map')
      })
  }, [])

  // flag potential layout change when there are 0 or 1 locations
  useEffect(() => {
    if (
      selected.length === 0 || 
      selected.length === 1
    ) {
      onLayoutChange('map')
    }
  }, [ selected ])

  // flag layout change when view, helpOpen changes
  useEffect(() => { onLayoutChange(view) }, [ view, helpOpen, locationActive ])
  return introOn ? (
    <SedaIntro onMeasureClick={(mId) => {onMetricChange(mId); setIntroOn(false) }} /> 
  ) : (
    <SplitSection
      id="map"
      classes={{ root: 'section--explorer' }}
      helpPanelOn={helpOpen}
      locationPanelOn={locationActive}
      activeView={activeView}
      rightComponent={<SedaMap />}
      leftComponent={<SedaChart />}
      footerContent={<SedaLocations />}
    >
      
      <SedaHelp />
      <SedaLocationPanel />
    </SplitSection>
  )
}

ExplorerView.propTypes = {
  view: PropTypes.string, 
  selected: PropTypes.array,
  locations: PropTypes.string,
  helpOpen: PropTypes.bool,
  activeView: PropTypes.string,
  locationActive: PropTypes.bool,
  onMetricChange: PropTypes.func,
  onLayoutChange: PropTypes.func,
  loadRouteLocations: PropTypes.func,
  classes: PropTypes.object,
}

const mapStateToProps = 
  (
    { selected, ui: { helpOpen }, active },
    { match: { params: { locations, region, view } } }
  ) => ({
    view,
    helpOpen,
    locations,
    selected: selected[region],
    locationActive: Boolean(active),
    activeView: view === 'map' ? 'right' :
      view === 'chart' ? 'left' : 'split'
  })

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations)),
  onLayoutChange: (view) => ['map', 'split'].indexOf(view) > -1 &&
      dispatch(updateMapSize()),
  onMetricChange: (metricId) => {
    updateRoute(ownProps, { metric: metricId })
  },
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ExplorerView)
