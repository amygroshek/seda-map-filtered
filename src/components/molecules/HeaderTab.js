import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core';

const HeaderTab = ({text, subtext, icon, ...rest}) => {
  return (
    <div className="tab-label" {...rest}>
      { icon &&
          <img alt="" className="tab-label__icon" src={icon} />
      }
      <div className="tab-label__text">
        <Typography component="h3" variant="h6" className="tab-label__title">{text}</Typography>
        <Typography component="span" variant="subtitle1" className="tab-label__subtitle">{subtext}</Typography>
      </div>

    </div>
  )
}

HeaderTab.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  subtext: PropTypes.string,
}

export default HeaderTab
