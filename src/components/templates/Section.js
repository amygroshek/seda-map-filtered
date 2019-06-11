import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';


function Section({ 
  id, 
  children,
  headerContent,
  footerContent,
  classes = {},
}) {
  return (
    <div 
      id={id} 
      name={id} 
      className={classNames("section", classes.root)}
    >
      <div className="section__header">
        { headerContent }
      </div>
      <div className={classNames("section__content", classes.content)}>
        { children }
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
  classes: PropTypes.object,
}

export default Section

