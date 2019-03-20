import React from 'react';
import PropTypes from 'prop-types';


function LocationStats({id, name, state, metrics, data}) {
  return (
    <div className='location-stats'>
      <div className='location-stats__header'>
        <div className="location-title">{name}</div>
        <div className='location-subtitle'>{state}</div>      
      </div>
      <div className='location-stats__list'>
        {
          Object.keys(metrics).map(k =>
            metrics[k] && data[k] &&
            <div key={'stat_' + k} className='location-stat'>
              <span>{data[k] && data[k] !== -9999 ? Math.round(data[k]*100)/100 : 'Unavailable'}</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

LocationStats.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  state: PropTypes.string,
  metrics: PropTypes.object,
  data: PropTypes.object
}

export default LocationStats

