import React from 'react'
import PropTypes from 'prop-types'

import MapTooltip from '../map/MapTooltip';
import GradientLegend from '../base/GradientLegend';
import DynamicScatterplot from '../base/DynamicScatterplot';
import Section from '../base/Section';
import Map from '../base/Map';


const SplitSection = ({
  section,
  legend,
  scatterplot,
  map,
  onOptionChange,
  onScatterplotClick,
  onScatterplotData,
  onScatterplotHover,
  onScatterplotReady,
  onCardClick,
  onCardHover,
  onCardDismiss,
  onMapViewportChange,
  onMapHover,
  onMapClick
}) => {
  return (
    <Section 
      onOptionChange={onOptionChange}
      onCardClick={onCardClick}
      onCardHover={onCardHover}
      onCardDismiss={onCardDismiss}
      {...section}
    >
      <div className="section__right">
        <Map
          onViewportChange={onMapViewportChange}
          onHover={onMapHover}
          onClick={onMapClick}
          {...map}
        />
        <MapTooltip />
      </div>
      <div className="section__left section__left--scatterplot">
        <DynamicScatterplot 
          onData={onScatterplotData}
          onReady={onScatterplotReady}
          onHover={onScatterplotHover}
          onClick={onScatterplotClick}
          {...scatterplot}
        />
        <GradientLegend
          {...legend}
        />
      </div>
    </Section>
  )
}

SplitSection.propTypes = {
  section: PropTypes.shape(Section.propTypes),
  scatterplot: PropTypes.shape(DynamicScatterplot.propTypes),
  map: PropTypes.shape(Map.propTypes),
  legend: PropTypes.shape(GradientLegend.propTypes),
  onOptionChange: PropTypes.func,
  onScatterplotClick: PropTypes.func,
  onScatterplotData: PropTypes.func,
  onScatterplotReady: PropTypes.func,
  onScatterplotHover: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardHover: PropTypes.func,
  onCardDismiss: PropTypes.func,
  onMapViewportChange: PropTypes.func,
  onMapHover: PropTypes.func,
  onMapClick: PropTypes.func
}

export default SplitSection;