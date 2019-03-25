import { connect } from 'react-redux';
import Tooltip from '../base/Tooltip';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getStateName } from '../../constants/statesFips';
import { underscoreCombine } from '../../utils';

/**
 * Get the label for the provided metric and value
 * @param {*} metric 
 * @param {*} value 
 */
const getMetricLabel = (metric, value) => {
  if (!value || value <= -9999) { return 'Data unavailable' }
  switch (metric) {
    case 'avg':
      return `Students score ${Math.round(Math.abs(value)*100)/100} grade levels 
        ${value > 0 ? 'above' : 'below'} average`;
    case 'grd':
      return `Students grow ${Math.round(value*100)/100} grade levels each year`;
    case 'coh':
      return `Test scores ${value > 0 ? 'raising' : 'falling'} ${Math.round(Math.abs(value)*100)/100} 
        grade levels over time`;
    default:
      throw new Error(`no label for ${metric}`)
  }
}

/**
 * Gets the location name for the title of the tooltip
 * @param {*} feature 
 */
const getFeatureTitle = (feature) => {
  if (
    feature && 
    feature.properties && 
    feature.properties.name
  ) {
    return feature.properties.name + ', '
      + getStateName(feature.properties.id)
  }
  return null;
}

const mapStateToProps = ({ 
  hovered: { feature, coords }
}, {
  match: { params: { metric, demographic } }
}) => {
  const varName = underscoreCombine(demographic, metric)
  return {
    x: coords && coords.x,
    y: coords && coords.y,
    visible: Boolean(feature) && Boolean(coords),
    title: getFeatureTitle(feature),
    content: feature && feature.properties && feature.properties[varName] ? 
      getMetricLabel(metric, feature.properties[varName]) :  ''
  }
}

const MapTooltip = compose(
  withRouter,
  connect(mapStateToProps, null)
)(Tooltip)

export default MapTooltip