import React from 'react'
import PropTypes from 'prop-types'

import { getStateName } from '../../constants/statesFips';
import LocationCard from './LocationCard';

function LocationCards({
  features = [], 
  metrics,
  onCardDismiss,
  onCardClick,
  onCardHover
}) {
  return (
    Boolean(features.length) > 0 &&
      <div className='location-card-list'>
        { 
          features.map(
            (f, i) =>
              <LocationCard 
                key={'loc' + f.properties.id}
                id={f.properties.id}
                order={i+1}
                name={f.properties.name}
                state={getStateName(f.properties.id)}
                metrics={metrics}
                feature={f}
                onDismiss={onCardDismiss}
                onClick={onCardClick}
                onHover={onCardHover}
              />
          )
        }
      </div> 
  )
}

LocationCards.propTypes = {
  features: PropTypes.array,
  metrics: PropTypes.array,
  onCardClick: PropTypes.func,
  onCardDismiss: PropTypes.func,
  onCardHover: PropTypes.func,
}

export default LocationCards

