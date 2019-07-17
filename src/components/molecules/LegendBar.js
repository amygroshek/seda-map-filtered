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
    `translateY(${100 - value*100}%)` :
    `translateX(${value*100}%)`
}

/**
 * Displays a gradient with start / end labels
 * @param {object} props 
 */
const LegendBar = ({ 
  title,
  startLabel, 
  endLabel,
  value,
  colors, 
  vertical = false,
  legendRange = [0, 1],
  colorRange = [0, 1],
  className,
  invert = false,
  formatter,
}) => {
  const gradientString = 
    getGradient({colors, legendRange, colorRange, vertical})
  const markerPosition = value ? 
    getValuePositionInRange(value, legendRange, invert) :
    null
  return (
    <div 
      className={classNames(
        'legend-bar', 
        { 'legend-bar--vertical': vertical },
        { 'legend-bar--title': title },
        className,
      )}
    >
      {
        title && 
        <div className="legend-bar__title">
          {title}
        </div>
      }
      {
        startLabel && endLabel &&
          <div className="legend-bar__labels">
            <div className="legend-bar__label legend-bar__label--low">
              {startLabel}
            </div>
            <div className="legend-bar__label legend-bar__label--high">
              {endLabel}
            </div>
          </div>
      }
      

      <div className="legend-bar__values">
        <div className="legend-bar__value legend-bar__value--low">
          {legendRange[0]}
        </div>
        <div className="legend-bar__value legend-bar__value--zero"
          style={{
            position: 'absolute',
            left:  (getValuePositionInRange((colorRange[1] + colorRange[0])/2, legendRange)*100) +'%'
          }}
        >
          {Math.round((colorRange[1] + colorRange[0])/2)}
        </div>
        <div className="legend-bar__value legend-bar__value--high">
          +{legendRange[1]}
        </div>
      </div>

      <div 
        className="legend-bar__gradient"
        style={{background: gradientString }}
      >
        <div 
          className={classNames(
            'legend-bar__marker',
            { 'legend-bar__marker--show': Boolean(markerPosition) }
          )}
          style={{
            transform: getTransform(markerPosition, vertical)
          }}
        >
          <span className='legend-bar__tick'>
            {formatter ? formatter(value) : value}
          </span>
        </div>
      </div>


    </div>
  )
}

LegendBar.propTypes = {
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  colors: PropTypes.array,
  vertical: PropTypes.bool,
  markerPosition: PropTypes.number,
  legendRange: PropTypes.array,
  colorRange: PropTypes.array,
  className: PropTypes.string,
}

export default LegendBar