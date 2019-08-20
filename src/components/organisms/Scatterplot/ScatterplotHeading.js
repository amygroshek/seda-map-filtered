import React from 'react'
import PropTypes from 'prop-types'
import { getLang } from '../../../modules/lang';
import { getStatePropByAbbr } from '../../../constants/statesFips';
import { isGapVarName, isVersusFromVarNames, getMetricIdFromVarName, getDemographicIdFromVarName, getSingularRegion } from '../../../modules/config';
import { Typography } from '@material-ui/core';

/** Returns the title string for the provded vars */
const getTitle = (xVar, yVar, region) => {
  const isGap = isGapVarName(yVar);
  const isVersus = isVersusFromVarNames(xVar, yVar);
  const titleKey = isGap ? 'SP_TITLE_GAP' :
    isVersus ? 'SP_TITLE_VS' : 'SP_TITLE'
  return getLang(titleKey, {
    metric: getLang('LABEL_CONCEPT_' + getMetricIdFromVarName(yVar)),
    secondary: getLang('LABEL_' + getMetricIdFromVarName(xVar), { region: getSingularRegion(region)}),
  })
}

/** Returns the subtitle for the provided vars */
const getSubtitle = (xVar, yVar, region, highlightedState) => {
  const state = getStatePropByAbbr(highlightedState, 'full') || 'U.S.';
  const isGap = isGapVarName(yVar)
  const isVersus = isVersusFromVarNames(xVar, yVar);
  let demId = getDemographicIdFromVarName(yVar);
  // get proper gap label if it is demographics vs.
  if (isVersus) {
    const dem2Id = getDemographicIdFromVarName(xVar);
    demId = (demId === 'np' || dem2Id === 'np') ? 'PN' : demId + dem2Id;
  }
  return getLang('SP_SUBTITLE', {
    place: state,
    region: region,
    demographic: isGap || isVersus ? 
      getLang('LABEL_SHORT_' + demId) + ' students' :
      getLang('LABEL_' + demId)  + ' students'
  })
}

const ScatterplotHeading = ({
  xVar, yVar, region, highlightedState
}) => {
  const title = getTitle(xVar, yVar, region);
  const subtitle = getSubtitle(xVar, yVar, region, highlightedState);
  return (
    <div className='scatterplot__heading'>
      <Typography variant='h6' component="span" className='scatterplot__title'>
        { title }
      </Typography>
      <Typography variant='body2' component="span" className='scatterplot__subtitle'>
        { subtitle }
      </Typography>
    </div>
  )
}

ScatterplotHeading.propTypes = {
  xVar: PropTypes.string,
  yVar: PropTypes.string,
  region: PropTypes.string,
  highlightedState: PropTypes.string,
}

export default ScatterplotHeading;