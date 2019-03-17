import React from 'react'
import PropTypes from 'prop-types'

function LocationStats(props) {
  return (
    <div className='location-stats'>
      <div className='location-stats__name'></div>
    </div>
  )
}

LocationStats.propTypes = {
  location: PropTypes.object.required
}

export default LocationStats

