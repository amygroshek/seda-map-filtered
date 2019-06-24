
import { withRouter } from 'react-router-dom';
import React, { useEffect, useState, useMemo } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadRouteLocations } from '../../actions/featuresActions';
import SedaPage from '../../components/seda/SedaPage';
import SedaLocations from '../../components/seda/SedaLocations';
import { updateMapSize } from '../../actions/mapActions';
import Section from '../../components/templates/Section';
import SedaExplorerMap from '../../components/seda/SedaExplorerMap';
import SedaExplorerChart from '../../components/seda/SedaExplorerChart';
import SedaExplorerHelp from '../../components/seda/SedaExplorerHelp';
import LocationDetailsPanel from '../../components/organisms/LocationDetailsPanel';
import SedaIntro from '../../components/seda/SedaIntro';
import { updateRoute } from '../../modules/router';

const SplitSection = ({
  leftComponent,
  rightComponent,
  ...props
}) => (
  <Section {...props}>
    <div className="section__right">{rightComponent}</div>
    <div className="section__left">{leftComponent}</div>
  </Section>
)

SplitSection.propTypes = {
  leftComponent: PropTypes.node,
  rightComponent: PropTypes.node,
}

const ExplorerView = ({ 
  loadRouteLocations, 
  locations, 
  selected,
  helpOpen,
  view, 
  onLayoutChange,
  region,
  active,
  metric,
  features,
  clearActiveLocation,
  onMetricChange,
  ...props
}) => {
  // use state to track if the intro is on / off
  const [introOn, setIntroOn] = useState(false);

  // use memo to store other features
  const others = useMemo(() => 
    selected[region].map(fId => features[fId])
  , [ region, selected ])

  const classes = useMemo(() => ({
    content: 'section__content--' + (
      view === 'map' ? 'right' :
        view === 'chart' ? 'left' : 'split' 
    ),
    root: "section--explorer" + 
      (helpOpen ? " section--explorer-help" : "")
  }), [view, helpOpen])

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
    if (selected[region].length === 0 || selected[region].length === 1) {
      onLayoutChange('map')
    }
  }, [ selected, region ])

  // flag layout change when view changes
  useEffect(() => { 
    onLayoutChange(view) 
  }, [ view ])

  // flag layout change when help opens / closes
  useEffect(() => { 
    onLayoutChange(view)
  }, [ helpOpen ])

  return (
    <SedaPage classes={{ 
      root: 'page--explorer', 
      main: 'page__body--explorer page__' 
    }}>
      { introOn && <SedaIntro onMeasureClick={(mId) => {onMetricChange(mId); setIntroOn(false) }} /> }
      <SedaExplorerHelp open={helpOpen} />
      <LocationDetailsPanel 
        feature={active} 
        others={others} 
        onClose={clearActiveLocation}
        metric={metric}
      />
      <SplitSection
        id="map"
        classes={classes}
        rightComponent={<SedaExplorerMap />}
        leftComponent={<SedaExplorerChart />}
        footerContent={Boolean(selected[region].length) && <SedaLocations />}
      />
    </SedaPage>
  )
}

ExplorerView.propTypes = {
  selected: PropTypes.object,
  locations: PropTypes.string,
  helpOpen: PropTypes.bool,
  view: PropTypes.string, 
  onLayoutChange: PropTypes.func,
  loadRouteLocations: PropTypes.func,
  classes: PropTypes.object,
}

const mapStateToProps = 
  (
    { features, active, selected, ui: { helpOpen } },
    { match: { params: { locations, metric, region, view } } }
  ) => ({
    view,
    active,
    features,
    region,
    metric,
    helpOpen,
    locations,
    selected
  })

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations)),
  onLayoutChange: (view) => ['map', 'split'].indexOf(view) > -1 &&
      dispatch(updateMapSize()),
  clearActiveLocation: () => 
    dispatch({ type: 'CLEAR_ACTIVE_LOCATION'}),
  onMetricChange: (metricId) => {
    updateRoute(ownProps, { metric: metricId })
  },
})


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ExplorerView)
