import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({
  title, 
  children, 
  x, 
  y, 
  above,
  left,
  offset = {x: 0, y:0}
}) => {
  if (!x || !y) { return null; }
  const xPos = left ?
    `calc(-115% + ${x + offset.x}px)` :
    `calc(15% + ${x + offset.x}px)`;
  const yPos = above ?
    `calc(-133% + ${y + offset.y}px)` :
    `calc(33% + ${y + offset.y}px)`
  return (
    <div 
      className="tooltip" 
      style={{ 
        transform: `translate(${xPos}, ${yPos})`,
      }}
    >
      { title && 
        <div className="tooltip__title">{title}</div>
      }
      <div className="tooltip__content">
        {children}
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  x: PropTypes.number,
  y: PropTypes.number,
  above: PropTypes.oneOfType(
    [PropTypes.number, PropTypes.bool]
  ),
  left: PropTypes.oneOfType(
    [PropTypes.number, PropTypes.bool]
  ),
  offset: PropTypes.object,
}


export default Tooltip;