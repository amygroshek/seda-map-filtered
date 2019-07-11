import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types'
import { ButtonBase } from '@material-ui/core';

const Callout = ({icon, size, children, type, ...rest}) => (
  <ButtonBase className={classNames(
      'callout', 
      type ? 'callout--'+type : null,
      size ? 'callout--'+size : null
    )}
    {...rest}
  >
    { icon && <span className='callout__icon'>{icon}</span> }
    <span className='callout__text'>{children}</span>
  </ButtonBase>
)

Callout.propTypes = {
  icon: PropTypes.node,
  type: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.string,
}

export default Callout
