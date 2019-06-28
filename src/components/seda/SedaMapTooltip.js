import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import Tooltip from '../atoms/Tooltip';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getTooltipText } from '../../style/scatterplot-style';
import { getFeatureProperty } from '../../modules/features';


const ConnectedTooltip = ({feature, xVar, yVar, ...rest}) => {
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
    <Tooltip 
      title={title} 
      content={content} 
      {...rest}
    />
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

const MapTooltip = compose(
  withRouter,
  connect(mapStateToProps, null)
)(ConnectedTooltip)

export default MapTooltip