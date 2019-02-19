import { connect } from 'react-redux';
import Tooltip from '../base/Tooltip';
import { getChoroplethProperty } from '../../modules/map';
import { getMetricShortLabel } from '../../modules/metrics';

const getValues = (feature, vals) =>
  feature ? vals.map(v => {
    return [
      v[0],
      feature.properties[v[1]] &&
      feature.properties[v[1]] > -9999 ?
        Math.round(feature.properties[v[1]]*100)/100 :
        'Unavailable'
    ]
  }) : []

const mapStateToProps = ({ 
  hovered: { feature, coords },
  metrics,
  map: { options }
}) => ({
  ...coords,
  visible: Boolean(feature),
  title: feature && feature.properties ? 
    feature.properties.name : 'Unknown',
  values: getValues(feature, [ [
    getMetricShortLabel(metrics, options.metric),
    getChoroplethProperty(options)
  ] ])
})

const MapTooltip = connect(
  mapStateToProps, null
)(Tooltip)

export default MapTooltip