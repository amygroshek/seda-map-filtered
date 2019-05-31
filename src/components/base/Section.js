import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';


function Section({ 
  id, 
  type='default',
  children,
  overlayContent,
  classes = {},
}) {
  return (
    <div 
      id={id} 
      name={id} 
      className={classNames("section", classes.root)}
    >
      <div className="section__overlay">
        { overlayContent }
      </div>
      <div className={classNames("section__content", classes.content)}>
        { children }
      </div>
      
        {/* <div className={classNames("section__search", classes.search)}>
          <MapSearch
            inputProps={{
              placeholder: getLang('CARD_SEARCH_PLACEHOLDER')
            }}
          />
        </div> */}


    </div>
  )
}

Section.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
  overlayContent: PropTypes.node,
}

export default Section

