import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { Typography } from '@material-ui/core';

import LocationItem from './LocationItem';
import LocationStatList from './LocationStatList'
import CloseButton from '../../molecules/CloseButton';
import { getStateName } from '../../../constants/statesFips';

const LocationPreview = ({
  className,
  idx,
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
        idx={idx} 
        feature={feature}
      >
        { getStateName(feature.properties.id) }
      </LocationItem>
      { onDismiss && 
        <CloseButton size="small"
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            onDismiss(feature); 
            return false; 
          }} 
        />
      }
    </div>
  )
}

LocationPreview.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  idx: PropTypes.number,
  feature: PropTypes.object,
  demographic: PropTypes.string,
  metrics: PropTypes.array,
  onDismiss: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
}

export default LocationPreview
