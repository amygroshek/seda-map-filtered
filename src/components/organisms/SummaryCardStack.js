import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'
import SummaryCard from '../molecules/SummaryCard';
import { Tabs, Tab } from '@material-ui/core';

const SummaryCardStack = ({
  cards = [],
  activeId = null,
  children,
  onCardDismiss,
  onCardClick,
  onCardHover
}) => {
  return (
    <div className="summary-group">
      <CSSTransitionGroup
        component={Tabs}
        className={'summary-group__cards summary-group__cards--' + cards.length}
        transitionName="summary-group__cards"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        variant='scrollable'
        scrollButtons={ cards.length > 3 ? 'on' : 'off' }
        value={0}
      >
        { 
          Boolean(cards.length) && cards.map(
            (c, i) =>
            <Tab 
              key={'tab'+i}
              value={c.id}
              component="div"
              label={
                <SummaryCard 
                  key={'loc' + c.id}
                  id={c.id}
                  order={i+1}
                  active={c.id === activeId}
                  title={c.title}
                  summary={c.summary}
                  color={c.color}
                  onDismiss={() => onCardDismiss(c)}
                  onClick={() => onCardClick(c)}
                  onHover={() => onCardHover(c)}
                />
              }
              classes={{
                root: 'tab',
                selected: 'tab--selected',
                wrapper: 'tab__wrapper'
              }} 
            />
          )
        }
      </CSSTransitionGroup>
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
}

export default SummaryCardStack
