import React from 'react'
import PropTypes from 'prop-types'
import Marker from '../../atoms/BaseMarker';
import { getSelectedColors } from '../../../modules/config';

const SELECTED = getSelectedColors();

const LocationItem = ({ 
  idx,
  label,
  feature: { properties }, 
  children,
  ...props
}) => {
  return (
    <div className="location-item" {...props}>
      <Marker 
          className="location-item__marker" 
          color={SELECTED[idx]} 
          type="circle"
        >
          {label ? label  : idx+1}
      </Marker>
      <div className="location-item__heading">
        {properties.name}
      </div>
      <div className="location-item__content">
        {children}
      </div>
    </div>
  )
}

LocationItem.propTypes = {
  feature: PropTypes.object,
  idx: PropTypes.number,
  label: PropTypes.string,
  children: PropTypes.node,
}

export default LocationItem;