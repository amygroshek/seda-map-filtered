import React from 'react'
import PropTypes from 'prop-types'
import { getLang } from '../../constants/lang';
import { getColorForValue, getRegionFromId } from '../../modules/config';
import StatsItem from '../molecules/StatsItem';
import Marker from '../atoms/CircleMarker';
import { getSelectedColors } from '../../modules/config';

const round = (num) => Math.round(num*10)/10
const SELECTED = getSelectedColors();

const LocationItem = ({ 
  metrics = ['avg', 'grd', 'coh'],
  demographic = 'all',  
  number, 
  feature: { properties }, 
  ...props
}) => {
  return (
    <div className="location-item" {...props}>
      <div className="location-item__heading">
        <Marker 
          className="location-item__marker" 
          color={SELECTED[number]} 
          type="circle"
        >
          {number}
        </Marker>
        <div className="location-item__name">
          {properties.name}
        </div>
      </div>
      <div className="stats stats--horizontal">
      {
        metrics.map((m,i) => (
          <StatsItem
            key={"stats"+i}
            label={ getLang(`LABEL_SHORT_${m}`) }
            value={ round(properties[`${demographic}_${m}`]) }
            color={getColorForValue(
              properties[`${demographic}_${m}`], 
              `${demographic}_${m}`, 
              getRegionFromId(properties.id)
            )}
          />
        ))
      }
      </div>
    </div>
  )
}

LocationItem.propTypes = {
  feature: PropTypes.object,
  number: PropTypes.number,
  metrics: PropTypes.array,
  demographic: PropTypes.string,
}

export default LocationItem;