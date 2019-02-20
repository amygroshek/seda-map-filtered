import React from 'react';

const Tooltip = ({visible, title, values = [], x, y, offset = {x: 0, y:0}}) =>
  visible && 
  (
    <div className="tooltip" style={{ left: x + offset.x, top: y + offset.y }}>
      <div className="tooltip__title">{title}</div>
      <div className="tooltip__content">
        {values && values.length && values.map((value,i) => (
          <span key={'tt'+i}>
            {
              value.length === 2 ?
                `${value[0]}: ${value[1]}` :
                value[0]
            }
          </span>
        ))}
      </div>
    </div>
  )

export default Tooltip;