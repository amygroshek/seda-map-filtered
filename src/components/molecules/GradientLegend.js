import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Get the transform for the marker
 */
const getTransform = (value = 0.5, vertical = false) => {
  if (!value && value !== 0) {
    value = 0.5
  }
  return vertical ?
    `translateY(-${value*100}%)` :
    `translateX(${value*100}%)`
}

const getGradient = (colors, legendRange, colorRange, vertical = false) => {
  const legendExtent = legendRange[1] - legendRange[0]; // 6
  const colorExtent = colorRange[1] - colorRange[0]; // 7
  // size of the color range relative to the legend range
  const colorRangePercent = 100 * colorExtent / legendExtent; // 116.666%
  const steps = colors.length - 1;
  const colorStepSize = colorRangePercent / steps; // 16.666665714285714%
  const colorStartPercent = 100 *
    (colorRange[0] - legendRange[0]) / 
    (legendRange[1] - legendRange[0])
    // 100 * -1 / 6 = -16.6666%
  const colorStepsString = colors.map((c, i) =>  c + ' ' + 
    (colorStartPercent + (colorStepSize * i)) + '%'
  ).join(',')
  return vertical ?
    'linear-gradient(to top, ' + colorStepsString + ')' :
    'linear-gradient(to right, ' + colorStepsString + ')';
}


/**
 * Displays a gradient with start / end labels
 * @param {object} props 
 */
const GradientLegend = ({ 
  startLabel, 
  endLabel, 
  markerPosition, 
  colors, 
  vertical = false,
  legendRange = [0, 1],
  colorRange = [0, 1],
}) => {
  if (!colors) { return <div />; }
  const gradientString = 
    getGradient(colors, legendRange, colorRange, vertical)
  return (
    <div 
      className={classNames(
        'map-legend', 
        { 'map-legend--vertical': vertical }
      )}
    >
      <div className="map-legend__start-label">
        {startLabel}
      </div>
      <div 
        className="map-legend__gradient"
        style={{background: gradientString }}
      >
        <div 
          className={classNames(
            'map-legend__marker',
            { 'map-legend__marker--show': Boolean(markerPosition) }
          )}
          style={{
            transform: getTransform(markerPosition, vertical)
          }}
        >
          <span className='map-legend__tick'></span>
        </div>
      </div>
      <div className="map-legend__end-label">
        {endLabel}
      </div>

    </div>
  )
}

GradientLegend.propTypes = {
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  colors: PropTypes.array.isRequired,
  vertical: PropTypes.bool,
  markerPosition: PropTypes.number,
  legendRange: PropTypes.array,
  colorRange: PropTypes.array,
}

export default GradientLegend