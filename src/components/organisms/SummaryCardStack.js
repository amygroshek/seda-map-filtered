import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Tabs, Tab } from '@material-ui/core';

import LocationPreview from '../organisms/LocationPreview';


const CardTransition = (props) => (
  <CSSTransition
    {...props}
    classNames="summary-group__cards"
    timeout={{ enter: 500, exit: 300 }}
  />
);

const SummaryCardStack = ({
  cards = [],
  activeId = null,
  children,
  metrics,
  demographic,
  classes = {},
  onCardDismiss,
  onCardClick,
  onCardHover,
  onCardExited,
  onCardEntered
}) => {
  const cardComponents = cards.map((c, i) => (
    <CardTransition 
      key={c.id} 
      onExited={() => onCardExited && onCardExited(c)}
      onEntered={() => onCardEntered && onCardEntered(c)}
    >
      <Tab 
        component="div"
        label={
          <LocationPreview
            key={'f'+i} 
            number={i+1} 
            feature={c.feature}
            demographic={demographic}
            metrics={metrics}
            onDismiss={() => onCardDismiss && onCardDismiss(c)}
            onClick={() => onCardClick && onCardClick(c)}
            onHover={() => onCardHover && onCardHover(c)}
          />
        }
        classes={{
          root: 'tab',
          selected: 'tab--selected',
          wrapper: 'tab__wrapper'
        }} 
      />
    </CardTransition>
  ))
  return (
    <div className={classNames("summary-group", classes.root)}>
      <TransitionGroup
        component={Tabs}
        className='summary-group__cards'
        variant='scrollable'
        scrollButtons={ cards.length > 4 ? 'on' : 'off' }
        value={0}
      >
        { cardComponents }
      </TransitionGroup>
      { children }
    </div>
  )
}

SummaryCardStack.propTypes = {
  cards: PropTypes.array,
  activeId: PropTypes.string,
  children: PropTypes.node,
  onCardDismiss: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardHover: PropTypes.func,
  onCardExited: PropTypes.func,
  onCardEntered: PropTypes.func,
}

export default SummaryCardStack
