import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const getLabelPosition = (position, full = false) => {
  return full ?
    (100*(position) + '%') :
    (100*(position + 1)/2 + '%')
}

const DivergingBar = ({
  minLabel,
  maxLabel,
  midLabel,
  midPoint = 0,
  value,
  formatter,
  position,
  markerPosition,
  markerColor = '#f00',
  color,
  className,
  size,
  full = false
}) => {
  position = Math.min(1, Math.max(-1, position));
  const isValue = Boolean(value) || value === 0;
  const valueLabel = isValue ? 
    (formatter ? formatter(value) : value) : 
    'Unavailable'
  return (
    <div className={
      classNames(
        "diverging-bar", 
        className,
        { 
          "diverging-bar--full": full,
          "diverging-bar--large": size === 'large',
          "diverging-bar--small": size === 'small',
          "diverging-bar--above": value && value > midPoint,
          "diverging-bar--below": value && value < midPoint,
          "diverging-bar--mid": value === midPoint,
          "diverging-bar--unavailable": !value && value !== 0 
        }
      )
    }>
      <div className='diverging-bar__bar-wrapper'>
        <span className='diverging-bar__rect-value' style={{
          background: color,
          transform: isValue ? 'scaleX(' + (full ? position : position/2) + ')' : null,
        }} />
        {
          (markerPosition || markerPosition === 0) && 
            <span className='diverging-bar__marker marker' style={{
              background: markerColor,
              transform: markerPosition ? 'scaleX(' + (full ? markerPosition : markerPosition/2) + ')' : null,
            }} />
        }
        
        <span className='diverging-bar__label diverging-bar__label--value'
          style={{
            left: isValue ? 
              getLabelPosition(position, full) : null
          }}
        >
          { valueLabel }
        </span>
      </div>
      <div className='diverging-bar__labels-wrapper'>
        <span className='diverging-bar__label diverging-bar__label--min'>{minLabel}</span>
        <span className='diverging-bar__label diverging-bar__label--mid'>{midLabel}</span>
        <span className='diverging-bar__label diverging-bar__label--max'>{maxLabel}</span>
      </div>
      <span className='diverging-bar__line-horizontal' />
      <span className='diverging-bar__line-vertical' />
    </div>
  )
}

DivergingBar.propTypes = {
  minLabel: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  maxLabel: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  midLabel: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  value: PropTypes.number,
  valueLabel: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  /** determines if it is a full bar or diverging */
  full: PropTypes.bool,
}

export default DivergingBar
