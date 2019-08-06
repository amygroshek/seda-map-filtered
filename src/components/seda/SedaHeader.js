

import { withRouter } from 'react-router-dom';
import React from 'react'
import classNames from 'classnames';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import PlaceIcon from '@material-ui/icons/Place';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import * as _debounce from 'lodash.debounce';
import withWidth from '@material-ui/core/withWidth';

// constants
import { HEADER } from '../../constants/site';

// modules
import { HighlightedStateControl, RegionControl, DemographicAndGapControl } from './SedaSelectControls';

// components
import Header from '../organisms/Header';
import Logo from '../atoms/Logo';
import ToggleButtons from '../molecules/ToggleButtons';
import HeaderTab from '../molecules/HeaderTab';
import SedaMenu from './SedaMenu';
import SedaSearch from './SedaSearch';
import { getLang } from '../../modules/lang';
import SelectButton from '../atoms/SelectButton';
import MenuButton from '../atoms/MenuButton';
import HelpButton from '../molecules/HelpButton';
import { toggleHelp, onMetricChange, onViewChange } from '../../actions';

const HeaderPrimary = ({metric, width, onMetricChange}) => {
  return <div className='header-tabs'>
    <SelectButton
      text={getLang('TAB_CONCEPT_'+ metric)}
      subtext={getLang('TAB_METRIC_'+ metric)}
      onClick={() => alert('not implemented yet')}
    />
    <Tabs 
      value={metric}
      variant={width === 'sm' ? 'scrollable' : undefined}
      onChange={(e, metricId) => { onMetricChange(metricId) }}
      classes={{ root: 'tabs__root', indicator: 'tab__indicator' }}
      scrollButtons='off'
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
            selected: 'tab--selected',
            wrapper: 'tab__wrapper'
          }} 
        />
      )
    }
    </Tabs>
  </div>
}

HeaderPrimary.propTypes = {
  metric: PropTypes.string,
  onMetricChange: PropTypes.func,
  width: PropTypes.string,
}

/**
 * Gets the controls for the map section
 * @param {string} metric 
 * @param {string} demographic 
 * @param {string} region 
 * @param {string} highlightedState 
 */
export const HeaderSecondaryControls = ({ region, metric }) => {
  return (
    region === 'schools' ?
      <div className="menu-sentence">
        Showing data by 
        <RegionControl /> 
        for 
        <HighlightedStateControl />
      </div> :
      <div className="menu-sentence">
        Showing data for 
        <DemographicAndGapControl />
        by
        <RegionControl /> 
        in 
        <HighlightedStateControl />
      </div>
  )
}

const HeaderSecondary = ({
  view, 
  metric,
  helpOpen,
  region,
  onHelpClick,
  onViewChange, 
}) => {
  return <div className="header__inner-content">
    <HelpButton
      className={classNames({ 'button--help-on': helpOpen})}
      onClick={onHelpClick}
    />
    <SedaSearch inputProps={{
      placeholder: getLang('SEARCH_PLACEHOLDER')
    }} />
    <HeaderSecondaryControls metric={metric} region={region} />
    <ToggleButtons
      items={[
        {
          id: 'map',
          label: 'Map',
          icon: <PlaceIcon />
        },
        {
          id: 'chart',
          label: 'chart',
          icon: <BubbleChartIcon />
        }, 
        {
          id: 'split',
          label: "Chart + Map",
          icon: <VerticalSplitIcon />
        }
      ]}
      activeItemId={view}
      setActiveItem={onViewChange}
    />
  </div>
}


HeaderSecondary.propTypes = {
  region: PropTypes.string,
  view: PropTypes.string,
  helpOpen: PropTypes.bool,
  onOptionChange: PropTypes.func,
  onViewChange: PropTypes.func,
  onHelpClick: PropTypes.func,
}

const SedaHeader = ({
  metric,
  view,
  region,
  width,
  helpOpen,
  onMetricChange,
  onOptionChange,
  onViewChange,
  onMenuClick,
  onHelpClick,
  ...rest
}) => 
  <Header
    branding={
      <Logo />
    }
    primaryContent={
      <HeaderPrimary {...{width, metric, onMetricChange }} />
    }
    secondaryContent={
      <HeaderSecondary {...{metric, region, view, helpOpen, onViewChange, onHelpClick}} />
    }
    actionContent={
      <MenuButton onClick={onMenuClick}>
        <MenuIcon />
      </MenuButton>
    }
    {...rest}
  >
    <SedaMenu />
  </Header>

SedaHeader.propTypes = {
  metric: PropTypes.string,
  view: PropTypes.string,
  text: PropTypes.string,
  region: PropTypes.string,
  controls: PropTypes.array,
  width: PropTypes.string,
  helpOpen: PropTypes.bool,
  onMetricChange: PropTypes.func,
  onOptionChange: PropTypes.func,
  onViewChange: PropTypes.func,
  onMenuClick: PropTypes.func,
  onHelpClick: PropTypes.func,
}

const mapStateToProps = (
  { ui: { helpOpen } },
  ownProps
) => ({
  helpOpen: helpOpen,
  view: ownProps.match.params.view,
  metric: ownProps.match.params.metric,
  region: ownProps.match.params.region,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onHelpClick: () => dispatch(toggleHelp()),
  onMenuClick: () => dispatch({
    type: 'TOGGLE_MENU',
    open: true
  }),
  onMetricChange: _debounce((metricId) => {
    dispatch(onMetricChange(metricId, ownProps));
  }, 400),
  onViewChange: (view) => {
    const updatedView = view && view.id ? view.id : view
    dispatch(onViewChange(updatedView, ownProps));
  }
})

export default compose(
  withWidth(),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaHeader)