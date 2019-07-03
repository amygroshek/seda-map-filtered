import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';

function Section({ 
  id, 
  children,
  leftComponent,
  rightComponent,
  headerContent,
  footerContent,
  classes = {},
  ...rest
}) {
  return (
    <div 
      id={id} 
      name={id} 
      className={classNames("section", classes.root)}
      {...rest}
    >
      <div className="section__header">
        { headerContent }
      </div>
      <div className={classNames("section__content", classes.content)}>
        <div className="section__left">{leftComponent}</div>
        <div className="section__children">{children}</div>
        <div className="section__right">{rightComponent}</div>
      </div>
      <div className="section__footer">
        { footerContent }
      </div>
    </div>
  )
}

Section.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
  headerContent: PropTypes.node,
  footerContent: PropTypes.node,
  leftComponent: PropTypes.node,
  rightComponent: PropTypes.node,
  classes: PropTypes.object,
}

export default Section

