import React from 'react'
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import MapLocation from './MapLocation';
import { compose } from 'redux';
import { onRemoveSelectedFeature } from '../../actions/mapActions';

const MapSelectedLocations = ({ selected, removeLocation }) => {
  return (
    <div className="map-locations">
      {selected.map(s =>
        <MapLocation 
          key={s.id}
          {...s.properties}
          onDismissClick={() => removeLocation(s)}
        />  
      )}
    </div>
  )
}

MapSelectedLocations.propTypes = {
  selected: PropTypes.array,
  removeLocation: PropTypes.any
}

const mapStateToProps = ({ selected, features }, {  
  match: { params: { region } } 
}) => ({ 
  selected: selected[region]
    .map(k => features[k])
})

const mapDispatchToProps = (dispatch) => ({
  removeLocation: (feature) => 
    dispatch(onRemoveSelectedFeature(feature))
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapSelectedLocations)


