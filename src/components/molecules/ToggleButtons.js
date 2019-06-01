
import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@material-ui/core';

/**
 * Checks if the provided item is equal to the activeItem
 * @param {string|object} item 
 * @param {string|object} activeItem 
 * @returns {boolean}
 */
const isActive = (item, activeItem) => {
  if (!item || !activeItem) { return false }
  if (item === activeItem) { return true }
  if (item.hasOwnProperty('id') && activeItem) {
    return item.id === activeItem
  }
  return false;
}

const ToggleButtons = ({
  items, 
  activeItemId, 
  setActiveItem,
  classes = {}, 
  ...rest
}) => {
  return (
    <div 
      className={classNames('toggle-buttons', classes.root)}
      {...rest}
    >
      { items && items.map((item, i) => 
        <Button
          key={ 'toggle'+i }
          classes={{...classes.button}}
          className={
            classNames(
              'toggle-buttons__button', 
              {'toggle-buttons__button--active': isActive(item, activeItemId)}
            )
          }
          onClick={() => setActiveItem(item)}
        >
          { item.hasOwnProperty('icon') && item.icon }
          { item.hasOwnProperty('label') ? item.label : item }
        </Button>
      )}
    </div>
  )
}

ToggleButtons.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        icon: PropTypes.node,
      }),
      PropTypes.string
    ])
  ),
  activeItemId: PropTypes.string,
  icon: PropTypes.node,
  setActiveItem: PropTypes.func,
  classes: PropTypes.object
}

export default ToggleButtons