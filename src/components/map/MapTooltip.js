import { connect } from 'react-redux';
import Tooltip from '../base/Tooltip';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getStateName } from '../../constants/statesFips';
import { underscoreCombine } from '../../utils';
import { getMetricTooltip } from '../../modules/config';

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
  map: { coords },
  sections: { map: { hovered } }
}, {
  match: { params: { metric, demographic } }
}) => {
  const varName = underscoreCombine(demographic, metric)
  return {
    x: coords && coords.x,
    y: coords && coords.y,
    visible: Boolean(hovered) && Boolean(coords),
    title: getFeatureTitle(hovered),
    content: hovered && hovered.properties && hovered.properties[varName] ? 
      getMetricTooltip(metric, hovered.properties[varName]) :  ''
  }
}

const MapTooltip = compose(
  withRouter,
  connect(mapStateToProps, null)
)(Tooltip)

export default MapTooltip