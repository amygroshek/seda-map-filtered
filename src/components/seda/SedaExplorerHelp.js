import React, { useMemo } from 'react'
import TabPanel from '../organisms/TabPanel';
import { connect } from 'react-redux'
import { getLang, getLanguageForContext } from '../../constants/lang';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';


const HelpPanelContent = ({
  tab,
  metric,
  view,
  region,
  demographic,
  secondary
}) => {
  const content = useMemo(() => 
    getLanguageForContext(
      tab ? 'HOW_' : 'HP_',
      {
        metric,
        view,
        region,
        demographic,
        secondary: 'ses'
      }
    ), 
    [
      tab,
      metric,
      view,
      region,
      demographic,
      secondary
    ]
  ) 
  return (
    <div className="help-content">
      { content.map((c,i) =>
        <p key={'p'+i}>{c}</p>
      )}
    </div>
  )
}

const mapStateToProps = (
  { ui: { helpOpen, helpTab } },
  { match: { params: { region, demographic, metric, view }}}
) => ({
  open: helpOpen,
  value: helpTab,
  tabs: [
    {
      label: getLang('HELP_PANEL_WHAT_TAB'),
      value: 0
    },
    {
      label: getLang('HELP_PANEL_HOW_TAB'),
      value: 1
    },
  ],
  children: <HelpPanelContent
    {...{ tab: helpTab, region, demographic, metric, view }}
  />
})

const mapDispatchToProps = (dispatch) => ({
  onTabChange: (e, value) => {
    dispatch({
      type: 'SET_HELP_TAB',
      tab: value
    })
  },
  onClose: () => {
    dispatch({
      type: 'TOGGLE_HELP',
      open: false
    })
  }  
})


export default compose(
  withRouter,
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )
)(TabPanel)
