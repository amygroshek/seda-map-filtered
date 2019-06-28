import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { onHoverFeature, onViewportChange, onCoordsChange, addToFeatureIdMap } from '../../actions/mapActions';
import { updateViewportRoute, updateRoute } from '../../modules/router';
import { defaultMapStyle } from '../../style/map-style';
import { getMapViewport, getLayers } from '../../modules/map';
import { getHoveredId } from '../../modules/sections';
import { getSelectedColors } from '../../modules/config';
import MapTooltip from '../seda/SedaMapTooltip';
import BaseMap from '../molecules/BaseMap';
import { handleLocationActivation } from '../../actions/featuresActions';
import SedaMapLegend from './SedaMapLegend';

const selectedColors = getSelectedColors();

const SedaExplorerMap = ({
  view,
  region, 
  viewport, 
  metric, 
  demographic, 
  highlightedState,
  secondary,
  hovered,
  idMap,
  legendType,
  selectedIds,
  hoveredId,
  resetHighlightedState,
  onViewportChange, 
  onHover, 
  onClick,
  onLegendToggle,
  onFullChartClick,
  onHelpClick
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

  // map layers for choropleths / dots
  const layers = useMemo(() => {
    return getLayers({
      region, metric, demographic, highlightedState, zoomLevel
    })
  }, [ region, metric, demographic, highlightedState, zoomLevel ])
  return (
    <div className="seda-explorer-map">
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
        { hoveredId && <MapTooltip /> }
      </BaseMap>
      { view !== 'split' &&
          <SedaMapLegend 
            variant={legendType}
            metric={metric}
            demographic={demographic}
            region={region}
            secondary={secondary}
            hovered={hovered}
            onToggleClick={onLegendToggle}
            onFullClick={onFullChartClick}
            onHelpClick={onHelpClick}
          />
      }
    </div>
  )
}

SedaExplorerMap.propTypes = {
  active: PropTypes.bool,
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
  ui: { legendType },
  map: { idMap, viewport },
  sections: { map: { hovered } },
},
{ match: { params: { secondary, region, metric, demographic, highlightedState, ...params } } }
) => {
  return ({
    idMap,
    region,
    metric, 
    demographic,
    secondary,
    highlightedState,
    selected,
    hovered,
    legendType,
    hoveredId: getHoveredId(hovered),
    selectedIds: selected[region],
    viewport: getMapViewport(viewport, params),
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
  onClick: (feature) => dispatch(
    handleLocationActivation(feature)
  ),
  onLegendToggle: () => dispatch({
    type: 'TOGGLE_LEGEND_TYPE'
  }),
  onFullChartClick: () => {
    updateRoute(ownProps, { view: 'chart' })
  },
  onHelpClick: () => dispatch(
    (() => (d, getState) => {
      const state = getState();
      const helpOpen = state.ui.helpOpen;
      const hasActiveLocation = Boolean(state.active);
      if (hasActiveLocation) {
        d({
          type: 'CLEAR_ACTIVE_LOCATION'
        })
      } 
      if (!helpOpen) {
        d({
          type: 'TOGGLE_HELP',
          open: true
        })
      }
    })()
  ),
})


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaExplorerMap)