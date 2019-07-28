import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LocationItem from './LocationItem';
import { getRegionFromFeatureId, getMetricRange } from '../../../modules/config';
import { getLang } from '../../../modules/lang';
import { LocationStatDiverging } from './LocationStats';
import { formatNumber } from '../../../utils';

const statToLabel = (s) => getLang('LABEL_SHORT_'+s.split('_')[1])

const LocationComparisonItem = ({
  idx,
  feature,
  demographic,
  region,
  metrics
}) => (
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
            range={range}
            varName={demographic + '_' + m}
            label={statToLabel(demographic + '_' + m)}
            minLabel={formatNumber(range[0])}
            maxLabel={formatNumber(range[1])}
          />
        )
      })
    }
  </LocationItem>
)

const LocationList = ({
  metrics = ['avg', 'grd', 'coh'],
  demographic = 'all', 
  feature, 
  className, 
  others = [],
  showMarkers = true
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
                demographic={demographic}
                region={region}
                metrics={metrics}
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
}

export default LocationList;


