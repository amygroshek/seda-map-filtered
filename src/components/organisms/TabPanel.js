import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab, Typography } from '@material-ui/core';
import { getLang } from '../../modules/lang';
import Panel from '../molecules/Panel';

const TabPanel = ({ 
  tabs, 
  value, 
  onTabChange,
  children,
  ...props
}) => {
  return (
    <Panel
      title={
        <Typography variant="h6">
          {getLang('HELP_PANEL_TITLE')}
        </Typography>
      }
      {...props}
    >
      { tabs && 
        <Tabs 
          value={value} 
          onChange={onTabChange}
          variant="fullWidth"
          classes={{ 
            root: 'tabs__root', 
            indicator: 'tab__indicator' 
          }}
        >
          { 
            tabs.map((tab, i) =>
              <Tab 
                key={'tab' + i}
                {...tab}
                classes={{
                  root: 'tab',
                  selected: 'tab--selected',
                  wrapper: 'tab__wrapper'
                }} 
              />
            )
          }
        </Tabs>
      }
      { children }
    </Panel>
  )
}

TabPanel.propTypes = {
  open: PropTypes.bool,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string, 
        PropTypes.number
      ]),
      label: PropTypes.string,
    })
  ),
  value: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.number
  ]),
  children: PropTypes.node,
  onTabChange: PropTypes.func,
  onClose: PropTypes.func,
}

export default TabPanel
