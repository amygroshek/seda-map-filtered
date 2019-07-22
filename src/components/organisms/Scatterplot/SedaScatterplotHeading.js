import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getLang } from '../../../modules/lang';
import { getStatePropByAbbr } from '../../../constants/statesFips';
import { getScatterplotVars } from '../../../modules/config';
import { Typography } from '@material-ui/core';

/**
 * Returns a title and subtitle for the scatterplot based on
 * provided data selections
 * @param {*} region 
 * @param {*} metric 
 * @param {*} demographic 
 * @param {*} highlightedState 
 */
const getScatterplotHeading = (region, metric, secondary, demographic, highlightedState) => {
  const vars = getScatterplotVars(region, metric, demographic)
  const titleKey = 'SP_TITLE_' + metric + '_' +
    (vars.xVar.indexOf('ses') > -1 ? 'SES' : 'FRL')
  const state = getStatePropByAbbr(highlightedState, 'full') || 'U.S.';
  const grades = metric === 'avg' ? 'grades 3 - 8' :
    metric === 'grd' ? 'from grades 3 - 8' : 'from 2009 - 2016'
  return {
    title: getLang(titleKey),
    subtitle:  getLang('LABEL_' + metric) + ', ' + 
      state + ' ' +
      getLang('LABEL_' + region.toUpperCase()).toLowerCase() + ', ' + 
      getLang('LABEL_' + demographic.toUpperCase()) + ' students, ' +
      ' ' + grades
  }
}

const ScatterplotHeading = ({
  region, metric, secondary, demographic, highlightedState
}) => {
  const heading = getScatterplotHeading(region, metric, secondary, demographic, highlightedState)
  return (
    <div className='scatterplot__heading'>
      <Typography variant='h6' component="span" className='scatterplot__title'>
        { heading.title }
      </Typography>
      <Typography variant='body2' component="span" className='scatterplot__subtitle'>
        { heading.subtitle }
      </Typography>
    </div>
  )
}

const mapStateToProps = (state,
{ match: { params: { region, metric, secondary, demographic, highlightedState } } }
) => {
  return ({
    region,
    metric,
    secondary,
    demographic,
    highlightedState,
  })
}

ScatterplotHeading.propTypes = {
  region: PropTypes.string,
  metric: PropTypes.string,
  secondary: PropTypes.string,
  demographic: PropTypes.string,
  highlightedState: PropTypes.string,
}

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(ScatterplotHeading)
