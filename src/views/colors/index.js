
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import SedaPage from '../../components/seda/SedaPage';
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
  return (
    <SedaPage>
      <div style={{ width: 480, position:'absolute', left: 16 , bottom: 16, zIndex:10000, padding: 16}}>
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
    </SedaPage>
  )
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
