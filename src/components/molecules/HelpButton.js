import React from 'react'
import { getLang } from '../../constants/lang';
import { IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

const HelpButton = props => {
  return (
    <IconButton 
      className="button--help" 
      aria-label={getLang('HELP_SCREEN_READER')} 
      {...props}
    >
      <HelpIcon />
    </IconButton>
  )
}

export default HelpButton
