import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const MapLocation = ({ name, number, onDismissClick, onLocationClick }) => {
  return (
    <MenuItem onClick={onLocationClick} className="map-location">
        <ListItemIcon>
          <span className="number-marker">{number}</span>
        </ListItemIcon>
        <ListItemText 
          inset 
          primary={name}>
        </ListItemText>
        <IconButton 
          size="small" 
          aria-label="Dismiss Location"
          onClick={(e)=> { 
            e.preventDefault();
            e.stopPropagation();
            onDismissClick();
            return false;
          }}
        >
          <CloseIcon />
        </IconButton>
    </MenuItem>
  )
}

MapLocation.propTypes = {
  name: PropTypes.string.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  onLocationClick: PropTypes.func.isRequired,
  number: PropTypes.number
}

export default MapLocation
