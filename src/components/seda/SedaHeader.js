

import { withRouter } from 'react-router-dom';
import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as _debounce from 'lodash.debounce';

// lang
import { getLang } from '../../constants/lang';

// modules
import { getMapControls } from '../../modules/controls';
import { updateRoute } from '../../modules/router';

// components
import Header from '../base/Header';
import Logo from '../../components/base/Logo';
import ToggleButtons from '../base/ToggleButtons';
import MenuSentence from '../../components/base/MenuSentence';
import TabLabel from '../../components/base/TabLabel';

const TABS = [
  {
    id: 'avg',
    icon: '/assets/img/avg.svg',
    text: getLang('TAB_CONCEPT_AVG'),
    subtext: getLang('TAB_METRIC_AVG'),
  },
  {
    id: 'grd',
    icon: '/assets/img/grd.svg',
    text: getLang('TAB_CONCEPT_GRD'),
    subtext: getLang('TAB_METRIC_GRD'),
  },
  {
    id: 'coh',
    icon: '/assets/img/coh.svg',
    text: getLang('TAB_CONCEPT_COH'),
    subtext: getLang('TAB_METRIC_COH'),
  }
]

const HeaderPrimary = ({metric, onMetricChange}) => {
  return <div className='header-tabs'>
    <Tabs 
      value={metric} 
      onChange={(e, metricId) => { onMetricChange(metricId) }}
      classes={{ indicator: 'tab__indicator' }}
    >
    { 
      TABS.map((t,i) =>
        <Tab 
          key={'tab'+i}
          value={t.id}
          label={
            <TabLabel { ...TABS[i] } />
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
      items={['map', 'chart', 'both']}
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
    onActionClick={onMenuClick}
  />

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
  onMetricChange: _debounce((metricId) => {
    updateRoute(ownProps, { metric: metricId })
  }, 400),
  onViewChange: (view) => 
    dispatch({ 
      type: 'SET_VIEW', 
      view: view === 'map' ? 
        'right' : 
        view ==='chart' ? 'left' : 'split' 
    }),
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