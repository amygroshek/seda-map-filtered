import React from 'react'
import PropTypes from 'prop-types'
import { getRegionFromId, getColorForValue } from '../../../modules/config';
import { getLang, getDescriptionForVarName } from '../../../modules/lang';

import LocationStat from './LocationStat';
import { getFeatureProperty } from '../../../modules/features';
import { formatNumber } from '../../../utils';

const LocationSummaryStat = ({ 
  feature, 
  metricId, 
  demographicId = 'all',
}) => {
  
  const region = getRegionFromId(feature.properties.id)
  const varName = [demographicId, metricId].join('_');
  const value = formatNumber(getFeatureProperty(feature, varName));
  const color = getColorForValue(value, varName, region);
  const title = getLang('LABEL_' + metricId);
  const up = metricId === 'grd' ? (value > 1) : (value > 0);
  const formatter = metricId === 'grd' ?
    ((val) => Math.abs(Math.round((val - 1) * 100)) + '%') : 
    Math.abs
  const description = getDescriptionForVarName(varName, value, formatter);

  return (
    <LocationStat 
      {...{
        title, 
        color, 
        value, 
        description,
        formatter,
        direction: value ?
          (up ? 'up' : 'down') : null
      }}
    />
  )
}

LocationSummaryStat.propTypes = {
  feature: PropTypes.object,
  metricId: PropTypes.string,
  demographicId: PropTypes.string,
}

const LocationSummary = ({
  feature, 
  stats = [ 'avg', 'grd', 'coh', 'ses' ]
}) => {
  return feature ? (
    <div className="location-summary__stats">
      {
        stats.map((metricId) => 
          <LocationSummaryStat
            key={metricId}
            feature={feature}
            metricId={metricId}
          />
        )
      }
    </div>
  ) : (null)
}

LocationSummary.propTypes = {
  feature: PropTypes.object,
  stats: PropTypes.array,
}

export default LocationSummary;