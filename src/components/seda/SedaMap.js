import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { onHoverFeature, onViewportChange, onCoordsChange, addToFeatureIdMap, handleLocationActivation, setTooltipVars, onHighlightedStateChange } from '../../actions';
import { updateViewportRoute } from '../../modules/router';
import { getMapViewport, getLayers, defaultMapStyle } from '../organisms/Map/selectors';
import { getHoveredId } from '../../modules/sections';
import { getSelectedColors, getScatterplotVars, isVersusFromVarNames } from '../../modules/config';
import MapBase from '../organisms/Map';
import SedaMapLegend from './SedaMapLegend';
import { getLang } from '../../modules/lang';

const selectedColors = getSelectedColors();

const SedaExplorerMap = ({
  view,
  region, 
  viewport, 
  metric, 
  demographic, 
  highlightedState,
  idMap,
  selectedIds,
  hoveredId,
  resetHighlightedState,
  onViewportChange, 
  onHover, 
  onClick,
}) => {
  const zoomLevel = viewport.zoom > 11 ? 'school' :
    viewport.zoom > 8 ? 'district' : 'county'

  const vars = getScatterplotVars(region, metric, demographic);

  const showLegend = (
    view === 'map' || 
    isVersusFromVarNames(vars.xVar, vars.yVar)
  )
  
  // reset highlighted state on zoom out
  useEffect(() => {
    if (viewport.zoom < 4.5 && 
      highlightedState !== 'us' && 
      viewport.transitionDuration === 0
    ) {
      resetHighlightedState && resetHighlightedState()
    }
  // eslint-disable-next-line
  }, [viewport.zoom]) // only execute when viewport zoom changes

  // map layers for choropleths / dots
  const layers = useMemo(() => {
    if (!metric || !demographic || !region) { return [] }
    return getLayers({
      region, metric, demographic, highlightedState, zoomLevel
    })
  }, [ region, metric, demographic, highlightedState, zoomLevel ])
  
  // handle hover
  const handleHover = (feature, coords) =>
    onHover(feature, vars, coords)

  const ariaLabel = getLang('UI_MAP_SR', {
    metric: getLang('LABEL_' + metric),
    region: getLang('LABEL_' + region),
    demographic: getLang('LABEL_STUDENTS_' + demographic)
  })

  return (
    <div className="seda-map">
      <MapBase
        style={defaultMapStyle}
        selectedColors={selectedColors}
        attributionControl={true}
        layers={layers}
        viewport={viewport}
        idMap={idMap}
        selectedIds={selectedIds}
        hoveredId={hoveredId}
        ariaLabel={ariaLabel}
        onHover={handleHover}
        onLoad={() => window.SEDA.trigger('map')}
        {...{onViewportChange, onClick}}
      ></MapBase>
      { showLegend && <SedaMapLegend /> }
    </div>
  )
}

SedaExplorerMap.propTypes = {
  active: PropTypes.bool,
  showLegend: PropTypes.bool,
  region: PropTypes.string, 
  viewport: PropTypes.object, 
  metric: PropTypes.string, 
  demographic: PropTypes.string, 
  highlightedState: PropTypes.string,
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
  sections: { hovered },
},
{ match: { params: { view, region, metric, demographic, highlightedState = 'us', ...params } } }
) => {
  return ({
    view,
    idMap,
    region,
    metric,
    demographic,
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
  onHover: (feature, vars, coords) => {
    dispatch(onHoverFeature(feature))
    dispatch(setTooltipVars(vars))
    dispatch(onCoordsChange(coords))
    dispatch(addToFeatureIdMap([ feature ]))
  },
  onViewportChange: (vp, updateRoute = true) => {
    dispatch(onViewportChange(vp))
    updateRoute && updateViewportRoute(ownProps, vp);
  },
  resetHighlightedState: () => {
    dispatch(onHighlightedStateChange('us', ownProps))
  },
  onClick: (feature) => dispatch(
    handleLocationActivation(feature, 'map')
  )
})


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaExplorerMap)