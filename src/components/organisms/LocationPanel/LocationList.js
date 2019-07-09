import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LocationItem from './LocationItem';

const LocationList = ({
  metrics = ['avg', 'grd', 'coh'],
  demographic = 'all', 
  feature, className, 
  others = []
}) => {
  return feature ? (
    <div className={classNames('location-list', className)}>
      {
        others.map((f,i) =>
          f.properties.id !== feature.properties.id && 
            <LocationItem 
              key={'f'+i} 
              idx={i} 
              feature={f}
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


