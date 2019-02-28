import React from 'react'
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import MapLocation from './MapLocation';
import { compose } from 'redux';

const MapSelectedLocations = ({ selected }) => {
  return (
    <div className="map-locations">
      {selected.map(s =>
        <MapLocation key={s.id} {...s.properties} />  
      )}
    </div>
  )
}

MapSelectedLocations.propTypes = {
  selected: PropTypes.array
}

const mapStateToProps = ({ selected, features }, {  
  match: { params: { region } } 
}) => ({ 
  selected: selected[region]
    .map(k => features[k])
})

const mapDispatchToProps = {}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapSelectedLocations)


