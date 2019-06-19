import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getLang, populateContext } from '../../constants/lang';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Accordion from '../organisms/Accordion';
import { isGapDemographic } from '../../modules/config';


const getQuestionIdsForContext = ({demographic}) => {
  const isGap = isGapDemographic(demographic)
  const ids = [
    'WT_Q1',
    'WT_Q2',
    'WT_Q3',
    'WT_Q4',
  ]
  if (isGap) {
    ids.push('WT_Q5')
  }
  return ids;
}


const getContentForContext = (qId, context) => {
  switch (qId) {
    case 'WT_Q1':
    case 'WT_Q2':
    case 'WT_Q3':
      return getLang(qId + '_' + context.metric, context)
    case 'WT_Q4':
      return getLang(qId + '_' + context.secondary, context)
    case 'WT_Q5':
    case 'WT_Q6':
      return getLang(qId + '_' + context.metric, {
        ...context,
        
      })
    default:
      return qId
  }
}

const SedaHelpAccordion = ({ 
  region, 
  metric, 
  view, 
  demographic, 
}) => {
  const [ expanded, setExpanded ] = useState([]);
  const items = useMemo(() => {
    const context = {
      region, 
      metric, 
      view, 
      demographic, 
      secondary: 'ses', 
      concept:  'concept_' + metric,
      demographic1: demographic[0],
      demographic2: demographic[1]
    }
    return getQuestionIdsForContext(context).map(id => ({
      id,
      heading: getLang(id, populateContext(context)),
      htmlContent: getContentForContext(id, context)
    }))
  }, [])
  return (
    <Accordion
      items={items}
      expanded={expanded}
      onToggle={(itemId) => setExpanded(
        expanded.indexOf(itemId) > -1 ?
          expanded.filter(id => id !== itemId) :
          [ ...expanded, itemId ]
      )}
    />
  )
}

SedaHelpAccordion.propTypes = {
  region: PropTypes.string,
  demographic: PropTypes.string,
  metric: PropTypes.string,
  view: PropTypes.string
}


const mapStateToProps = (
  state,
  { match: { params: { region, demographic, metric, view }}}
) => ({region, demographic, metric, view})

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(SedaHelpAccordion)
