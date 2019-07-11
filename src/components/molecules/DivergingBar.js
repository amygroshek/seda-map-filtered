import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const DivergingBar = ({
  minLabel,
  maxLabel,
  midLabel,
  value,
  valueLabel,
  color,
  className,
  size,
}) => {
  return (
    <div className={
      classNames(
        "diverging-bar", 
        className,
        { "diverging-bar--large": size === 'large' },
        { "diverging-bar--small": size === 'small' },
        { "diverging-bar--above": value > 0 },
        { "diverging-bar--below": value < 0 },
        { "diverging-bar--mid": value === 0 },
        { "diverging-bar--unavailable": !value && value !== 0 }
      )
    }>
      <div className='diverging-bar__bar-wrapper'>
        <span className='diverging-bar__rect-value' style={{
          background: color,
          transform: value || value === 0 ? 'scaleX(' + value/2 + ')' : null,
        }} />
        <span className='diverging-bar__label diverging-bar__label--value'
          style={{
            left: value || value === 0 ? 
              (100*(value + 1)/2 + '%') : null
          }}
        >
          {valueLabel || value || 'Unavailable' }
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
  minLabel: PropTypes.string,
  maxLabel: PropTypes.string,
  midLabel: PropTypes.string,
  value: PropTypes.number,
  valueLabel: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
}

export default DivergingBar
