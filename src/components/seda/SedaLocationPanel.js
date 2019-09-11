import React, { useMemo } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LocationPanel from '../organisms/LocationPanel';
import { onReportDownload, clearActiveLocation, setDemographicAndMetric, loadLocation, handleLocationActivation, toggleHelp, showSingleHelpTopic, onShowSimilar } from '../../actions';
import { getRegionFromFeature } from '../../modules/config';
import { getFeatureProperty } from '../../modules/features';
import axios from 'axios';

const getFeatureFlags = (feature, flagged) => {
  const featureId = getFeatureProperty(feature, 'id');
  const region = getRegionFromFeature(feature);
  if (region !== 'schools') { return [] }
  return ['sped', 'gifted', 'lep'].filter((f) => {
    return flagged[f].indexOf(featureId) > -1
  })
}

const SedaLocationPanel = ({
  active,
  metric,
  helpOpen,
  features,
  selected,
  flagged,
  clearActiveLocation,
  onGapClick,
  onHelpClick,
  onSelectFeature,
  onDownloadReport
}) => {
  // use memo to store other features
  const others = useMemo(() => 
    selected.map(fId => features[fId])
  , [ selected ])
  const flags = useMemo(() => 
    getFeatureFlags(active, flagged)
  , [ active, flagged ])
  const handleHelpClick = (topicId) => onHelpClick(topicId, helpOpen)
  return (
    <LocationPanel 
      feature={active} 
      others={others}
      flags={flags}
      onClose={clearActiveLocation}
      metric={metric}
      onGapClick={onGapClick}
      onHelpClick={handleHelpClick}
      onSelectFeature={onSelectFeature}
      onShowSimilar={onShowSimilar}
      onDownloadReport={onDownloadReport}
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
  onShowSimilar: PropTypes.func,
  helpOpen: PropTypes.bool,
}

const mapStateToProps = 
  (
    { features, active, selected, ui: { helpOpen }, flagged },
    { match: { params: { metric, region } } }
  ) => ({
    active,
    features,
    flagged,
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
    // feature is a stub, need to load full data
    if (feature.stub) {
      dispatch(loadLocation(feature.properties))
    } else {
      dispatch(handleLocationActivation(feature))
    }
  },
  onShowSimilar: (feature) => {
    dispatch(onShowSimilar(feature))
  },
  onHelpClick: (topicId, helpOpen) => {
    !helpOpen && dispatch(toggleHelp());
    dispatch(showSingleHelpTopic(topicId))
  },
  onDownloadReport: (feature) => {
    dispatch(onReportDownload(feature))
    axios({
      url: 'http://localhost:3001/',
      method: 'POST',
      data: {
        "region": "county",
        "location": {
          ...feature.properties,
          "diff_avg": -1.244,
          "diff_grd": -12,
          "diff_coh": 1.34499
        },
        "url": "https://specific-view-selected.test",
        "others": null
      },
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', feature.properties.name+'.pdf');
      document.body.appendChild(link);
      link.click();
    });
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaLocationPanel)