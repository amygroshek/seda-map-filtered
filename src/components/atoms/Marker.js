import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Marker = ({ children, color, className, style, ...rest }) => {
  return (
    <div
      className={classNames('marker', className)}
      style={{
        backgroundColor: color,
        ...style
      }}
      {...rest}
    >{children}</div>
  )
}

Marker.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
}

export default Marker
