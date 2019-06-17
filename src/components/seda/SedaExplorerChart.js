import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getChoroplethColors, getValuePositionForMetric, getMetricRange, getMetricIdFromVarName } from '../../modules/config';
import { onHoverFeature } from '../../actions/mapActions';
import { getStateFipsFromAbbr, getStatePropByAbbr } from '../../constants/statesFips';
import { getFeatureProperty } from '../../modules/features';
import { getLang, hasLangKey } from '../../constants/lang';
import { loadLocation } from "../../actions/featuresActions";

import GradientLegend from '../molecules/GradientLegend';
import DynamicScatterplot from '../organisms/DynamicScatterplot';
import { onScatterplotData, onScatterplotLoaded, onScatterplotError } from "../../actions/scatterplotActions";


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
  const titleKey = 'SP_TITLE_' + metric.toUpperCase() + '_' +
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
  scatterplot,
  legend,
  onData,
  onReady,
  onHover,
  onClick,
  onError,
}) => {
  const xMetricId = getMetricIdFromVarName(scatterplot.xVar)
  const leftLabel = hasLangKey('LEGEND_LOW_'+xMetricId) && 
    getLang('LEGEND_LOW_'+xMetricId)
  const rightLabel = hasLangKey('LEGEND_LOW_'+xMetricId) && 
    getLang('LEGEND_HIGH_'+xMetricId)
  return (
    <DynamicScatterplot {...{
      ...scatterplot,
      onData,
      onReady,
      onHover,
      onClick,
      onError
    }}
    >
      { legend && <GradientLegend {...legend} /> }
      { (leftLabel && rightLabel) &&
        <div className="dynamic-scatterplot__x-labels">
          <span className="label">{leftLabel}</span>
          <span className="label">{rightLabel}</span>
        </div>
      }
    </DynamicScatterplot>
  )
}

SedaExplorerChart.propTypes = {
  scatterplot: PropTypes.object,
  legend: PropTypes.object,
  onData: PropTypes.func,
  onReady: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onError: PropTypes.func,
}

const mapStateToProps = ({ 
  scatterplot: { data },
  selected,
  sections: { map: { hovered } },
},
{ match: { params: { region, metric, demographic, highlightedState } } }
) => {
  return ({
    scatterplot: {
      ...getVars(region, metric, demographic),
      heading: getScatterplotHeading(region, metric, demographic, highlightedState),
      region,
      data,
      hovered,
      variant: 'map',
      colors: getChoroplethColors(),
      selected: selected[region] ? selected[region] : [],
      highlightedState: getStateFipsFromAbbr(highlightedState),
    },
    legend: {
      colors: getChoroplethColors(),
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

const mapDispatchToProps = (dispatch) => ({
  onData: (data, region) =>
    dispatch(onScatterplotData(data, region)),
  onReady: () => 
    dispatch(onScatterplotLoaded('map')),
  onHover: (feature) =>
    dispatch(onHoverFeature(feature, 'map')),
  onClick: (location) =>
    dispatch(loadLocation(location)),
  onError: (e, sectionId = 'map') =>
    dispatch(onScatterplotError(e, sectionId))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaExplorerChart)

