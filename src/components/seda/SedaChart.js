import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getChoroplethColors, getMetricRange, getMetricIdFromVarName } from '../../modules/config';
import { getStateFipsFromAbbr, getStatePropByAbbr } from '../../constants/statesFips';
import { getFeatureProperty } from '../../modules/features';
import { getLang, hasLangKey } from '../../modules/lang';
import { loadLocation, onHoverFeature, onScatterplotData, onScatterplotLoaded, onScatterplotError, onCoordsChange } from "../../actions";
import LegendBar from '../molecules/LegendBar';
import Scatterplot from '../organisms/Scatterplot';
import { Typography } from '@material-ui/core';
import SedaLocationMarkers from './SedaLocationMarkers';

const COLORS = getChoroplethColors();

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
 * Returns a title and subtitle for the scatterplot based on
 * provided data selections
 * @param {*} region 
 * @param {*} metric 
 * @param {*} demographic 
 * @param {*} highlightedState 
 */
const getScatterplotHeading = (region, metric, demographic, highlightedState) => {
  const vars = getVars(region, metric, demographic)
  const titleKey = 'SP_TITLE_' + metric + '_' +
    (vars.xVar.indexOf('ses') > -1 ? 'SES' : 'FRL')
  const state = getStatePropByAbbr(highlightedState, 'full') || 'U.S.';
  const grades = metric === 'avg' ? 'grades 3 - 8' :
    metric === 'grd' ? 'from grades 3 - 8' : 'from 2009 - 2016'
  return {
    title: getLang(titleKey),
    subtitle:  getLang('LABEL_' + metric) + ', ' + 
      state + ' ' +
      getLang('LABEL_' + region.toUpperCase()).toLowerCase() + ', ' + 
      getLang('LABEL_' + demographic.toUpperCase()) + ' students, ' +
      ' ' + grades
  }
}


const SedaExplorerChart = ({
  region,
  metric,
  demographic,
  highlightedState,
  hovered,
  data,
  onData,
  onReady,
  onHover,
  onClick,
  onError,
}) => {
  const scatterplot = getVars(region, metric, demographic);
  const xMetricId = getMetricIdFromVarName(scatterplot.xVar)
  const leftLabel = hasLangKey('LEGEND_LOW_'+xMetricId) && 
    getLang('LEGEND_LOW_'+xMetricId)
  const rightLabel = hasLangKey('LEGEND_LOW_'+xMetricId) && 
    getLang('LEGEND_HIGH_'+xMetricId)
  const heading = useMemo(() =>
    getScatterplotHeading(region, metric, demographic, highlightedState)
  , [region, metric, demographic, highlightedState])
  const hoveredValue = getFeatureProperty(hovered, demographic + '_' + metric)
  const hoveredPrimary = hoveredValue || hoveredValue === 0 ? 
    Math.round(hoveredValue*100)/100 : null;
  return (
    <Scatterplot {...{
      ...scatterplot,
      region,
      data,
      variant: 'map',
      colors: COLORS,
      highlightedState: getStateFipsFromAbbr(highlightedState),
      onData,
      onReady,
      onHover,
      onClick,
      onError
    }}>
      { heading &&
        <div className='dynamic-scatterplot__heading'>
          <Typography variant='h6' component="span" className='dynamic-scatterplot__title'>
            { heading.title }
          </Typography>
          <Typography variant='body2' component="span" className='dynamic-scatterplot__subtitle'>
            { heading.subtitle }
          </Typography>
        </div>
      }
      <SedaLocationMarkers />
      <LegendBar {...{
        colors: COLORS,
        value: hoveredPrimary,
        colorRange: getMetricRange(metric, demographic, region, 'map'),
        legendRange: getMetricRange(metric, demographic, region),
        vertical: true
      }} /> 
      
      { (leftLabel && rightLabel) &&
        <div className="dynamic-scatterplot__x-labels">
          <span className="label">{leftLabel}</span>
          <span className="label">{rightLabel}</span>
        </div>
      }
    </Scatterplot>
  )
}

SedaExplorerChart.propTypes = {
  region: PropTypes.string,
  metric: PropTypes.string,
  demographic: PropTypes.string,
  highlightedState: PropTypes.string,
  hovered: PropTypes.object,
  data: PropTypes.object,
  onData: PropTypes.func,
  onReady: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onError: PropTypes.func,
}

const mapStateToProps = ({ 
  scatterplot: { data },
  sections: { map: { hovered } },
},
{ match: { params: { region, metric, demographic, highlightedState } } }
) => {
  return ({
    region,
    metric,
    demographic,
    highlightedState,
    hovered,
    data,
  })
}

const mapDispatchToProps = (dispatch) => ({
  onData: (data, region) =>
    dispatch(onScatterplotData(data, region)),
  onReady: () => 
    dispatch(onScatterplotLoaded('map')),
  onHover: (feature, e) => {
    dispatch(onHoverFeature(feature, 'map'))
    dispatch(onCoordsChange({x: e.pageX, y: e.pageY }))
  },
    
  onClick: (location) =>
    dispatch(loadLocation(location)),
  onError: (e, sectionId = 'map') =>
    dispatch(onScatterplotError(e, sectionId))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaExplorerChart)

