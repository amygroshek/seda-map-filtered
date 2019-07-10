import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import DivergingBar from './DivergingBar';
import { Typography } from '@material-ui/core';


const StatDiverging = ({
  label,
  ...rest
}) => {
  return (
    <div className={classNames("stat", "stat--diverging")}>
      <Typography className="stat__label" variant="subtitle2">
        {label}
      </Typography>
      <DivergingBar
        {...rest}
      />
    </div>
  )
}

StatDiverging.propTypes = {
  label: PropTypes.string,
}

export default StatDiverging
