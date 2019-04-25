import React from 'react'
import PropTypes from 'prop-types'
import DynamicScatterplot from './DynamicScatterplot';
import Section from './Section';

const ScatterplotSection = ({ 
  section,
  active = true,
  scatterplot,
  onScatterplotData,
  onScatterplotHover,
  onScatterplotClick,
  onScatterplotReady,
  onCardClick,
  onCardHover,
  onCardDismiss,
  onOptionChange,
}) => {
  return (
    <Section 
      onOptionChange={onOptionChange}
      onCardClick={onCardClick}
      onCardHover={onCardHover}
      onCardDismiss={onCardDismiss}
      {...section}
    >
      { active &&
        <DynamicScatterplot
          onData={onScatterplotData}
          onReady={onScatterplotReady}
          onHover={onScatterplotHover}
          onClick={onScatterplotClick}
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
  onScatterplotData: PropTypes.func,
  onScatterplotHover: PropTypes.func,
  onScatterplotClick: PropTypes.func,
  onScatterplotReady: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardHover: PropTypes.func,
  onCardDismiss: PropTypes.func,
}

export default ScatterplotSection
