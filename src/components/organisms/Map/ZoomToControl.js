import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { onHighlightedStateChange } from '../../../actions'

export const ZoomToControl = ({title, onButtonClick}) => {
  return (
    <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
      <button 
        className="mapboxgl-ctrl-icon mapboxgl-ctrl-us" 
        title={title}
        onClick={onButtonClick}
      ></button>
    </div>
  )
}

ZoomToControl.propTypes = {
  title: PropTypes.string,
  onButtonClick: PropTypes.func,
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onButtonClick: () =>
    dispatch(onHighlightedStateChange('us', ownProps))
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(ZoomToControl)
