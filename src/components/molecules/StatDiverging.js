import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import DivergingBar from './DivergingBar';
import { Typography } from '@material-ui/core';

const StatDiverging = ({
  label,
  description,
  showDescription = false,
  ...rest
}) => {
  return (
    <div 
      className={classNames(
        "stat", 
        "stat--diverging", 
        { "stat--long": Boolean(description)}
      )}
      role={showDescription ? undefined : 'img'}
      aria-label={showDescription ? undefined : description}
    >
      { label && 
          <Typography aria-hidden={showDescription ? true : undefined} className="stat__label" variant="subtitle2">
            {label}
          </Typography>
      }
      <DivergingBar
        aria-hidden={showDescription ? true : undefined}
        {...rest}
      />
      { showDescription &&
        <Typography variant="body1"
          // eslint-disable-next-line
          role="text"
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
