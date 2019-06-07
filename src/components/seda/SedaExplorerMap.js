import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getChoroplethColors, getValuePositionForMetric, getMetricRange } from '../../modules/config';
import { onHoverFeature, onViewportChange, onSelectFeature, onCoordsChange, addToFeatureIdMap } from '../../actions/mapActions';
import { getFeatureProperty } from '../../modules/features';
import { updateViewportRoute } from '../../modules/router';
import { defaultMapStyle } from '../../style/map-style';
import { getMapViewport, getLayers } from '../../modules/map';
import { getHoveredId } from '../../modules/sections';
import { getSelectedColors } from '../../modules/config';
import MapTooltip from '../seda/SedaMapTooltip';
import GradientLegend from '../molecules/GradientLegend';
import BaseMap from '../molecules/BaseMap';


const SedaExplorerMap = ({
  map, legend, onViewportChange, onHover, onClick
}) => {
  return (
    <BaseMap
      {...map}
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
{ match: { params: { region, metric, demographic, ...params } } }
) => {
  return ({
    map: {
      style: defaultMapStyle,
      layers: getLayers(region, metric, demographic),
      selectedIds: selected[region] || [],
      hoveredId: getHoveredId(hovered),
      viewport: getMapViewport(viewport, params),
      attributionControl: true,
      selectedColors: getSelectedColors(),
      idMap,
    },
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
  onClick: (feature) => 
    dispatch(onSelectFeature(feature, ownProps.match.params.region)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaExplorerMap)