import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import CloseButton from '../molecules/CloseButton';
import { Paper, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';
import { getLang } from '../../constants/lang';

const TabPanel = ({ 
  open, 
  tabs, 
  value, 
  onTabChange,
  onClose,
  children
}) => {
  return (
    <Paper
      square={true}
      elevation={2}
      classes={{
        root: classNames(
          'tab-panel', 
          { 'tab-panel--on': open }
        )
      }}
    >
      <Toolbar classes={{ root: 'tab-panel__toolbar' }}>
        <Typography variant="h6">
          { getLang('HELP_PANEL_TITLE') }
        </Typography>
        <CloseButton onClick={onClose} />
      </Toolbar>
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
      <div className="tab-panel__content">
        { children }
      </div>
    </Paper>
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
