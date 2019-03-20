import React from 'react'
import PropTypes from 'prop-types'
import { getStateName } from '../../constants/statesFips';
import LocationStats from './LocationStats';

function LocationStatsList({locations, stats}) {
  return (
      <div className='location-stats-list'>
        <div className='location-stats topone'>
        <div className='location-stats__header'>
          <div className="location-title"></div>
          <div className='location-subtitle'></div>      
        </div>
        <div className='location-stats__list'>
          <div className='location-stat'>
            <span>Average Test Scores</span>
          </div>
          <div className='location-stat'>
            <span>Growth Over Years</span>
          </div>
          <div className='location-stat'>
            <span>Trend Over Years</span>
          </div>
          <div className='location-stat'>
            <span>Socioeconomic Measure</span>
          </div>
        </div>
      </div>
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

