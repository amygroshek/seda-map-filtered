import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Returns a percent based on where the value falls 
 * within the range
 * @param {number} value 
 * @param {array<number>} range 
 */
const getPercentOfRange = (value, range) =>
  ( (value - range[0]) / (range[1] - range[0]) ) * 100

const CircleOverlay = ({ 
  circles, 
  xRange, 
  yRange, 
  sizer,
  variant,
  onHover, 
  onClick,
  ...rest
}) => {
  return (
    <div 
      className={classNames('circle-overlay__root')}
      {...rest}
    >
      {
        circles && circles.map((c,i) => 
          (c.x || c.x === 0) && 
          (c.y || c.y === 0) && 
          (c.z || c.z === 0) ?
          <div 
            key={'circle-' + variant + i}
            className={
              classNames(
                "circle-overlay__circle", 
                { "circle-overlay__circle--active": c.active }
              )
            }
            style={{
              transform: 'translate(' +
                getPercentOfRange(c.x, xRange) + '%,' +
                (100 - getPercentOfRange(c.y, yRange)) + '%)'
            }}
          >
            <div 
              className="circle"
              style={{
                width: sizer(c.z) + 'px',
                height: sizer(c.z) + 'px',
              }}
              onMouseOver={(e) => onHover(c, e)}
              onClick={(e) => onClick(c, e)}
            />
          </div>
          :
          <div key={'circle-' + variant + i} />
        )
      }
    </div>
  )
}

CircleOverlay.propTypes = {
  circles: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number,
      id: PropTypes.string,
      active: PropTypes.bool
    })
  ),
  variant: PropTypes.string,
  xRange: PropTypes.array,
  yRange: PropTypes.array,
  sizer: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
}

export default CircleOverlay
