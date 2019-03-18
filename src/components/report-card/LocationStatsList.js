import React from 'react'
import PropTypes from 'prop-types'
import { getStateName } from '../../constants/statesFips';
import LocationStats from './LocationStats';

function LocationStatsList({locations, stats}) {
  return (
    <div className='location-stats-list'>
      { 
        locations && locations.map(
          ({id, name, ...rest}) =>
            <LocationStats 
              key={'loc' + id}
              id={id}
              name={name}
              state={getStateName(id)}
              metrics={stats}
              data={rest}
            />
        )
      }
    </div>
  )
}

LocationStatsList.propTypes = {
  locations: PropTypes.array,
  stats: PropTypes.object
}

export default LocationStatsList

