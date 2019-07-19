import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import Tooltip from '../atoms/Tooltip';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getFeatureProperty } from '../../modules/features';
import { LocationStatSummaryList } from '../organisms/LocationPanel/LocationStats';
import { getLang, getDescriptionForVarName } from '../../modules/lang';
import { getMetricIdFromVarName, getScatterplotVars } from '../../modules/config';
import { getStateName } from '../../constants/statesFips';
import { Typography } from '@material-ui/core';


const getShortVarNameLabel = (varName) => {
  return getLang('LABEL_SHORT_' + getMetricIdFromVarName(varName))
}

const ConnectedTooltip = ({
  feature, 
  x,
  y,
  above,
  left,
  yVar, 
  xVar
}) => {
  if (!feature || !feature.properties) { return null }
  const featureId = getFeatureProperty(feature, 'id');
  const title = getFeatureProperty(feature, 'name');
  const stateName = getStateName(featureId);
  const xVal = getFeatureProperty(feature, xVar);
  const yVal = getFeatureProperty(feature, yVar);
  const stats = useMemo(
    () => [yVar, xVar], 
    [yVar, xVar]
  )
  return (
    <div className="tooltip__wrapper">
      { (featureId) &&
        <Tooltip 
          title={title} 
          subtitle={stateName}
          x={x}
          y={y}
          above={above}
          left={left}
        >
          <LocationStatSummaryList 
            feature={feature} 
            varNames={stats}
            size="small"
            showDescription={false}
            varNameToLabel={getShortVarNameLabel}
          />
          <Typography
            className="tooltip__description"
            variant="caption" 
            dangerouslySetInnerHTML={{
              '__html': getDescriptionForVarName(yVar,yVal) + ' ' +
                        getDescriptionForVarName(xVar,xVal) + ' ' +
                        '<em>' + getLang('TOOLTIP_SUMMARY') + '</em>'
            }}
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
  match: { params: { metric, demographic, region } }
}) => {
  const vars = getScatterplotVars(region, metric, demographic);
  return {
    x,
    y,
    xVar: vars.xVar,
    yVar: vars.yVar,
    feature: hovered,
    above: window && window.innerHeight && 
      y && y > (window.innerHeight / 3),
    left: window && window.innerWidth && 
      x && x > (window.innerWidth / 2) 
  }
}

const SedaTooltip = compose(
  withRouter,
  connect(mapStateToProps, null)
)(ConnectedTooltip)

export default SedaTooltip