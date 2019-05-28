
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import SedaHeader from '../../components/seda/SedaHeader';
import MapSection from '../../components/sections/MapSection';
import { updateRoute } from '../../modules/router';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';


import * as isColor from 'is-color';

/**
 * route variables for this view
 */
const routeVars = [ 
  'highlightedState',
  'region', 
  'metric', 
  'demographic', 
  'zoom', 
  'lat', 
  'lon', 
  'color' 
];


const isValidColorString = (colorString) => {
  const colors = colorString.split(',')
    .map(v => v.length === 6 ? '#' + v : v)
  if (colors.length !== 7) { return false; }
  return colors.reduce(
    (isValid, curr) => isValid ? isColor(curr) : false,
    true
  )
}

const ColorsView = ({color, onColorChange }) => {
  const [ colorString, setColorString] = useState(color);
  return <div id="scrollWrapper" className="map-tool map-tool--parallax">
    <SedaHeader 
      onMenuClick={() => { console.log('menu') }}
    />
    <MapSection />
    <div style={{padding: 16}}>
      <TextField
        id="filled-multiline-flexible"
        label="Map Colors"
        multiline
        rowsMax="4"
        value={colorString}
        onChange={(e) => { 
          setColorString(e.target.value);
          onColorChange(e.target.value);
        }}
        margin="normal"
        fullWidth
      />
    </div>
  </div>
}

ColorsView.propTypes = {
  color: PropTypes.string,
  onColorChange: PropTypes.func
}


const mapStateToProps = (state, ownProps) => {
  return {
    color: ownProps.match.params.color
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onColorChange: (colors) => {
    if (isValidColorString(colors)) {
      updateRoute(ownProps, { color: colors }, routeVars)
    } else {console.log('invalid color', colors)}
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ColorsView)
