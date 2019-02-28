import React from 'react'
import PropTypes from 'prop-types'


const MapLocation = ({ name }) => {
  return (
    <div className="map-location">
      { name }
    </div>
  )
}

MapLocation.propTypes = {
  name: PropTypes.string.isRequired
}

export default MapLocation
