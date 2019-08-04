import React, { useMemo } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LocationPanel from '../organisms/LocationPanel';
import { clearActiveLocation, setDemographicAndMetric, loadLocation, handleLocationActivation, toggleHelp, showSingleHelpTopic } from '../../actions';

const SedaLocationPanel = ({
  active,
  metric,
  helpOpen,
  features,
  selected,
  clearActiveLocation,
  onGapClick,
  onHelpClick,
  onSelectFeature,
}) => {
  // use memo to store other features
  const others = useMemo(() => 
    selected.map(fId => features[fId])
  , [ selected ])
  const handleHelpClick = (topicId) => onHelpClick(topicId, helpOpen)
  return (
    <LocationPanel 
      feature={active} 
      others={others}
      onClose={clearActiveLocation}
      metric={metric}
      onGapClick={onGapClick}
      onHelpClick={handleHelpClick}
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
  onHelpClick: PropTypes.func,
  onSelectFeature: PropTypes.func,
  helpOpen: PropTypes.bool,
}

const mapStateToProps = 
  (
    { features, active, selected, ui: { helpOpen } },
    { match: { params: { metric, region } } }
  ) => ({
    active,
    features,
    region,
    metric,
    helpOpen,
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
  },
  onHelpClick: (topicId, helpOpen) => {
    !helpOpen && dispatch(toggleHelp());
    dispatch(showSingleHelpTopic(topicId))
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaLocationPanel)