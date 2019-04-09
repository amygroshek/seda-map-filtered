import React from 'react'
import PropTypes from 'prop-types'
import DynamicScatterplot from './DynamicScatterplot';
import Section from './Section';

const ScatterplotSection = ({ 
  section,
  active = true,
  scatterplot,
  onData,
  onHover,
  onClick,
  onReady,
  onOptionChange,
}) => {
  return (
    <Section 
      onOptionChange={onOptionChange}
      {...section}
    >
      { active &&
        <DynamicScatterplot
          onData={onData}
          onReady={onReady}
          onHover={onHover}
          onClick={onClick}
          {...scatterplot}
        />
      }
    </Section>
  )
}

ScatterplotSection.propTypes = {
  active: PropTypes.bool,
  section: PropTypes.shape(Section.propTypes),
  scatterplot: PropTypes.shape(DynamicScatterplot.propTypes),
  onOptionChange: PropTypes.func,
  onData: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onReady: PropTypes.func
}

export default ScatterplotSection
