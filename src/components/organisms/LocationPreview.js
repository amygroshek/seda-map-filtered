import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';

import LocationItem from './LocationItem';
import CloseButton from '../molecules/CloseButton';

const LocationPreview = ({
  className,
  number,
  feature,
  demographic,
  metrics,
  onDismiss,
  onClick,
  onHover
}) => {
  return (
    <div
      className={classNames(className, 'location-preview')}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <LocationItem
        number={number} 
        feature={feature}
        demographic={demographic}
        metrics={metrics}
      />
      <CloseButton size="small"
        onClick={(e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
          onDismiss(feature); 
          return false; 
        }} 
      />
    </div>
  )
}

LocationPreview.propTypes = {
  className: PropTypes.string,
  number: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  feature: PropTypes.object,
  demographic: PropTypes.string,
  metrics: PropTypes.array,
  onDismiss: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
}

export default LocationPreview
