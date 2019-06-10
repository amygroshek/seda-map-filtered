import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Marker = ({ color, className, style, ...rest }) => {
  return (
    <div
      className={classNames('marker', className)}
      style={{
        backgroundColor: color,
        ...style
      }}
      {...rest}
    ></div>
  )
}

Marker.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Marker
