import React from 'react';

const Tooltip = ({visible, title, values = [], x, y}) =>
  visible && 
  (
    <div className="tooltip" style={{ left: x, top: y }}>
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