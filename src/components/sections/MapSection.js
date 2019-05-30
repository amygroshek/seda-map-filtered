import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getChoroplethColors, getValuePositionForMetric, getSelectedColors, isGapDemographic } from '../../modules/config';
import { onHoverFeature, onViewportChange, onSelectFeature, onCoordsChange, navigateToStateByAbbr, addToFeatureIdMap } from '../../actions/mapActions';
import { updateRoute } from '../../modules/router';
import { getStateFipsFromAbbr, getStatePropByAbbr } from '../../constants/statesFips';
import { getFeatureProperty } from '../../modules/features';
import SplitSection from '../base/SplitSection';
import { getMapViewport } from '../../modules/map';
import { updateViewportRoute } from '../../modules/router';
import { getLang } from '../../constants/lang';
import { getScatterplotDispatchForSection, getCardDispatchForSection } from '../../actions/sectionActions';
import { getHoveredId, getCards } from '../../modules/sections';

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
  features,
  sections: { map: { hovered }, active },
  map: { viewport, idMap },
},
{ match: { params: { view = 'map', color = '', region, metric, demographic, highlightedState, ...params } } }
) => {
  const vars = getVars(region, metric, demographic)
  const hoveredId = getHoveredId(hovered)
  const selectedArray = selected && selected[region] ? 
    selected[region] : []
  return ({
    section: {
      id: 'map',
      title: getLang('TITLE_SES_' + metric.toUpperCase()),
      description: 
        getLang('MAP_DESCRIPTION_' + metric + (isGapDemographic(demographic) ? '_GAP': '')) + ' ' +
        getLang('MAP_DESCRIPTION_SES' + (isGapDemographic(demographic) ? '_GAP': '')) + ' ' +
        getLang('MAP_DESCRIPTION'),
      cards: getCards({ 
        hovered,
        features,
        selected: selected[region] || [],
        metrics: [ vars.xVar, vars.yVar ]
      }),
      classes: {
        content: 'section__content--' + (
          view === 'map' ? 'right' :
            view === 'chart' ? 'left' : 'split' 
        )
      }
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
      region,
      choroplethVar: vars.yVar,
      choroplethScale: getColorsFromParam(color),
      hovered: hoveredId,
      selected: selectedArray,
      colors: getSelectedColors(),
      viewport: getMapViewport(viewport, params),
      freeze: (active !== 'map'),
      attributionControl: true,
      idMap,
      legend: {
        startLabel: 'low',
        endLabel: 'high',
        colors: getColorsFromParam(color),
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
  ...getCardDispatchForSection(dispatch, 'map'),
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
        if (option.id !== 'us') {
          dispatch(navigateToStateByAbbr(option.id))
        }
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
