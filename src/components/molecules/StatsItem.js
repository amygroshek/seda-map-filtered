import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const StatsItem = ({value, label, color, className }) => {
  return (
    <div className={
      classNames("stats__item", className)}
      style={{ borderColor: color }}
    >
      <span className="label stats__item-label">
        { label }
      </span>
      <span className="stats__item-value">
        { value || (value === 0 ? 0 : 'N/A') }
      </span>
    </div>
  )
}

StatsItem.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
}

export default StatsItem;