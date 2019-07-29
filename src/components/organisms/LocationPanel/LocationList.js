import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LocationItem from './LocationItem';
import { getRegionFromFeatureId, getMetricRange } from '../../../modules/config';
import { getLang } from '../../../modules/lang';
import { LocationStatDiverging } from './LocationStats';
import { formatNumber } from '../../../utils';
import { ButtonBase } from '@material-ui/core';
import { getFeatureProperty } from '../../../modules/features';
import { loadFeatureFromCoords } from '../../../utils/tilequery';

const statToLabel = (s) => getLang('LABEL_SHORT_'+s.split('_')[1])

const LocationComparisonItem = ({
  idx,
  feature,
  otherFeature,
  demographic,
  region,
  metrics,
  markerColor,
  onSelectFeature,
}) => {
  const name = getFeatureProperty(feature, 'name');
  return (
    <LocationItem 
      idx={idx} 
      feature={feature}
    >
      {
        metrics.map(m => {
          const range = getMetricRange(m, demographic, region, 'map')  || [-1, 1]
          return (
            <LocationStatDiverging
              key={m}
              feature={feature}
              otherFeature={otherFeature}
              markerColor={markerColor}
              range={range}
              varName={demographic + '_' + m}
              label={statToLabel(demographic + '_' + m)}
              minLabel={formatNumber(range[0])}
              maxLabel={formatNumber(range[1])}
            />
          )
        })
      }
      <ButtonBase
        className='button button--link'
        disableRipple={true}
        onClick={() => onSelectFeature(feature) }
      >
        { getLang('LOCATION_SHOW_PLACE', { name }) }
      </ButtonBase>
    </LocationItem>
  )
}

const LocationList = ({
  metrics = ['avg', 'grd', 'coh'],
  demographic = 'all', 
  feature, 
  className, 
  others = [],
  markerColor,
  showMarkers = true,
  onSelectFeature
}) => {
  if (!feature || !feature.properties) { return null; }
  const region = getRegionFromFeatureId(feature.properties.id)
  return (
    <div className={classNames('location-list', className)}>
      {
        others.map((f,i) => {
          return (
            f.properties.id !== feature.properties.id &&
              <LocationComparisonItem
                key={'l'+i}
                idx={showMarkers ? i : null} 
                feature={f}
                otherFeature={feature}
                markerColor={markerColor}
                demographic={demographic}
                region={region}
                metrics={metrics}
                onSelectFeature={onSelectFeature}
              />
          )
        })
      }
    </div>
  )
}

LocationList.propTypes = {
  summary: PropTypes.string,
  demographic: PropTypes.string,
  feature: PropTypes.object,
  others: PropTypes.array,
  metrics: PropTypes.array,
  className: PropTypes.string,
  onSelectFeature: PropTypes.func,
}

export default LocationList;


