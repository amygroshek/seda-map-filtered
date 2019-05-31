import React from 'react'
import PropTypes from 'prop-types'

const Footer = ({
  branding, 
  copyright, 
  links,
}) => {
  return (
    <footer className="site-footer">
      <div className="site-footer__branding">
        {branding}
      </div>
      <div className="site-footer__copyright">
        {copyright}
      </div>
      <div className="site-footer__links">
        {links}
      </div>
    </footer>
  )
}

Footer.propTypes = {
  copyright: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  branding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  links: PropTypes.node
}

export default Footer
