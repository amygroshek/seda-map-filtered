import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core';

const MapLocation = ({ name, onDismissClick }) => {
  return (
    <div className="map-location">
      <Grid container>
        <Grid item>{ name }</Grid>
        <Grid item>
          <Button onClick={onDismissClick}>close</Button>
        </Grid>
      </Grid>
    </div>
  )
}

MapLocation.propTypes = {
  name: PropTypes.string.isRequired,
  onDismissClick: PropTypes.func.isRequired
}

export default MapLocation
