
import { withRouter } from 'react-router-dom';
import React, { useEffect, useMemo } from 'react'
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadRouteLocations } from '../../actions/featuresActions';
import SedaPage from '../../components/seda/SedaPage';
import SedaLocations from '../../components/seda/SedaLocations';
import { MAX_LOCATIONS } from '../../constants/dataOptions';
import { onViewportChange } from '../../actions/mapActions';
import { getMapContainerSize } from '../../components/molecules/BaseMap';
import Section from '../../components/templates/Section';
import SedaExplorerMap from '../../components/seda/SedaExplorerMap';
import SedaExplorerChart from '../../components/seda/SedaExplorerChart';

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
  classes,
  loadRouteLocations, 
  locations, 
  selected,
  helpOpen,
  view, 
  onViewChange 
}) => {
  // flag potential layout change after loading locations
  useEffect(() => {
    loadRouteLocations(locations)
      .then(()=> {
        // set map size when locations load
        onViewChange('map')
      })
  }, [])

  // flag potential layout change when there are 0 or 1 locations
  useEffect(() => {
    if (selected.length === 0 || selected.length === 1) {
      onViewChange('map')
    }
  }, [ selected ])

  // flag layout change when view changes
  useEffect(() => { 
    onViewChange(view) 
  }, [ view ])

  // flag layout change when help opens / closes
  useEffect(() => { 
    setTimeout(() => onViewChange(view), 500) 
  }, [ helpOpen ])

  // set card count class based on # of cards
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
      <div
        className={classNames('help-drawer', { 'help-drawer--on': helpOpen })}
      >
        <span style={{textAlign: 'center'}}>Help panel placeholder</span>
      </div>
      <SplitSection
        id="map"
        classes={classes}
        onViewChange={onViewChange}
        rightComponent={<SedaExplorerMap />}
        leftComponent={<SedaExplorerChart />}
        footerContent={Boolean(selected.length) && <SedaLocations />}
      />
    </SedaPage>
  )
}

ExplorerView.propTypes = {
  selected: PropTypes.array,
  locations: PropTypes.string,
  helpOpen: PropTypes.bool,
  view: PropTypes.string, 
  onViewChange: PropTypes.func,
  loadRouteLocations: PropTypes.func,
  classes: PropTypes.object,
}

const mapStateToProps = 
  (
    { selected, ui: { helpOpen } },
    { 
      match: { params: { locations, region, view }}, 
      classes = {} 
    }
  ) => ({
    view,
    classes: {
      ...classes,
      content: 'section__content--' + (
        view === 'map' ? 'right' :
          view === 'chart' ? 'left' : 'split' 
      ),
      root: "section--explorer" + 
        (helpOpen ? " section--explorer-help" : "")
    },
    helpOpen,
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
