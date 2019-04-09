import React from 'react';

const Tooltip = ({visible, title, content, x, y, offset = {x: 0, y:0}}) =>
  visible && 
  (
    <div 
      className="tooltip" 
      style={{ 
        transform: `translate(${x + offset.x}px, ${y + offset.y}px)` 
      }}>
      <div className="tooltip__title">{title}</div>
      <div className="tooltip__content">
        {content}
      </div>
    </div>
  )

export default Tooltip;