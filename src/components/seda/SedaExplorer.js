import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { getLang } from '../../constants/lang';

import SedaSearch from './SedaSearch';
import Section from '../templates/Section';
import SedaExplorerMap from './SedaExplorerMap';
import SedaExplorerChart from './SedaExplorerChart';

const SedaExplorer = (props) => {
  return (
    <Section {...props}>
      <div className="section__right">
        <SedaExplorerMap />
      </div>
      <div className="section__left">
        <SedaExplorerChart />
      </div>
    </Section>
  )
}

const mapStateToProps = (
  state, { match: { params: { view = 'map' } }, classes = {} }
) => {
  return ({
    id: 'map',
    classes: {
      ...classes,
      content: 'section__content--' + (
        view === 'map' ? 'right' :
          view === 'chart' ? 'left' : 'split' 
      )
    }
  })
}

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(SedaExplorer)
