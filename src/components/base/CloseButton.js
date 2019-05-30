import React from 'react'
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const CloseButton = (props) => {
  return (
    <IconButton aria-label="close" {...props}>
      <CloseIcon />
    </IconButton>
  )
}

export default CloseButton
