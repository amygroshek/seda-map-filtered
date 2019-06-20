import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';

const Marker = ({ 
  type = 'circle', 
  className, 
  color, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={classNames("marker", {
        "marker--circle": type === 'circle',
        "marker--rect": type === 'rect',
        "marker--arrow": type === 'arrow',
      }, className)}
      style={{
        background: color,
      }}
      {...props}
    >{children}</div>
  )
}

Marker.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
}

export default Marker