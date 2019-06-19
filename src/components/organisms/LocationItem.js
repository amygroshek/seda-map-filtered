import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { getLang } from '../../constants/lang';
import { getColorForValue, getRegionFromId } from '../../modules/config';

const round = (num) => Math.round(num*10)/10

const StatsItem = ({value, label, color, className }) => {
  return (
    <div className={
      classNames("stats__item", className)}
      style={{ borderColor: color }}
    >
      <span className="label stats__item-label">
        { label }
      </span>
      <span className="stats__item-value">
        { value || (value === 0 ? 0 : 'N/A') }
      </span>
    </div>
  )
}

StatsItem.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
}

const LocationItem = ({ feature: {properties }, ...props}) => {
  return (
    <div className="location-item" {...props}>
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