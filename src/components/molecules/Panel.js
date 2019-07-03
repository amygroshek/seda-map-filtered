import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import CloseButton from '../molecules/CloseButton';
import { Paper, Toolbar } from '@material-ui/core';

const Panel = ({ 
  open, 
  onClose,
  title,
  children,
  classes = {},
  actions,
  ...rest
}) => {
  return (
    <Paper
      square={true}
      elevation={2}
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
        { actions }
        { (!actions && onClose) && <CloseButton onClick={onClose} /> }
      </Toolbar>
      <div className="panel__content">
        { children }
      </div>
    </Paper>
  )
}

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
