import React from 'react'
import classNames from 'classnames';
import { getLang } from '../../modules/lang';
import { Button } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

const HelpButton = ({className, ...props}) => {
  return (
    <Button 
      className={classNames("button--help", className)}
      color='secondary'
      variant="contained"
      size="small"
      {...props}
    >
      { getLang('HELP_BUTTON') }
    </Button>
  )
}

export default HelpButton
