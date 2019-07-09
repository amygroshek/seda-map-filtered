import React, { useMemo } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LocationPanel from '../organisms/LocationPanel';
import { clearActiveLocation } from '../../actions';

const SedaLocationPanel = ({
  active,
  metric,
  features,
  selected,
  clearActiveLocation,
}) => {
  // use memo to store other features
  const others = useMemo(() => 
    selected.map(fId => features[fId])
  , [ selected ])
  return (
    <LocationPanel 
      feature={active} 
      others={others}
      onClose={clearActiveLocation}
      metric={metric}
    />
  )
}

SedaLocationPanel.propTypes = {
  active: PropTypes.object,
  metric: PropTypes.string,
  features: PropTypes.object,
  region: PropTypes.string,
  selected: PropTypes.array,
  clearActiveLocation: PropTypes.func,
}

const mapStateToProps = 
  (
    { features, active, selected },
    { match: { params: { metric, region } } }
  ) => ({
    active,
    features,
    region,
    metric,
    selected: selected[region]
  })

const mapDispatchToProps = (dispatch) => ({
  clearActiveLocation: () => 
    dispatch(clearActiveLocation()),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaLocationPanel)