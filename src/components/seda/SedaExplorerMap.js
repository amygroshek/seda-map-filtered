import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getChoroplethColors, getValuePositionForMetric, getMetricRange } from '../../modules/config';
import { onHoverFeature, onViewportChange, onSelectFeature, onCoordsChange, addToFeatureIdMap } from '../../actions/mapActions';
import { getFeatureProperty } from '../../modules/features';
import { updateViewportRoute, updateRoute } from '../../modules/router';
import { defaultMapStyle } from '../../style/map-style';
import { getMapViewport, getLayers } from '../../modules/map';
import { getHoveredId } from '../../modules/sections';
import { getSelectedColors } from '../../modules/config';
import MapTooltip from '../seda/SedaMapTooltip';
import GradientLegend from '../molecules/GradientLegend';
import BaseMap from '../molecules/BaseMap';

const selectedColors = getSelectedColors();
// const choroplethColors = getChoroplethColors();

const SedaExplorerMap = ({
  region, 
  viewport, 
  metric, 
  demographic, 
  highlightedState,
  idMap,
  selectedIds,
  hoveredId,
  resetHighlightedState,
  legend, 
  onViewportChange, 
  onHover, 
  onClick
}) => {
  const zoomLevel = viewport.zoom > 11 ? 'school' :
    viewport.zoom > 8 ? 'district' : 'county'
  useEffect(() => {
    if (viewport.zoom < 4.5 && 
      highlightedState !== 'us' && 
      viewport.transitionDuration === 0
    ) {
      resetHighlightedState()
    }
  }, [viewport.zoom])
  const layers = useMemo(() => {
    return getLayers({
      region, metric, demographic, highlightedState, zoomLevel
    })
  }, [ region, metric, demographic, highlightedState, zoomLevel ])
  return (
    <BaseMap
      style={defaultMapStyle}
      selectedColors={selectedColors}
      attributionControl={true}
      layers={layers}
      viewport={viewport}
      idMap={idMap}
      selectedIds={selectedIds}
      hoveredId={hoveredId}
      {...{onViewportChange, onHover, onClick}}
    >
      <GradientLegend {...legend} />
      <MapTooltip />
    </BaseMap>
  )
}

SedaExplorerMap.propTypes = {
  map: PropTypes.object,
  legend: PropTypes.object,
  onViewportChange: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
}

const mapStateToProps = ({ 
  selected,
  map: { idMap, viewport },
  sections: { map: { hovered } },
},
{ match: { params: { region, metric, demographic, highlightedState, ...params } } }
) => {
  return ({
    region,
    metric, 
    demographic,
    highlightedState,
    hoveredId: getHoveredId(hovered),
    idMap,
    selectedIds: selected[region] || [],
    viewport: getMapViewport(viewport, params),
    legend: {
      startLabel: 'low',
      endLabel: 'high',
      colors: getChoroplethColors(),
      colorRange: getMetricRange(metric, demographic, region, 'map'),
      legendRange: getMetricRange(metric, demographic, region),
      markerPosition: hovered && hovered.properties ?
        getValuePositionForMetric(
          getFeatureProperty(hovered, demographic + '_' + metric),
          demographic + '_' + metric,
          region
        ) : null,
      vertical: false
    }
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onHover: (feature, coords) => {
    dispatch(onHoverFeature(feature, 'map'))
    dispatch(onCoordsChange(coords))
    dispatch(addToFeatureIdMap([ feature ]))
  },
  onViewportChange: (vp) => {
    dispatch(onViewportChange(vp))
    updateViewportRoute(ownProps, vp);
  },
  resetHighlightedState: () => {
    updateRoute(ownProps, { highlightedState: 'us' })
  },
  onClick: (feature) => 
    dispatch(onSelectFeature(feature, ownProps.match.params.region)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaExplorerMap)