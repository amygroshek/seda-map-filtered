
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { updateMapSize, loadRouteLocations, toggleGapChart, onMetricChange } from '../../actions';

import SplitSection from '../templates/SplitSection';
import SedaLocations from './SedaLocations';
import SedaMap from './SedaMap';
import SedaChart from './SedaChart';
import SedaHelp from './SedaHelp';
import SedaIntro from './SedaIntro';
import SedaLocationPanel from './SedaLocationPanel';
import SedaTooltip from './SedaTooltip';
import SedaGapChart from './SedaGapChart';
import { Button } from '@material-ui/core';
import { getLang } from '../../modules/lang';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles';

const Charts = ({
  hasGapChart, 
  showGapChart, 
  sectionId, 
  onChartToggle
}) => {

  return (
    <div className={classNames(
      "charts__root",
      { "charts__root--split": showGapChart && sectionId === 'chart' }
    )}>
      <SedaChart />
      { showGapChart && <SedaGapChart /> }
      { hasGapChart && 
          <Button 
            variant="contained"
            color="primary"
            className="charts__toggle" 
            onClick={() => onChartToggle(!showGapChart) }
          >
            { showGapChart ? 
                getLang('BUTTON_HIDE_CHART') :
                getLang('BUTTON_SHOW_CHART')
            }
          </Button>
      }
    </div>
  )
}

Charts.propTypes = {
  hasGapChart: PropTypes.bool,
  showGapChart: PropTypes.bool,
  sectionId: PropTypes.string, 
  onChartToggle: PropTypes.func,
}

/** Returns true if the demographic has a gap chart */
const hasGapChart = (demographic) => {
  return ['wh', 'wb', 'pn'].indexOf(demographic) > -1
}

const ExplorerView = ({ 
  loadRouteLocations, 
  locations, 
  selected,
  locationActive,
  helpOpen,
  view,
  demographic,
  gapChart,
  activeView,
  onMetricChange,
  onLayoutChange,
  onToggleGapChart,
}) => {
  // use state to track if the intro is on / off
  const [introOn, setIntroOn] = useState(false);

  // check if viewport is above medium
  const theme = useTheme();
  const isAboveMedium = useMediaQuery(theme.breakpoints.up('md'));

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
    <>
      { isAboveMedium && <SedaTooltip /> }
      <SplitSection
        id="map"
        classes={{ root: 'section--explorer' }}
        helpPanelOn={helpOpen}
        locationPanelOn={locationActive}
        activeView={activeView}
        rightComponent={<SedaMap />}
        leftComponent={
          <Charts 
            hasGapChart={hasGapChart(demographic)} 
            showGapChart={hasGapChart(demographic) && gapChart} 
            sectionId={view} 
            onChartToggle={onToggleGapChart}
          />
        }
        footerContent={<SedaLocations />}
      >
        <SedaHelp />
        <SedaLocationPanel />
      </SplitSection>
    </>
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
  demographic: PropTypes.string,
  gapChart: PropTypes.bool,
  classes: PropTypes.object,
  onToggleGapChart: PropTypes.func,
}

const mapStateToProps = 
  (
    { selected, ui: { helpOpen }, active, sections: { gapChart } },
    { match: { params: { locations, region, view, demographic } } }
  ) => ({
    gapChart,
    view,
    demographic,
    helpOpen,
    locations,
    selected: selected[region],
    locationActive: Boolean(active),
    activeView: view === 'map' ? 'right' :
      view === 'chart' ? 'left' : 'split'
  })

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations, ownProps.match.params.region)),
  onLayoutChange: (view) => 
    ['map', 'split'].indexOf(view) > -1 &&
      dispatch(updateMapSize()),
  onMetricChange: (metricId) =>
    dispatch(onMetricChange(metricId, ownProps))
  ,
  onToggleGapChart: (visible) => {
    dispatch(toggleGapChart(visible))
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ExplorerView)
