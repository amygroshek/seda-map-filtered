import { defaultMapStyle, getChoroplethLayer, getChoroplethOutline, getCircleLayer, getBackgroundChoroplethLayer, getChoroplethOutlineCasing, getCircleHighlightLayer, getCircleCasingLayer } from '../../style/map-style';
import BaseMap from '../molecules/BaseMap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getMapViewport } from '../../modules/map';
import { getHoveredId } from '../../modules/sections';
import { getRegionFromId, getSelectedColors } from '../../modules/config';

const isIdInRegion = (id, region) => {
  if (!region || !id) { return false }
  return getRegionFromId(id) === region
}

const getLayers = (region, metric, demographic) => {
  const dataProp = [demographic, metric].join('_');
  switch(region) {
    case 'counties':
    case 'districts':
      return [
        { 
          z: 4, 
          style: getChoroplethLayer({region, dataProp}), 
          hasFeatureId: (id) => isIdInRegion(id, region)
        },
        { z: 50, style: getChoroplethOutline({region}) },
        { z: 50, style: getChoroplethOutlineCasing({region}) }
      ]
    case 'schools':
      return [
        { z: 49, style: getBackgroundChoroplethLayer({region, dataProp}) },
        {
          z: 50, 
          style: getCircleLayer({region, dataProp}), 
          idMap: true,
          hasFeatureId: (id) => isIdInRegion(id, region)
        },
        { z: 50, style: getCircleCasingLayer({region}) },
        { z: 50, style: getCircleHighlightLayer({region}) }
      ]
    default:
      return []
  }
}

const mapStateToProps = (
  { selected = {}, map: { viewport, idMap }, sections: { map: { hovered } }, },
  { match: { params: { region, metric, demographic, highlightedState, ...params } } }
) => ({
  style: defaultMapStyle,
  layers: getLayers(region, metric, demographic),
  selectedIds: selected[region] || [],
  hoveredId: getHoveredId(hovered),
  viewport: getMapViewport(viewport, params),
  attributionControl: true,
  selectedColors: getSelectedColors(),
  idMap,
})

export default withRouter(
  connect(mapStateToProps, null)(BaseMap)
)

