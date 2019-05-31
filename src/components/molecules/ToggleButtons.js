
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
  if (item === activeItem) { return true }
  if (item.hasOwnProperty('id') && activeItem.hasOwnProperty('id')) {
    return item.id === activeItem.id
  }
  return false;
}

const ToggleButtons = ({
  items, 
  activeItem, 
  setActiveItem, 
  classes = {}, 
  ...rest
}) => {
  return (
    <div 
      className={classNames('toggle', classes.root)}
      {...rest}
    >
      { items && items.map((item, i) => 
        <Button
          key={ 'toggle'+i }
          classes={{...classes.button}}
          className={
            classNames(
              'toggle__button', 
              {'toggle__button--active': isActive(item, activeItem)}
            )
          }
          onClick={() => setActiveItem(item)}
        >
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
        label: PropTypes.string
      }),
      PropTypes.string
    ])
  ),
  activeItem: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string
    }),
    PropTypes.string
  ]),
  setActiveItem: PropTypes.func,
  classes: PropTypes.object
}

export default ToggleButtons