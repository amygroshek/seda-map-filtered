import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import Section from '../templates/Section';
import SedaExplorerMap from './SedaExplorerMap';
import SedaExplorerChart from './SedaExplorerChart';

const SedaExplorer = ({ view, onViewChange, ...props}) => {
  useEffect(() => { onViewChange(view) }, [ view ])
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

SedaExplorer.propTypes = {
  view: PropTypes.string,
  onViewChange: PropTypes.func,
  ...Section.propTypes
}

const mapStateToProps = (
  state, { match: { params: { view = 'map' } }, classes = {} }
) => {
  return ({
    id: 'map',
    view,
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
