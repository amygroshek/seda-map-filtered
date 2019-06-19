import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getChoroplethColors, getValuePositionForMetric, getMetricRange } from '../../modules/config';
import { onHoverFeature, onViewportChange, onCoordsChange, addToFeatureIdMap } from '../../actions/mapActions';
import { getFeatureProperty } from '../../modules/features';
import { updateViewportRoute, updateRoute } from '../../modules/router';
import { defaultMapStyle } from '../../style/map-style';
import { getMapViewport, getLayers } from '../../modules/map';
import { getHoveredId } from '../../modules/sections';
import { getSelectedColors } from '../../modules/config';
import MapTooltip from '../seda/SedaMapTooltip';
import GradientLegend from '../molecules/GradientLegend';
import BaseMap from '../molecules/BaseMap';
import { getLang } from '../../constants/lang';
import { handleLocationActivation } from '../../actions/featuresActions';

const selectedColors = getSelectedColors();
const choroplethColors = getChoroplethColors();

const SedaExplorerMap = ({
  region, 
  viewport, 
  metric, 
  demographic, 
  highlightedState,
  idMap,
  selectedIds,
  hoveredPosition,
  hoveredId,
  resetHighlightedState,
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
      <GradientLegend 
        colors={choroplethColors} 
        startLabel={getLang('LEGEND_LOW_'+metric)}
        endLabel={getLang('LEGEND_HIGH_'+metric)}
        colorRange={getMetricRange(metric, demographic, region, 'map')}
        legendRange={getMetricRange(metric, demographic, region)}
        markerPosition={hoveredPosition}
      />
      { hoveredId && <MapTooltip /> }
    </BaseMap>
  )
}

SedaExplorerMap.propTypes = {
  region: PropTypes.string, 
  viewport: PropTypes.object, 
  metric: PropTypes.string, 
  demographic: PropTypes.string, 
  highlightedState: PropTypes.string,
  hoveredPosition: PropTypes.number,
  idMap: PropTypes.object,
  selectedIds: PropTypes.array,
  hoveredId: PropTypes.string,
  resetHighlightedState: PropTypes.func,
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
    idMap,
    region,
    metric, 
    demographic,
    highlightedState,
    hoveredId: getHoveredId(hovered),
    hoveredPosition: hovered && hovered.properties ?
      getValuePositionForMetric(
        getFeatureProperty(hovered, demographic + '_' + metric),
        demographic + '_' + metric,
        region
      ) : null,
    selectedIds: selected[region] || [],
    viewport: getMapViewport(viewport, params),
  })
}

// was using this to debounce hover, but not needed currently
// const debouncedDispatch = 
//   _debounce((dispatch, func) => dispatch(func()),10)

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
  onClick: (feature) => dispatch(
    handleLocationActivation(feature)
  )
})


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaExplorerMap)