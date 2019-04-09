import React from 'react';





const Tooltip = ({
  visible, 
  title, 
  content, 
  x, 
  y, 
  above,
  left,
  offset = {x: 0, y:0}
}) => {
  const xPos = left ?
    `calc(-110% + ${x + offset.x}px)` :
    `calc(10% + ${x + offset.x}px)`;
  const yPos = above ?
    `calc(-150% + ${y + offset.y}px)` :
    `calc(50% + ${y + offset.y}px)`
  return visible && 
  (
    <div 
      className="tooltip" 
      style={{ 
        transform: `translate(${xPos}, ${yPos})` 
      }}>
      <div className="tooltip__title">{title}</div>
      <div className="tooltip__content">
        {content}
      </div>
    </div>
  )
}


export default Tooltip;