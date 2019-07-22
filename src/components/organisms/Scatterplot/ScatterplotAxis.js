import React from 'react'
import PropTypes from 'prop-types'
import { getLabelForVarName, getLegendEndLabelsForVarName } from '../../../modules/lang';
import { getFeatureProperty } from '../../../modules/features';
import { getChoroplethColors, getFormatterForVarName, getMetricRangeFromVarName, getInvertedFromVarName } from '../../../modules/config';
import LegendBar from '../../molecules/LegendBar';

const choroplethColors = getChoroplethColors();

const ScatterplotAxis = ({
  axis = 'x',
  region, 
  varName, 
  hovered,
  ...rest
}) => {
  const vertical = axis === 'y';
  const invert = getInvertedFromVarName(varName);
  const title = getLabelForVarName(varName);
  const [ startLabel, endLabel ] = getLegendEndLabelsForVarName(varName);
  const legendRange = getMetricRangeFromVarName(varName, region);
  const colorRange = getMetricRangeFromVarName(varName, region, 'map');
  const value = getFeatureProperty(hovered, varName);
  const formatter = getFormatterForVarName(varName);
  return (
    <LegendBar
      title={title}
      vertical={vertical}
      value={value}
      colors={choroplethColors} 
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
