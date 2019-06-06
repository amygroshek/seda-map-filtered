import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { getChoroplethColors, getValuePositionForMetric, getMetricRange } from '../../modules/config';
import { onHoverFeature, onViewportChange, onSelectFeature, onCoordsChange, addToFeatureIdMap } from '../../actions/mapActions';
import { getStateFipsFromAbbr, getStatePropByAbbr } from '../../constants/statesFips';
import { getFeatureProperty } from '../../modules/features';
import MapChartSection from '../templates/MapChartSection';
import { updateViewportRoute } from '../../modules/router';
import { getLang } from '../../constants/lang';
import { getScatterplotDispatchForSection } from '../../actions/sectionActions';

import { defaultMapStyle } from '../../style/map-style';
import { getMapViewport, getLayers } from '../../modules/map';
import { getHoveredId } from '../../modules/sections';
import { getSelectedColors } from '../../modules/config';
import SedaSearch from './SedaSearch';
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

const getScatterplotHeading = (region, metric, demographic, highlightedState) => {
  const vars = getVars(region, metric, demographic)
  const titleKey = 'SP_TITLE_' + metric.toUpperCase() + '_' +
    (vars.xVar.indexOf('ses') > -1 ? 'SES' : 'FRL')
  const state = getStatePropByAbbr(highlightedState, 'full') || 'U.S.';
  const grades = metric === 'avg' ? 'grades 3 - 8' :
    metric === 'grd' ? 'from grades 3 - 8' : 'from 2009 - 2016'
  return {
    title: getLang(titleKey),
    subtitle:  state + ' ' +
      getLang('LABEL_' + region.toUpperCase()).toLowerCase() + ', ' + 
      getLang('LABEL_' + demographic.toUpperCase()) + ' students, ' +
      ' ' + grades
  }
}

const getColorsFromParam = (colorParam) => {
  const urlColors = colorParam.split(',')
    .map(v => v.length === 6 ? '#' + v : v)
  return urlColors.length === 7 ? 
    urlColors : getChoroplethColors()
}


const mapStateToProps = ({ 
  scatterplot: { data },
  selected,
  map: { idMap, viewport },
  sections: { map: { hovered }, active },
},
{ match: { params: { view = 'map', color = '', region, metric, demographic, highlightedState, ...params } } }
) => {
  const vars = getVars(region, metric, demographic)
  const selectedArray = selected && selected[region] ? 
    selected[region] : []
  return ({
    section: {
      id: 'map',
      classes: {
        content: 'section__content--' + (
          view === 'map' ? 'right' :
            view === 'chart' ? 'left' : 'split' 
        )
      },
      overlayContent: <SedaSearch inputProps={{
        placeholder: getLang('CARD_SEARCH_PLACEHOLDER')
      }} />
    },
    scatterplot: {
      ...vars,
      heading: getScatterplotHeading(region, metric, demographic, highlightedState),
      region,
      data,
      hovered,
      variant: 'map',
      colors: getColorsFromParam(color),
      selected: selectedArray,
      highlightedState: getStateFipsFromAbbr(highlightedState),
      freeze: (active !== 'map')
    },
    map: {
      style: defaultMapStyle,
      layers: getLayers(region, metric, demographic),
      selectedIds: selected[region] || [],
      hoveredId: getHoveredId(hovered),
      viewport: getMapViewport(viewport, params),
      attributionControl: true,
      selectedColors: getSelectedColors(),
      idMap,
      legend: {
        startLabel: 'low',
        endLabel: 'high',
        colors: getColorsFromParam(color),
        colorRange: getMetricRange(metric, demographic, region, 'map'),
      legendRange: getMetricRange(metric, demographic, region),
        markerPosition: hovered && hovered.properties ?
          getValuePositionForMetric(
            getFeatureProperty(hovered, demographic + '_' + metric),
            demographic + '_' + metric,
            region
          ) : null,
        vertical: false
      }
    },
    legend: {
      colors: getColorsFromParam(color),
      colorRange: getMetricRange(metric, demographic, region, 'map'),
      legendRange: getMetricRange(metric, demographic, region),
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
  ...getScatterplotDispatchForSection(dispatch, 'map'),
  onMapHover: (feature, coords) => {
    dispatch(onHoverFeature(feature, 'map'))
    dispatch(onCoordsChange(coords))
    dispatch(addToFeatureIdMap([ feature ]))
  },
  onMapViewportChange: (vp) => {
    dispatch(onViewportChange(vp))
    updateViewportRoute(ownProps, vp);
  },
  onMapClick: (feature) => 
    dispatch(onSelectFeature(feature, ownProps.match.params.region)),
})
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapChartSection)
