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
      <div className="section__left section__left--scatterplot">
        <SedaExplorerChart />
      </div>
    </Section>
  )
}

const mapStateToProps = (
  state, { match: { params: { view = 'map' } } }
) => {
  return ({
    id: 'map',
    classes: {
      content: 'section__content--' + (
        view === 'map' ? 'right' :
          view === 'chart' ? 'left' : 'split' 
      )
    },
    overlayContent: <SedaSearch inputProps={{
      placeholder: getLang('CARD_SEARCH_PLACEHOLDER')
    }} />
  })
}

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(SedaExplorer)
