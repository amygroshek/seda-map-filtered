import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Typography } from '@material-ui/core';
import LocationItem from './LocationItem';

const LocationList = ({
  summary, 
  metrics = ['avg', 'grd', 'coh'],
  demographic = 'all', 
  feature, className, 
  others = []
}) => {
  return feature ? (
    <div className={classNames('location-list', className)}>
      { summary && 
        <Typography paragraph={true}>{summary}</Typography> 
      }
      {
        others.map((f,i) =>
          f.properties.id !== feature.properties.id && 
            <LocationItem 
              key={'f'+i} 
              number={i+1} 
              feature={f}
              demographic={demographic}
              metrics={metrics}
            />
        )
      }
    </div>
  ) : (null)
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


