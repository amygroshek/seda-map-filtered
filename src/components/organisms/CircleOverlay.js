import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CircleOverlay = ({ 
  circles,
  colors = [ '#f00' ],
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
            key={'circle-' + i}
            className={
              classNames(
                "circle-overlay__circle", 
                { "circle-overlay__circle--active": c.active }
              )
            }
            style={{
              transform: `translate(${c.x},${c.y})`
            }}
          >
            <div 
              className="circle"
              style={{
                background: colors[i%colors.length],
                width: c.z + 'px',
                height: c.z + 'px',
              }}
              onMouseOver={(e) => onHover(c, e)}
              onClick={(e) => onClick(c, e)}
            />
          </div>
          :
          <div key={'circle-' + i} />
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
  colors: PropTypes.array,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
}

export default CircleOverlay
