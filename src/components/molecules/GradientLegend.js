import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getGradient } from '../../modules/config';

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
  const gradientString = 
    getGradient({colors, legendRange, colorRange, vertical})
  return (
    <div 
      className={classNames(
        'gradient-legend', 
        { 'gradient-legend--vertical': vertical }
      )}
    >
      <div className="gradient-legend__start-label">
        {startLabel}
      </div>
      <div 
        className="gradient-legend__gradient"
        style={{background: gradientString }}
      >
        <div 
          className={classNames(
            'gradient-legend__marker',
            { 'gradient-legend__marker--show': Boolean(markerPosition) }
          )}
          style={{
            transform: getTransform(markerPosition, vertical)
          }}
        >
          <span className='gradient-legend__tick'></span>
        </div>
      </div>
      <div className="gradient-legend__end-label">
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