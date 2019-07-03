import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Section from '../../components/templates/Section';

const SplitSection = ({
  activeView, 
  helpPanelOn, 
  locationPanelOn,
  classes = {},
  ...props
}) => {
  return (
    <Section
      classes={{
        content: classNames({
          'section__content--left': activeView === 'left',
          'section__content--right': activeView === 'right',
          'section__content--split': activeView === 'split',
          'section__content--help': helpPanelOn,
          'section__content--location': locationPanelOn,
        }),
        ...classes
      }}
      {...props}
    />
  )
}

SplitSection.propTypes = {
  activeView: PropTypes.string,
  helpPanelOn: PropTypes.bool,
  locationPanelOn: PropTypes.bool,
  classes: PropTypes.object,
}

export default SplitSection