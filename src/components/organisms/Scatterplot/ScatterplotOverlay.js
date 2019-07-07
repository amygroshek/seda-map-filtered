import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { getSelectedColors, getMetricRangeFromVarName, getSizerFunctionForRegion } from '../../../modules/config'
import CircleMarker from '../../atoms/CircleMarker';

const colors = getSelectedColors();

/**
 * Returns a percent based on where the value falls 
 * within the range
 * @param {number} value 
 * @param {array<number>} range 
 */
const getPercentOfRange = (value, range) =>
  ( (value - range[0]) / (range[1] - range[0]) ) * 100

/**
 * Returns object with position and size of a circle for a feature
 */
const getCircleForFeature = ({
  feature,
  xVar,
  yVar,
  zVar,
  xValueToPercent,
  yValueToPercent,
  zValueToRadius,
}) => {
  if (!feature || !feature.properties) { return null; }
  return {
    id: feature.properties.id,
    x: xValueToPercent ? (xValueToPercent(feature.properties[xVar]) + '%') : '0%',
    y: yValueToPercent ? (yValueToPercent(feature.properties[yVar]) + '%') : '0%',
    z: zValueToRadius ? Math.max(20, zValueToRadius(feature.properties[zVar])) : 8,
    data: feature
  }
}
/**
 * Returns an array of circle data for the provided features
 */
const getCircles = ({
  xVar, 
  yVar, 
  zVar,
  xValueToPercent,
  yValueToPercent,
  zValueToRadius,
  features, 
  selected, 
}) => {
    if (!features) { return {} }    
    // add circles for selected items
    return selected
      .map(id => features[id] ? features[id] : null)
      .map(feature => getCircleForFeature({
        feature,
        xVar, 
        yVar, 
        zVar,
        xValueToPercent,
        yValueToPercent,
        zValueToRadius,
      }))
      .filter(f => f !== null)
}

/**
 * Returns if two features have the same id property
 */
const isSameFeature = (f1, f2) => {
  if (!f1 || !f2 || !f1.properties || !f2.properties) {
    return false;
  }
  return f1.properties.id === f2.properties.id
}

/**
 * Returns if the provided hovered feature is in the 
 * selected array
 */
const isHoveredSelected = (hovered, selected = []) => {
  if (!hovered || !hovered.properties) { return false }
  return selected.indexOf(hovered.properties.id) > -1
}

const ScatterplotOverlay = ({
  xVar, 
  yVar, 
  zVar, 
  selected, 
  region, 
  features, 
  hovered,
}) => {
  // function that converts xValue to the % position on the scale
  const xValueToPercent = useMemo(() => 
    (val) => getPercentOfRange(
      val, 
      getMetricRangeFromVarName(xVar, region), 
    )
    , [xVar, region]
  )
  // function that converts yValue to the % position on the scale
  const yValueToPercent = useMemo(() => 
    (val) => 
      (100 - getPercentOfRange(
        val, getMetricRangeFromVarName(yVar, region)
      ))
    , 
    [yVar, region]
  )
  // function that converts z value to circle radius in px
  const zValueToRadius = useMemo(() =>
    getSizerFunctionForRegion(region)
  , [region])
  // circles for selected areas
  const circles = useMemo(() => getCircles({
      xVar, 
      yVar, 
      zVar, 
      xValueToPercent, 
      yValueToPercent,
      zValueToRadius, 
      features, 
      region, 
      selected, 
    })
  , [xVar, yVar, zVar, selected, region, features])
  // circle for hovered feature
  const hoveredCircle = !isHoveredSelected(hovered, selected)
    && getCircleForFeature({
      feature: hovered,
      xVar, 
      yVar, 
      zVar, 
      xValueToPercent, 
      yValueToPercent,
      zValueToRadius,
    })

  return (
    <div className="location-markers">
      { circles.map((c, i) => 
        <CircleMarker
          key={'c'+i}
          color={
            isSameFeature(c.data, hovered) ?
            '#f00' : colors[i%colors.length]
          }
          size={c.z}
          x={c.x}
          y={c.y}
        >{i+1}</CircleMarker>
      )}
      { hoveredCircle &&
        <CircleMarker
          color='#f00'
          className={'marker__root--hover'}
          size={hoveredCircle.z}
          x={hoveredCircle.x}
          y={hoveredCircle.y}
        />
      }
    </div>
  )
}

ScatterplotOverlay.propTypes = {
  xVar: PropTypes.string, 
  yVar: PropTypes.string,  
  zVar: PropTypes.string,  
  selected: PropTypes.array,
  region: PropTypes.string, 
  features: PropTypes.object, 
  hovered: PropTypes.object,
}

export default ScatterplotOverlay
