import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import Tooltip from '../atoms/Tooltip';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getTooltipText } from '../../modules/lang';
import { getFeatureProperty } from '../../modules/features';


const ConnectedTooltip = ({
  feature, 
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
  const values = {
    [xVar]: getFeatureProperty(feature, xVar),
    [yVar]: getFeatureProperty(feature, yVar)
  }
  const content = useMemo(
    () => featureId ? getTooltipText(values) : '', 
    [featureId]
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
          <div dangerouslySetInnerHTML={{'__html': content }} />
        </Tooltip>
      }
    </div>
  )
}

const mapStateToProps = ({ 
  map: { coords: { x, y }, viewport },
  sections: { map: { hovered } }
}, {
  match: { params: { metric, demographic, secondary } }
}) => {
  // console.log('mapping', x, y)
  return {
    x,
    y,
    xVar: [demographic, secondary].join('_'),
    yVar: [demographic, metric].join('_'),
    feature: hovered,
    above: viewport && viewport.height && 
      y && y > (viewport.height / 3),
    left: viewport && viewport.width && 
      x && x > (viewport.width / 3) 
  }
}

const SedaTooltip = compose(
  withRouter,
  connect(mapStateToProps, null)
)(ConnectedTooltip)

export default SedaTooltip