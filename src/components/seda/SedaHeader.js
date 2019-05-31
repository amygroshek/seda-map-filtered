

import { withRouter } from 'react-router-dom';
import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import * as _debounce from 'lodash.debounce';

// constants
import { HEADER } from '../../constants/site';

// modules
import { getMapControls } from '../../modules/controls';
import { updateRoute } from '../../modules/router';

// components
import Header from '../base/Header';
import Logo from '../../components/base/Logo';
import ToggleButtons from '../molecules/ToggleButtons';
import MenuSentence from '../../components/base/MenuSentence';
import HeaderTab from '../molecules/HeaderTab';
import SedaMenu from './SedaMenu';


const HeaderPrimary = ({metric, onMetricChange}) => {
  return <div className='header-tabs'>
    <Tabs 
      value={metric} 
      onChange={(e, metricId) => { onMetricChange(metricId) }}
      classes={{ indicator: 'tab__indicator' }}
    >
    { 
      HEADER.tabs.map((t,i) =>
        <Tab 
          key={'tab'+i}
          value={t.id}
          label={
            <HeaderTab { ...HEADER.tabs[i] } />
          }
          classes={{
            root: 'tab',
            selected: 'tab--selected'
          }} 
        />
      )
    }
    </Tabs>
  </div>
}

HeaderPrimary.propTypes = {
  metric: PropTypes.string,
  onMetricChange: PropTypes.func
}

const HeaderSecondary = ({
  text, 
  controls, 
  view, 
  onViewChange, 
  onOptionChange
}) => {
  return <div className="header__inner-content">
    <MenuSentence
      controls={controls}
      text={text}
      onChange={onOptionChange}
    />
    <ToggleButtons
      items={['map', 'chart', 'split']}
      activeItem={view}
      setActiveItem={onViewChange}
    />
  </div>
}


HeaderSecondary.propTypes = {
  text: PropTypes.string,
  controls: PropTypes.array,
  view: PropTypes.string,
  onOptionChange: PropTypes.func,
  onViewChange: PropTypes.func,
}

const SedaHeader = ({
  metric,
  view,
  text,
  controls,
  onMetricChange,
  onOptionChange,
  onViewChange,
  onMenuClick
}) => 
  <Header
    branding={<Logo />}
    primaryContent={
      <HeaderPrimary {...{metric, onMetricChange }} />
    }
    secondaryContent={
      <HeaderSecondary {...{text, controls, view, onViewChange, onOptionChange}} />
    }
    actionContent={
      <IconButton onClick={onMenuClick}>
        <MenuIcon />
      </IconButton>
    }
  >
    <SedaMenu />
  </Header>

SedaHeader.propTypes = {
  metric: PropTypes.string,
  view: PropTypes.string,
  text: PropTypes.string,
  controls: PropTypes.array,
  onMetricChange: PropTypes.func,
  onOptionChange: PropTypes.func,
  onViewChange: PropTypes.func,
  onMenuClick: PropTypes.func
}

const mapStateToProps = (
  { view, sections },
  ownProps
) => ({
  view,
  metric: ownProps.match.params.metric,
  ...getMapControls(
    ownProps.match.params.region, 
    sections['map'].vars, 
    ownProps.match.params.highlightedState
  )
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMenuClick: () => dispatch({
    type: 'TOGGLE_MENU',
    open: true
  }),
  onMetricChange: _debounce((metricId) => {
    updateRoute(ownProps, { metric: metricId })
  }, 400),
  onViewChange: (view) => {
    console.log(view)
    updateRoute(ownProps, { view })
  },
  onOptionChange: (id, option) => dispatch((dispatch) => {
    switch(id) {
      case 'highlight':
        return updateRoute(ownProps, { 
          highlightedState: option.id
        })
      case 'region':
        return updateRoute(ownProps, { region: option.id })
      case 'demographic':
        dispatch({
          type: 'SET_REPORT_VARS',
          sectionId: 'map',
          optionId: id,
          value: option.id
        })
        return updateRoute(ownProps, { demographic: option.id })
      default:
        return dispatch({
          type: 'SET_REPORT_VARS',
          sectionId: 'map',
          optionId: id,
          value: option.id
        })
    }
  }),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SedaHeader)
)