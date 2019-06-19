import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import SummaryCard from '../molecules/SummaryCard';
import { Tabs, Tab } from '@material-ui/core';


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
          <SummaryCard 
            key={'loc' + c.id}
            id={c.id}
            order={i+1}
            title={c.title}
            summary={c.summary}
            color={c.color}
            onDismiss={() => onCardDismiss && onCardDismiss(c)}
            onClick={() => onCardClick && onCardClick(c)}
            onMouseEnter={() => onCardHover && onCardHover(c)}
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
    <div className={classNames("summary-group", { 'summary-group--shift': activeId })}>
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
