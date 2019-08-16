
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { updateMapSize, loadRouteLocations, onHoverFeature, setTooltipVars, onCoordsChange, addToFeatureIdMap, onViewportChange } from '../../actions';

import SedaTooltip from '../../components/seda/SedaTooltip';
import { getMapViewport, getLayers, defaultMapStyle } from '../../components/organisms/Map/selectors';
import Logo from '../../components/atoms/Logo';
import { getSelectedColors, getScatterplotVars } from '../../modules/config';
import { getHoveredId } from '../../modules/sections';
import MapBase, { MapLegend } from '../../components/organisms/Map';
import SedaLocations from '../../components/seda/SedaLocations';
import { getLang } from '../../modules/lang';
import { titleCase } from '../../utils';
import { Typography } from '@material-ui/core';

const selectedColors = getSelectedColors();


const MapEmbedView = ({ 
  region,
  metric,
  demographic,
  zoomLevel, 
  viewport,
  hoveredId,
  idMap,
  hovered,
  selectedIds = [],
  onViewportChange,
  onHover,
  loadRouteLocations, 
  locations, 
  onLayoutChange,
}) => {

  // flag potential layout change after loading locations
  useEffect(() => {
    loadRouteLocations(locations)
      .then(()=> {
        // set map size when locations load
        onLayoutChange()
      })
  }, [])

  const vars = getScatterplotVars(region, metric, demographic);

  // map layers for choropleths / dots
  const layers = useMemo(() => {
    return getLayers({
      region, metric, demographic, zoomLevel
    })
  }, [ region, metric, demographic, zoomLevel ])
  
  // handle hover
  const handleHover = (feature, coords) =>
    onHover(feature, vars, coords)

  /**
   * Gets the demographic label with proper casing for the subtitle
   * @param {*} demographic 
   */
  const getCasedDemographic = (demographic) => {
    switch (demographic) {
      case 'all':
      case 'w':
      case 'f':
      case 'm':
      case 'p':
      case 'np':
        return getLang('LABEL_STUDENTS_' + demographic).toLowerCase()
      default:
        return getLang('LABEL_STUDENTS_' + demographic)
    }
    
  }

  return (
    <div className={classNames('map-embed', { 'map-embed--locations': selectedIds.length > 0})}>
      <div className="map-embed__header">
        <Logo url='https://edopportunity.org/' target='_blank' />
        <div className="map-embed__heading">
          <Typography variant='h5'>
            { 
              getLang('EMBED_MAP_TITLE', {
                concept: titleCase(getLang('LABEL_CONCEPT_' + metric)),
                region: titleCase(region)
              }) 
            }
          </Typography>
          <Typography variant="body1">
            {
              getLang('EMBED_MAP_SUBTITLE', {
                metric: getLang('LABEL_' + metric),
                demographic: getCasedDemographic(demographic)
              })
            }
          </Typography>
        </div>
      </div>

      
      <SedaTooltip />
      <MapBase
        style={defaultMapStyle}
        selectedColors={selectedColors}
        attributionControl={true}
        layers={layers}
        viewport={viewport}
        idMap={idMap}
        selectedIds={selectedIds}
        hoveredId={hoveredId}
        onHover={handleHover}
        onClick={()=>{}}
        {...{onViewportChange}}
      >
        <MapLegend
          metric={metric}
          region={region}
          demographic={demographic}
          variant="condensed"
          hovered={hovered}
        />
      </MapBase>
      
      <SedaLocations />
    </div>
  )
}

MapEmbedView.propTypes = {
  region: PropTypes.string,
  metric: PropTypes.string,
  demographic: PropTypes.string,
  zoomLevel: PropTypes.string,
  viewport: PropTypes.object,
  hoveredId: PropTypes.string,
  idMap: PropTypes.object,
  hovered: PropTypes.object,
  selectedIds: PropTypes.array,
  onViewportChange: PropTypes.func,
  onHover: PropTypes.func,
  loadRouteLocations: PropTypes.func,
  locations: PropTypes.string,
  onLayoutChange: PropTypes.func,
}

const mapStateToProps = (
  {
    selected,
    map: { idMap, viewport },
    sections: { hovered },
  },
  { match: { params: { region, metric, demographic, locations, ...params } } }
) => ({
    selected,
    locations,
    region,
    demographic,
    view: 'map',
    idMap,
    metric,
    highlightedState: 'us',
    hovered,
    legendType: 'condensed',
    hoveredId: getHoveredId(hovered),
    selectedIds: selected[region],
    viewport: getMapViewport(viewport, params),
  })

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations, ownProps.match.params.region)),
  onLayoutChange: () => dispatch(updateMapSize()),
  onHover: (feature, vars, coords) => {
    dispatch(onHoverFeature(feature))
    dispatch(setTooltipVars(vars))
    dispatch(onCoordsChange(coords))
    dispatch(addToFeatureIdMap([ feature ]))
  },
  onViewportChange: (vp, updateRoute = true) => {
    dispatch(onViewportChange(vp))
  },
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapEmbedView)