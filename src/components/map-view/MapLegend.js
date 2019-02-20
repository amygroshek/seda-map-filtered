import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStops } from '../../modules/metrics';
import { getChoroplethProperty } from '../../modules/map';

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
    <div 
      className="map-legend__stops"
      
    >
      { hoveredValue && 
        <div 
          className="map-legend__marker" 
          style={{ left: getMarkerLocation(stops, hoveredValue) }}
        /> 
      }
      { stops && stops.map((s, i) =>
        <div 
          key={"stop" + i} 
          className="map-legend__stop"
          style={{
            background: s[1],
          }}
        >
          {(i === 0 || i === stops.length - 1) &&
            <span>{s[0]}</span>
          }
        </div>
      )}
    </div>
  </div>
)

const mapStateToProps = ({ 
  map: { options }, 
  hovered: { feature }, 
  metrics 
}) => ({
  metric: options.metric,
  stops: getStops(metrics, options.metric), 
  hoveredValue: feature ? 
    feature.properties[
      getChoroplethProperty(options)
    ] : null
})

MapLegend.propTypes = {
  hoveredValue: PropTypes.number,
  stops: PropTypes.array,
}

export default connect(mapStateToProps)(MapLegend)