import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import LocationCards from '../base/LocationCards';
import MapSearch from '../map/MapSearch';
import MenuSentence from '../base/MenuSentence';
import { getLang } from '../../constants/lang';
import { CSSTransitionGroup } from 'react-transition-group'

function Section({ 
  id, 
  type,
  title, 
  description,
  headerMenu,
  cards,
  children,
  onOptionChange,
  onCardDismiss,
  onCardHover,
  onCardClick
}) {
  return (
    <div id={id} name={id} className={"section section--" + (type || id)}>
      <div className="section__header">
        {
          typeof(title) === 'string' ?
            <Typography 
              variant="h5" 
              component="div" 
              className="section__heading"
            >
              {title}
            </Typography>
            :
            <MenuSentence
              className="section__heading"
              variant="h5"
              onChange={onOptionChange}
              {...title}
            />
        }
        
        <Typography 
          component="div" 
          className="section__description"
        >
          {description}
        </Typography>
      </div>

      <div className="section__body">
      
        <div className="section__places">
          <LocationCards
            section={id}
            onCardDismiss={onCardDismiss}
            onCardHover={onCardHover}
            onCardClick={onCardClick}
            {...cards}
          >
            { cards.features.length < 7 &&
              <div key={'section-search'} className="location-card location-card--search">
                <Typography component="p" className="helper helper--card-search">
                  { getLang('CARD_SEARCH_HELPER') }
                </Typography>
              </div>
            }
          </LocationCards>
        </div>

        {/* Hack approach to overlay search on top of visualization */}
        <div className="section__places section__places--overlay">
          
          <CSSTransitionGroup
            component="div"
            className={"location-card-list location-card-list--" + cards.features.length}
            transitionName="location-card"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {
              Boolean(cards.features) && Boolean(cards.features.length) && 
                [...Array(cards.features.length)].map((_, i) =>
                  <div key={'pchld-'+i} className="location-card"></div>
                )
            }
            {
              cards.features.length < 7 &&
                <div key={'section-search-overlay'} className="location-card location-card--search">
                  <MapSearch
                    inputProps={{
                      placeholder: getLang('CARD_SEARCH_PLACEHOLDER')
                    }}
                  />
                </div>
            }
          </CSSTransitionGroup>
        </div>

        <div className="section__component">

          <div className="section__controls">
            <MenuSentence 
              {...headerMenu}
              onChange={onOptionChange}
            />
          </div>
          { children }
        </div>
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
  headerMenu: PropTypes.shape({
    text: PropTypes.string,
    controls: PropTypes.array,
  }),
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

