import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import CloseButton from '../base/CloseButton';

const SedaMenu = ({
  open = false,
  navItems = [],
  activeItem = null,
  socialItems = [],
  onClose,
}) => {
  return (
    <div className={classNames("site-menu", { 'site-menu--open': open })}>
      <CloseButton onClick={onClose} />
      <nav>
        <ul>
          { Boolean(navItems.length) && navItems.map((item, i) =>
            <li key={"nav-" + i}></li>
          ) }
        </ul>
      </nav>
    </div>
  )
}

SedaMenu.propTypes = {
  open: PropTypes.bool,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  activeItem: PropTypes.string,
  socialItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      icon: PropTypes.string,
      label: PropTypes.string,
    })
  )
}

export default SedaMenu
