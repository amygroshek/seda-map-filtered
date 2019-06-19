import React from 'react'
import PropTypes from 'prop-types'
import { getLang } from '../../constants/lang';
import { getColorForValue, getRegionFromId } from '../../modules/config';
import StatsItem from '../molecules/StatsItem';
import Marker from '../atoms/CircleMarker';

const round = (num) => Math.round(num*10)/10

const LocationItem = ({ feature: {properties }, ...props}) => {
  return (
    <div className="location-item" {...props}>
      <div className="location-item__marker">
        <Marker type="circle"></Marker>
      </div>
      <div className="location-item__name">
        {properties.name}
      </div>
      <div className="stats stats--horizontal">
        <StatsItem
          label={ getLang('LABEL_SHORT_AVG') }
          value={ round(properties['all_avg']) }
          color={getColorForValue(
            properties['all_avg'], 
            'all_avg', 
            getRegionFromId(properties.id)
          )}
        />
        <StatsItem
          label={ getLang('LABEL_SHORT_GRD') }
          value={ round(properties['all_grd']) }
          color={getColorForValue(
            properties['all_grd'], 
            'all_grd', 
            getRegionFromId(properties.id)
          )}
        />
        <StatsItem
          label={ getLang('LABEL_SHORT_COH') }
          value={ round(properties['all_coh']) }
          color={getColorForValue(
            properties['all_coh'], 
            'all_coh', 
            getRegionFromId(properties.id)
          )}
        />
      </div>
    </div>
  )
}

LocationItem.propTypes = {
  feature: PropTypes.object,
}

export default LocationItem;