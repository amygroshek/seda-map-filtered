import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Header = ({
  branding,
  children,
  primaryContent,
  secondaryContent,
  actionContent, 
  classes = {} }
) => (
  <header className={classNames("header", classes.root)}>
    <div className="header__row header__row--primary">
      <div className="header__branding">
        { branding }
      </div>
      <div className="header__content">
        { children }
        { primaryContent }
      </div>
      <div className="header__actions">
        {actionContent}
      </div>
    </div>
    { secondaryContent &&
      <div className="header__row header__row--secondary">
        <div className="header__content">
          {secondaryContent}
        </div>
      </div>
    }
  </header>
);

Header.propTypes = {
  branding: PropTypes.node,
  primaryContent: PropTypes.node,
  secondaryContent: PropTypes.node,
  actionContent: PropTypes.node,
  children: PropTypes.element,
  classes: PropTypes.object,
};

export default Header