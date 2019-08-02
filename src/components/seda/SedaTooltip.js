import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tooltip from '../atoms/Tooltip';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getFeatureProperty } from '../../modules/features';
import { LocationStatSummaryList } from '../organisms/LocationPanel/LocationStats';
import { getLang, getDescriptionForVarName } from '../../modules/lang';
import { getDemographicIdFromVarName, getMetricIdFromVarName, isVersusFromVarNames, getDemographicForVarNames } from '../../modules/config';
import { getStateName } from '../../constants/statesFips';
import { Typography } from '@material-ui/core';


const getShortVarNameLabel = (varName) => {
  return getLang('LABEL_SHORT_' + getMetricIdFromVarName(varName))
}

const getDemographicLabel = (varName) => {
  const dem = getDemographicIdFromVarName(varName);
  return getLang('LABEL_' + dem)
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
  const statVars = useMemo(
    () => [yVar, xVar], 
    [yVar, xVar]
  )
  const isVersus = isVersusFromVarNames(xVar, yVar);
  const descriptionVars = useMemo(() => {
    return isVersus ?
      [ getDemographicForVarNames(xVar, yVar) + '_' + xVar.split('_')[1] ] :
      [ yVar, xVar ]
  }, [ xVar, yVar ])
  // add var to feature if missing
  if (
    isVersus && 
    !getFeatureProperty(feature, descriptionVars[0])
  ) {
    feature.properties[descriptionVars[0]] = 
      getFeatureProperty(feature, yVar) - getFeatureProperty(feature, xVar)
  }
  const description = descriptionVars.reduce((desc, varName) => {
    const val = getFeatureProperty(feature, varName);
    return val || val === 0 ?
      (desc + getDescriptionForVarName(varName, val) + ' ') :
      desc
  }, '')
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
            varNames={statVars}
            size="small"
            showDescription={false}
            varNameToLabel={isVersus ? 
              getDemographicLabel : 
              getShortVarNameLabel
            }
          />
          <Typography
            className="tooltip__description"
            variant="caption" 
            dangerouslySetInnerHTML={{
              '__html': description + 
                        '<em>' + getLang('TOOLTIP_SUMMARY') + '</em>'
            }}
          />
        </Tooltip>
      }
    </div>
  )
}

ConnectedTooltip.propTypes = {
  feature: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  above: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.number
  ]),
  left: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.number
  ]),
  yVar: PropTypes.string,
  xVar: PropTypes.string,
}

const mapStateToProps = ({ 
  map: { coords: { x, y } },
  sections: { hovered, active },
  tooltip,
}) => {

  return {
    x,
    y,
    xVar: tooltip.xVar,
    yVar: tooltip.yVar,
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