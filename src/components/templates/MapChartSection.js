import React from 'react'
import PropTypes from 'prop-types'

import MapTooltip from '../seda/SedaMapTooltip';
import GradientLegend from '../molecules/GradientLegend';
import DynamicScatterplot from '../organisms/DynamicScatterplot';
import Section from './Section';
import BaseMap from '../molecules/BaseMap';


const MapChartSection = ({
  section,
  legend,
  scatterplot,
  map,
  onScatterplotClick,
  onScatterplotData,
  onScatterplotHover,
  onScatterplotReady,
  onMapViewportChange,
  onMapHover,
  onMapClick
}) => {
  return (
    <Section {...section}>
      <div className="section__right">
        <BaseMap
          onViewportChange={onMapViewportChange}
          onHover={onMapHover}
          onClick={onMapClick}
          {...map}
        >
          <GradientLegend {...map.legend} />
        </BaseMap>
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

MapChartSection.propTypes = {
  section: PropTypes.shape(Section.propTypes),
  scatterplot: PropTypes.shape(DynamicScatterplot.propTypes),
  map: PropTypes.shape(BaseMap.propTypes),
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

export default MapChartSection;