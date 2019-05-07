import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import MapSearch from '../map/MapSearch';
import { getLang } from '../../constants/lang';

function Section({ 
  id, 
  type='default',
  title, 
  description,
  cards,
  children,
  classes = {},
  onOptionChange,
  onCardDismiss,
  onCardHover,
  onCardClick
}) {
  return (
    <div id={id} name={id} className={classNames("section", "section--" + type, "section--" + id, classes.root)}>
      
        <div className={classNames("section__search", classes.search)}>
          <MapSearch
            inputProps={{
              placeholder: getLang('CARD_SEARCH_PLACEHOLDER')
            }}
          />
        </div>

        <div className={classNames("section__component", classes.component)}>
          { children }
        </div>

    </div>
  )
}

Section.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.any,
  description: PropTypes.string,
  children: PropTypes.node,
  cards: PropTypes.shape({
    features: PropTypes.array,
    metrics: PropTypes.array,
  }),
  onOptionChange: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardHover: PropTypes.func,
  onCardDismiss: PropTypes.func,
}

export default Section

