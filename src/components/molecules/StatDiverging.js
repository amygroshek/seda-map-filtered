import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import DivergingBar from './DivergingBar';
import { Typography } from '@material-ui/core';

const StatDiverging = ({
  label,
  description,
  ...rest
}) => {
  return (
    <div className={classNames(
      "stat", 
      "stat--diverging", 
      { "stat--long": Boolean(description)}
    )}>
      { label && 
          <Typography className="stat__label" variant="subtitle2">
            {label}
          </Typography>
      }
      <DivergingBar
        {...rest}
      />
      { description  &&
        <Typography variant="body1"
          className="stat__description" 
          dangerouslySetInnerHTML={{ '__html': description }} 
        />
      }
    </div>
  )
}

StatDiverging.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
}

export default StatDiverging
