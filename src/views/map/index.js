
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Scroll from 'react-scroll'
import * as _debounce from 'lodash.debounce';

import { loadRouteLocations } from '../../actions/featuresActions';
import OpportunityDifferences from '../../components/sections/OpportunityDifferencesSection';
import AchievementGaps from '../../components/sections/AchievementGapSection';
import MapIntro from '../../components/sections/IntroSection';
import MapSection from '../../components/sections/MapSection';
import { updateRoute } from '../../modules/router';
import Header from '../../components/base/Header';
import Logo from '../../components/base/Logo';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabLabel from '../../components/base/TabLabel';
import { getLang } from '../../constants/lang';
import MenuSentence from '../../components/base/MenuSentence';
import { getMapControls, getOpportunityControls, getAchievementControls } from '../../modules/controls';
import { Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import ExportIcon from '@material-ui/icons/OpenInBrowser';
        
const TABS = [
  {
    id: 'avg',
    icon: '/assets/img/avg.svg',
    text: getLang('TAB_CONCEPT_AVG'),
    subtext: getLang('TAB_METRIC_AVG'),
  },
  {
    id: 'grd',
    icon: '/assets/img/grd.svg',
    text: getLang('TAB_CONCEPT_GRD'),
    subtext: getLang('TAB_METRIC_GRD'),
  },
  {
    id: 'coh',
    icon: '/assets/img/coh.svg',
    text: getLang('TAB_CONCEPT_COH'),
    subtext: getLang('TAB_METRIC_COH'),
  }
]

const Element = Scroll.Element;
const ScrollElement = Scroll.ScrollElement;
const ScrollLink = Scroll.Link;
const sectionIdComponentMap = { 
  'map': ScrollElement(MapSection), 
  'opportunity': ScrollElement(OpportunityDifferences), 
  'achievement': ScrollElement(AchievementGaps)
};

/**
 * Gets controls for the secondary header row based on active section
 * @param {string} sectionId 
 * @param {object} vars 
 * @param {string} region 
 * @param {*} highlightedState 
 */
const getSectionControls = (
  sectionId, vars, region, highlightedState
) => {
  switch (sectionId) {
    case 'map':
      return getMapControls(region, vars, highlightedState)
    case 'opportunity':
      return getOpportunityControls(region, vars, highlightedState)
    case 'achievement':
      return getAchievementControls(region, vars, highlightedState)
    default:
      return getMapControls(region, vars, highlightedState)
  }
}

export class MapView extends Component {
  static propTypes = {
    loadRouteLocations: PropTypes.any,
    match: PropTypes.object,
    demographic: PropTypes.string, 
    mapScatterplotLoaded: PropTypes.bool,
    selectedLocationCount: PropTypes.number,
    setMetric: PropTypes.func,
    setActiveSection: PropTypes.func,
    headerControls: PropTypes.object,
    onOptionChange: PropTypes.func,
    clearActiveSection: PropTypes.func,
  }

  state = {
    showHeader: false,
    value: 0,
    hovered: null,
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.setMetric(value)
  };

  showMetricHint = (event, value) => {
    this.setState({hovered: value})
  }

  hideMetricHint = () => {
    this.setState({hovered: null})
  }

  componentDidMount() { 
    this.props.loadRouteLocations(
      this.props.match.params.locations
    );
    Scroll.scrollSpy.update();
  }

  render() {
    return (
      <div id="scrollWrapper" className="map-tool map-tool--parallax">
        <div>
          <ScrollLink 
            containerId="scrollWrapper"
            activeClass="active"
            key={'sections-link'}
            to='sections'
            offset={0}
            onSetActive={() => this.setState({showHeader: true})}
            onSetInactive={() => this.setState({showHeader: false})}
            spy={true}
          />
          {
            Object.keys(sectionIdComponentMap).map(
              (k) => 
                <ScrollLink 
                  containerId="scrollWrapper"
                  key={k+'-link'}
                  to={k}
                  offset={-148}
                  onSetActive={this.props.setActiveSection}
                  onSetInactive={this.props.clearActiveSection}
                  spy={true}
                />
            )
          }
        </div>
        <MapIntro
          onMeasureClick={(metricId) => {
            this.props.setMetric(metricId);
            Scroll.scroller.scrollTo('map', {
              duration: 1000,
              smooth: true,
              containerId: 'scrollWrapper'
            })
          }}
        />
        <div className="intro-spacer"></div>
        <Element id="sections" name="sections" className='sections-wrapper'>
          <Header
            branding={<Logo />}
            primaryContent={
              <div 
                className='header-tabs'
                onMouseLeave={(e) => this.hideMetricHint(e)}
              >
                <Tabs 
                  value={this.props.metric} 
                  onChange={this.handleChange}
                  classes={{
                    indicator: 'tab__indicator'
                  }}
                >
                { 
                  TABS.map((t,i) =>
                    <Tab 
                      key={'tab'+i}
                      value={t.id}
                      label={
                        <TabLabel
                          { ...TABS[i] }
                          onMouseEnter={(e) => this.showMetricHint(e, i)}
                        />
                      }
                      classes={{
                        root: 'tab',
                        selected: 'tab--selected'
                      }} 
                    />
                  )
                }
                </Tabs>
                {/* { 
                  TABS.map((t,i) =>
                    <div 
              
                      key={'popover' + i }
                      className={classNames(
                        "popover", 
                        {'popover--active': this.state.hovered === i}
                      )
                    }>
                     {getLang('TAB_HINT_' + tabIdMetricMap[i].toUpperCase())}
                    </div>
                  )
                } */}
              </div>
            }
            secondaryContent={
              <div className="header__inner-content">
                <MenuSentence
                  {...this.props.headerControls}
                  onChange={this.props.onOptionChange}
                />
                <div className="header__controls header__controls--right">
                  <Button className='header__button'>
                    <LinkIcon className="icon icon--left" />
                    Share
                  </Button>
                  <Button className='header__button'>
                    <ExportIcon className="icon icon--left" />
                    Export
                  </Button>
                </div>
              </div>
            }
            classes={{
              root: this.state.showHeader ? 'header--visible' : 'header-hidden'
            }}
          />
          {
            Object.keys(sectionIdComponentMap).map(
              (k) => {
                const Section = sectionIdComponentMap[k];
                return <Section 
                  key={k+'-section'} 
                  id={k} 
                  name={k} 
                  selectedLocationCount={this.props.selectedLocationCount}
                />
              }
            )
          }
        </Element>
      </div>
    )
  }
}

const mapStateToProps = (
  { scatterplot: { loaded }, selected, sections },
  { match: { params: { region, metric, highlightedState } } }
) => {
  return {
    metric,
    active: sections.active,
    mapScatterplotLoaded: loaded && loaded['map'],
    selectedLocationCount: 
      selected && selected[region] && selected[region].length ?
        selected[region].length : 0,
    headerControls: getSectionControls(sections.active, sections[sections.active].vars, region, highlightedState)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations)),
  setMetric: _debounce((metricId) => {
    updateRoute(ownProps, { metric: metricId })
  }, 400),
  setActiveSection: _debounce((sectionId) => {
    console.log('setting active', sectionId)
    dispatch({
      type: 'SET_ACTIVE_SECTION',
      sectionId
    })
  },100),
  clearActiveSection: (sectionId) => {
    console.log('setting inactive', sectionId)
    // dispatch({
    //   type: 'SET_ACTIVE_SECTION',
    //   sectionId: null
    // })
  },
  onOptionChange: (id, option) => dispatch((dispatch, getState) => {
    console.log('option change', id, option, getState())
    switch(id) {
      case 'highlight':
        return updateRoute(ownProps, { 
          highlightedState: option.id
        })
      case 'region':
        return updateRoute(ownProps, { region: option.id })
      case 'demographic':
        dispatch({
          type: 'SET_REPORT_VARS',
          sectionId: getState().sections.active,
          optionId: id,
          value: option.id
        })
        return updateRoute(ownProps, { demographic: option.id })
      default:
        return dispatch({
          type: 'SET_REPORT_VARS',
          sectionId: getState().sections.active,
          optionId: id,
          value: option.id
        })
    }
  }),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapView)
