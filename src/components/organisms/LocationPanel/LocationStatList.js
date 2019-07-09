import React from 'react'
import PropTypes from 'prop-types'
import { getLang } from '../../../modules/lang';
import { getColorForValue, getRegionFromId } from '../../../modules/config';
import { formatNumber } from '../../../utils';
import LocationStat from './LocationStat';

const LocationStatList = ({
  metrics = ['avg', 'grd', 'coh'],
  demographic = 'all', 
  feature: { properties }
}) => {
  return (
    <div className="stats stats--horizontal">
    {
      metrics.map((m,i) => (
        <LocationStat
          key={"stats"+i}
          description={ getLang(`LABEL_SHORT_${m}`) }
          value={ formatNumber(properties[`${demographic}_${m}`]) }
          color={getColorForValue(
            properties[`${demographic}_${m}`], 
            `${demographic}_${m}`, 
            getRegionFromId(properties.id)
          )}
        />
      ))
    }
    </div>
  )
}

LocationStatList.propTypes = {
  feature: PropTypes.object,
  metrics: PropTypes.array,
  demographic: PropTypes.string,
}

export default LocationStatList
