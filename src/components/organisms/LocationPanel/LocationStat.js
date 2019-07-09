import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import ArrowStat from '../../molecules/ArrowStat';

const LocationStat = ({
  title,
  value,
  color,
  direction,
  description,
  formatter,
}) => {
  return (
    <div className={classNames("stats-summary")}>
      { title && 
        <Typography className="stats-summary__title">{title}</Typography>
      }
      <div className="stats-summary__content">
        <ArrowStat 
          value={value}
          color={color}
          direction={direction}
          formatter={formatter}
        />
        <p 
          className="stats-summary__description" 
          dangerouslySetInnerHTML={{ '__html': description }} 
        />
      </div>
    </div>
  )
}

LocationStat.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  color: PropTypes.string,
  direction: PropTypes.string,
  description: PropTypes.string,
  formatter: PropTypes.func,
}

export default LocationStat
