import React from 'react'

const Logo = props => {
  return (
    <a href="/" className='logo__link'>
      <img
        className="logo__image"
        alt="The Educational Opportunity Project" 
        src="/assets/img/logo.svg" 
      />
    </a>
  )
}

Logo.propTypes = {

}

export default Logo
