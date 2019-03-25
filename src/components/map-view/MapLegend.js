import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getStopsForMetric } from '../../modules/config';
import { getChoroplethProperty } from '../../modules/map';
import ColorStops from './ColorStops';

const getMarkerLocation = (stops, value) => {
  const min = stops[0][0];
  const max = stops[stops.length - 1][0];
  const offset = (0 - min);
  const percent = (100 * (value + offset) / (max + offset)) + '%';
  return percent;
}

const MapLegend = ({ hoveredValue, stops }) => (
  <div className="map-legend">
    <div className="map-legend__label">
      Legend
    </div>
    <div className="map-legend__stops">
      { hoveredValue && 
        <div 
          className="map-legend__marker" 
          style={{ left: getMarkerLocation(stops, hoveredValue) }}
        /> 
      }
      { stops && 
        <ColorStops stops={stops} label={true} />
      }
    </div>
  </div>
)

const mapStateToProps = ({ 
  hovered: { feature }
}, {
  match: { params }
}) => ({
  metric: params.metric,
  stops: getStopsForMetric(params.metric), 
  hoveredValue: feature ? 
    feature.properties[
      getChoroplethProperty(params)
    ] : null
})

MapLegend.propTypes = {
  hoveredValue: PropTypes.number,
  stops: PropTypes.array,
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(MapLegend)