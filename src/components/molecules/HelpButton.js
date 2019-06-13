import React from 'react'
import classNames from 'classnames';
import { getLang } from '../../constants/lang';
import { IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

const HelpButton = ({className, ...props}) => {
  return (
    <IconButton 
      className={classNames("button--help", className)}
      color='secondary'
      aria-label={getLang('HELP_SCREEN_READER')} 
      {...props}
    >
      <HelpIcon />
    </IconButton>
  )
}

export default HelpButton
