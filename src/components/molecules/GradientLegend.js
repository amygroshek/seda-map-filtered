import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getGradient, getValuePositionInRange } from '../../modules/config';

/**
 * Get the transform for the marker
 */
const getTransform = (value, vertical = false) => {
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
      <div className="gradient-legend__labels">
        <div className="gradient-legend__label gradient-legend__label--low">
          {startLabel}
        </div>
        <div className="gradient-legend__label gradient-legend__label--high">
          {endLabel}
        </div>
      </div>

      <div className="gradient-legend__values">
        <div className="gradient-legend__value gradient-legend__value--low">
          {legendRange[0]}
        </div>
        <div className="gradient-legend__value gradient-legend__value--zero"
          style={{
            position: 'absolute',
            left:  (getValuePositionInRange((colorRange[1] + colorRange[0])/2, legendRange)*100) +'%'
          }}
        >
          {Math.round((colorRange[1] + colorRange[0])/2)}
        </div>
        <div className="gradient-legend__value gradient-legend__value--high">
          +{legendRange[1]}
        </div>
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


    </div>
  )
}

GradientLegend.propTypes = {
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  colors: PropTypes.array,
  vertical: PropTypes.bool,
  markerPosition: PropTypes.number,
  legendRange: PropTypes.array,
  colorRange: PropTypes.array,
}

export default GradientLegend