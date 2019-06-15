import React, { useState } from 'react'
// import TabPanel from '../organisms/TabPanel';
import { connect } from 'react-redux'
import { getLang, populateContext } from '../../constants/lang';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
// import { Typography } from '@material-ui/core';
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

const SedaHelpAccordion = ({ dispatch, match, location, history, staticContext, ...props}) => {
  const [ expanded, setExpanded ] = useState([]);
  return (
    <Accordion
      {...props} 
      expanded={expanded}
      onToggle={(itemId) => setExpanded(
        expanded.indexOf(itemId) > -1 ?
          expanded.filter(id => id !== itemId) :
          [ ...expanded, itemId ]
      )}
    />
  )
}



const mapStateToProps = (
  state,
  { match: { params: { region, demographic, metric, view }}}
) => { 
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
  
  return ({
    items: getQuestionIdsForContext(context).map(id => ({
      id,
      heading: getLang(id, populateContext(context)),
      content: getContentForContext(id, context)
    }))
  })

} 


export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(SedaHelpAccordion)
