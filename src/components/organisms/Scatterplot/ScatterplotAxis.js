import React from 'react'
import PropTypes from 'prop-types'
import { getLabelForVarName, getLegendEndLabelsForVarName } from '../../../modules/lang';
import { getFeatureProperty } from '../../../modules/features';
import { getChoroplethColors, getFormatterForVarName, getMetricRangeFromVarName, getInvertedFromVarName, isGapVarName } from '../../../modules/config';
import LegendBar from '../../molecules/LegendBar';

const COLORS = getChoroplethColors();

const ScatterplotAxis = ({
  axis = 'x',
  region, 
  varName,
  labelPrefix = 'LEGEND_',
  hovered,
  ...rest
}) => {
  const colors = isGapVarName(varName) ? 
    [...COLORS].reverse() : COLORS;
  const vertical = axis === 'y';
  const invert = getInvertedFromVarName(varName);
  const title = getLabelForVarName(varName);
  const [ startLabel, endLabel ] = getLegendEndLabelsForVarName(varName, labelPrefix);
  const legendRange = getMetricRangeFromVarName(varName, region);
  const colorRange = getMetricRangeFromVarName(varName, region, 'map');
  const value = getFeatureProperty(hovered, varName);
  const formatter = getFormatterForVarName(varName);
  return (
    <LegendBar
      title={title}
      vertical={vertical}
      value={value}
      colors={colors}
      startLabel={startLabel}
      endLabel={endLabel}
      colorRange={colorRange}
      legendRange={legendRange}
      invert={invert}
      formatter={formatter}
      {...rest}
    />
  )
}

ScatterplotAxis.propTypes = {
  axis: PropTypes.string,
  region: PropTypes.string,
  varName: PropTypes.string, 
  hovered: PropTypes.object,
}

export default ScatterplotAxis
