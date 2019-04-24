import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { loadLocation } from '../../actions/featuresActions';
import { getChoroplethColors, getValuePositionForMetric, getSelectedColors, isGapDemographic } from '../../modules/config';
import { getRegionControl, getMetricControl, getDemographicGapControl, getHighlightControl } from '../../modules/controls';
import { onScatterplotData, onScatterplotLoaded } from '../../actions/scatterplotActions';
import { onHoverFeature, onViewportChange, onSelectFeature, onCoordsChange } from '../../actions/mapActions';
import { updateRoute } from '../../modules/router';
import { getStatePropByAbbr, getStateFipsFromAbbr } from '../../constants/statesFips';
import { getFeatureProperty } from '../../modules/features';
import SplitSection from '../base/SplitSection';
import { getMapViewport } from '../../modules/map';
import { updateViewportRoute } from '../../modules/router';
import { getLang } from '../../constants/lang';

/**
 * Gets the variables for the map section
 * @param {string} region 
 * @param {string} metric 
 * @param {string} demographic 
 */
const getVars = (region, metric, demographic) => ({
  yVar: region === 'schools' ? 
    'all_' + metric : 
    demographic + '_' + metric,
  xVar: region === 'schools' ? 
    'frl_pct' : 
    demographic + '_ses',
  zVar: 'all_sz'
})

/**
 * Gets the controls for the map section
 * @param {string} metric 
 * @param {string} demographic 
 * @param {string} region 
 * @param {string} highlightedState 
 */
const getControls = 
  (metric, demographic, region, highlightedState) => {
    const controls = [
      getMetricControl(metric),
      getRegionControl(region),
      getHighlightControl(highlightedState)
    ];
    // add demographic control if not schools
    if (region !== 'schools') {
      controls.splice( 1, 0, getDemographicGapControl(demographic));
    }
    return controls
  }


const mapStateToProps = ({ 
  scatterplot: { data },
  selected,
  sections: { map: { hovered }, active },
  map: { viewport },
},
{ match: { params: { region, metric, demographic, highlightedState, ...params } } }
) => {
  const vars = getVars(region, metric, demographic)
  const controls = getControls(metric, demographic, region, highlightedState)
  const hoveredId = hovered && 
    hovered.properties && 
    hovered.properties.id ?
      hovered.properties.id : ''
  const selectedArray = selected && selected[region] ? 
    selected[region] : []
  return ({
    section: {
      id: 'map',
      title: {
        text: region === 'schools' ? 
          getLang('MAP_TITLE_SCHOOLS') : 
          getLang('MAP_TITLE'),
        controls
      },
      description: 
        getLang('MAP_DESCRIPTION_' + metric + (isGapDemographic(demographic) ? '_GAP': '')) + ' ' +
        getLang('MAP_DESCRIPTION_SES' + (isGapDemographic(demographic) ? '_GAP': '')) + ' ' +
        getLang('MAP_DESCRIPTION'),
      selected: selected && selected[region],
      cardMetrics: [ vars.xVar, vars.yVar ],
      headerMenu: {
        text: region === 'schools' ? 
          getLang('MAP_CONTROL_TEXT_SCHOOLS') :
          getLang('MAP_CONTROL_TEXT'),
        controls,
      }
    },
    scatterplot: {
      ...vars,
      region,
      data,
      variant: 'map',
      colors: getChoroplethColors(),
      selected: selectedArray,
      highlightedState: getStateFipsFromAbbr(highlightedState),
      hovered: hoveredId,
      freeze: (active !== 'map')
    },
    map: {
      region,
      choroplethVar: vars.yVar,
      hovered: hoveredId,
      selected: selectedArray,
      colors: getSelectedColors(),
      viewport: getMapViewport(viewport, params),
      freeze: (active !== 'map'),
      attributionControl: true
    },
    legend: {
      colors: getChoroplethColors(),
      markerPosition: hovered && hovered.properties ?
        getValuePositionForMetric(
          getFeatureProperty(hovered, demographic + '_' + metric),
          demographic + '_' + metric,
          region
        ) : null,
      vertical: true
    }
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onScatterplotClick: (location) => {
    dispatch(loadLocation(location))
    dispatch(onViewportChange({ 
      latitude: location.lat, 
      longitude: location.lon,
      zoom: location.id.length+2
    }, true))
  },
  onScatterplotData: (data, region) => 
    dispatch(onScatterplotData(data, region)),
  onScatterplotHover: (feature) =>
    dispatch(onHoverFeature(feature, 'map')),
  onScatterplotReady: () => 
    dispatch(onScatterplotLoaded('map')),
  onMapHover: (feature, coords) => (
    dispatch(onHoverFeature(feature, 'map')) &&
    dispatch(onCoordsChange(coords))
  ),
  onMapViewportChange: (vp) => {
    dispatch(onViewportChange(vp))
    updateViewportRoute(ownProps, vp);
  },
  onMapClick: (feature) => 
    dispatch(onSelectFeature(feature, ownProps.match.params.region)),
  onOptionChange: (id, option) => {
    switch(id) {
      case 'metric':
        return updateRoute(ownProps, { metric: option.id })
      case 'demographic':
        return updateRoute(ownProps, { demographic: option.id })
      case 'region':
        return updateRoute(ownProps, { region: option.id })
      case 'highlight':
        updateRoute(ownProps, { 
          highlightedState: option.id
        })
        dispatch(onViewportChange({
          latitude: getStatePropByAbbr(option.id, 'lat'),
          longitude: getStatePropByAbbr(option.id, 'lon'),
          zoom: 5
        }, true))
        return;
      default:
        return;
    }
  },
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SplitSection)
