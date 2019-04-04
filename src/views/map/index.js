
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
 

import { loadRouteLocations } from '../../actions/featuresActions';

import SocioeconomicConditions from '../../components/sections/SocioeconomicConditionsSection';
import OpportunityDifferences from '../../components/sections/OpportunityDifferencesSection';
import AchievementGaps from '../../components/sections/AchievementGapSection';
import MapIntro from '../../components/sections/IntroSection';
import MapSection from '../../components/sections/MapSection';



export class MapView extends Component {
  static propTypes = {
    loadRouteLocations: PropTypes.any,
    match: PropTypes.object,
    demographic: PropTypes.string, 
    onDemographicChange: PropTypes.func,
    mapScatterplotLoaded: PropTypes.bool
  }

  componentDidMount() { 
    this.props.loadRouteLocations(
      this.props.match.params.locations
    );
  }

  render() {
    return (
      <div className="map-tool">
        <MapIntro 
          onSearchSelect={() => {
            scroller.scrollTo('mapSection', {
              duration: 400,
              smooth: true,
            })
          }}
        />
        <Element name="mapSection">
          <MapSection />
        </Element>
        
        <SocioeconomicConditions />
        <OpportunityDifferences />
        <AchievementGaps />
        <div className="report-card-view">
          {
            // show report card once map scatterplot is loaded
            this.props.mapScatterplotLoaded &&
              <div className="map-view__report-card">
                {/* <ReportCard /> */}
              </div>
          }
        </div>
      </div>
      
    )
  }
}

const mapStateToProps = (
  { scatterplot: { loaded }}
) => ({
  mapScatterplotLoaded: loaded && loaded['map'],
})

const mapDispatchToProps = (dispatch) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapView)
