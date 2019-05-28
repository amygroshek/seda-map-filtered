import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const Header = ({
  branding,
  primaryContent,
  secondaryContent,
  onActionClick, 
  classes = {} }
) => (
  <div className={classNames("header", classes.root)} color="default" position="sticky">
    <div className="header__row header__row--primary">
      <div className="header__branding">
        {branding}
      </div>
      <div className="header__content">
        {primaryContent}
      </div>
      <div className="header__actions">
        <IconButton onClick={() => onActionClick('menu')}>
          <MenuIcon />
        </IconButton>
      </div>
    </div>
    { secondaryContent &&
      <div className="header__row header__row--secondary">
        <div className="header__content">
          {secondaryContent}
        </div>
      </div>
    }

  </div>
);

Header.propTypes = {
  branding: PropTypes.node,
  primaryContent: PropTypes.node,
  secondaryContent: PropTypes.node,
  onActionClick: PropTypes.func.isRequired,
  children: PropTypes.element,
  classes: PropTypes.object,
};

export default Header