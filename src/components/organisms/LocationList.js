import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Typography } from '@material-ui/core';
import LocationItem from './LocationItem';

const LocationList = ({summary, feature, className, others = []}) => {
  return feature ? (
    <div className={classNames('location-list', className)}>
      { summary && 
        <Typography paragraph={true}>{summary}</Typography> 
      }
      {
        others.map((f,i) =>
          f.properties.id !== feature.properties.id && 
            <LocationItem key={'f'+i} feature={f} />
        )
      }
    </div>
  ) : (null)
}

LocationList.propTypes = {
  summary: PropTypes.string,
  feature: PropTypes.object,
  others: PropTypes.array,
  className: PropTypes.string,
}

export default LocationList;


