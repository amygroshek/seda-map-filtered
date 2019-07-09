import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import Tooltip from '../atoms/Tooltip';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getFeatureProperty } from '../../modules/features';
import LocationSummary from '../organisms/LocationPanel/LocationSummary';


const ConnectedTooltip = ({
  feature, 
  metric, 
  secondary,
  xVar, 
  yVar,
  x,
  y,
  above,
  left
}) => {
  const featureId = getFeatureProperty(feature, 'id');
  const title = [
    getFeatureProperty(feature, 'name'),
    getFeatureProperty(feature, 'state')
  ].join(', ')
  const stats = useMemo(
    () => [metric, secondary], 
    [metric, secondary]
  )
  return (
    <div className="tooltip__wrapper">
      { (featureId) &&
        <Tooltip 
          title={title} 
          x={x}
          y={y}
          above={above}
          left={left}
        >
          <LocationSummary 
            feature={feature} 
            stats={stats} 
          />
        </Tooltip>
      }
    </div>
  )
}

const mapStateToProps = ({ 
  map: { coords: { x, y } },
  sections: { map: { hovered } }
}, {
  match: { params: { metric, demographic, secondary } }
}) => {
  // console.log('mapping', x, y)
  return {
    metric,
    secondary,
    x,
    y,
    xVar: [demographic, secondary].join('_'),
    yVar: [demographic, metric].join('_'),
    feature: hovered,
    above: window && window.innerHeight && 
      y && y > (window.innerHeight / 3),
    left: window && window.innerWidth && 
      x && x > (window.innerWidth / 3) 
  }
}

const SedaTooltip = compose(
  withRouter,
  connect(mapStateToProps, null)
)(ConnectedTooltip)

export default SedaTooltip