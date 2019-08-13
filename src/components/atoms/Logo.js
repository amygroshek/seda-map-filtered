import React from 'react'
import PropTypes from 'prop-types';

const Logo = ({
  url = '/',
  ...rest
}) => {
  return (
    <a href={url} {...rest} className='logo__link'>
      <img
        className="logo__image"
        alt="The Educational Opportunity Project" 
        src="/assets/img/logo.svg" 
      />
    </a>
  )
}

Logo.propTypes = {
  url: PropTypes.string,
}

export default Logo
