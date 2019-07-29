import React, { useMemo } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LocationPanel from '../organisms/LocationPanel';
import { clearActiveLocation, setDemographicAndMetric, loadLocation, handleLocationActivation } from '../../actions';

const SedaLocationPanel = ({
  active,
  metric,
  features,
  selected,
  clearActiveLocation,
  onGapClick,
  onSelectFeature,
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
      onGapClick={onGapClick}
      onSelectFeature={onSelectFeature}
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
  onGapClick: PropTypes.func,
  onSelectFeature: PropTypes.func,
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  onGapClick: (gapId, metricId) => {
    dispatch(setDemographicAndMetric(gapId, metricId, ownProps))
  },
  clearActiveLocation: () => 
    dispatch(clearActiveLocation()),
  onSelectFeature: (feature) => {
    console.log('onSelectFeature', feature)
    // feature is a stub, need to load full data
    if (feature.stub) {
      dispatch(loadLocation(feature.properties))
    } else {
      dispatch(handleLocationActivation(feature))
    }
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaLocationPanel)