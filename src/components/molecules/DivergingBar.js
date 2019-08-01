import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const DivergingBar = ({
  minLabel,
  maxLabel,
  midLabel,
  midPoint = 0,
  value,
  formatter,
  position,
  midPosition = '50%',
  markerPosition,
  markerColor,
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
          "diverging-bar--unavailable": !isValue
        }
      )
    }>
      <div className='diverging-bar__bar-wrapper'>
        <span className='diverging-bar__rect-value' style={{
          background: color,
          transform: isValue ? 'scaleX(' + (position) + ')' : null,
          left: midPosition
        }} />
        {
          (markerPosition || markerPosition === 0) && 
            <span className='diverging-bar__marker marker' style={{
              marginLeft: 'calc(' + markerPosition*100 + '% - 4px)',
              borderTopColor: markerColor,
              borderBottomColor: markerColor,
              left: midPosition
            }} />
        }
        <span className='diverging-bar__label diverging-bar__label--value'
          style={{
            left: isValue ? 
              'calc(' + midPosition + ' + ' + position*100 + '%)' : 0
          }}
        >
          { valueLabel }
        </span>
      </div>
      <div className='diverging-bar__labels-wrapper'>
        <span className='diverging-bar__label diverging-bar__label--min'>{ position < -0.25 ? ' ' : minLabel }</span>
        <span className='diverging-bar__label diverging-bar__label--mid'>{midLabel}</span>
        <span className='diverging-bar__label diverging-bar__label--max'>{ position > 0.25 ? ' ' : maxLabel }</span>
      </div>
      <div className='diverging-bar__lines-wrapper'>
        <span className='diverging-bar__line-horizontal' />
        <span 
          className='diverging-bar__line-vertical' 
          style={{left: midPosition}}
        />
      </div>
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
  position: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  color: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  /** determines if it is a full bar or diverging */
  full: PropTypes.bool,
  midPoint: PropTypes.number,
  formatter: PropTypes.func,
  midPosition: PropTypes.string,
  markerPosition: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  markerColor: PropTypes.string,
}

export default DivergingBar
