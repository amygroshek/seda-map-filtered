/* eslint-disable react/display-name */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import CloseButton from '../molecules/CloseButton';
import { Paper, Toolbar } from '@material-ui/core';

const Panel = React.forwardRef(({ 
  open, 
  onClose,
  title,
  children,
  classes = {},
  actions,
  closeId,
  ...rest
}, ref) => {
  return (
    <Paper
      square={true}
      elevation={0}
      classes={{
        root: classNames(
          'panel',
          classes.root,
          { 'panel--on': open }
        )
      }}
      {...rest}
    >
      <Toolbar classes={{ root: 'panel__toolbar' }}>
        { title }
        { open && actions }
        { (!actions && open && onClose) && <CloseButton id={closeId} onClick={onClose} /> }
      </Toolbar>
      { open && 
        <div ref={ref} className="panel__content">
          { children }
        </div> 
      }
    </Paper>
  )
})

Panel.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  actions: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func,
}

export default Panel
