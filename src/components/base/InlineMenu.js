import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MenuItem, Menu } from '@material-ui/core';
import { makeId } from '../../utils';
import Hint from './Hint';

function InlineMenu({
  id,
  options = [],
  value,
  formatter,
  hint,
  onChange
}) {
  id = id || useState(makeId())[0];
  const [ anchorEl, setAnchorEl ] = useState(null);
  const selectedItem = options.find(i => i.id === value);
  return (
    <div 
      style={{display: 'inline'}} 
      className='inline-menu'
    >
      <Hint
        className='hint__text hint__text--select'
        aria-owns={anchorEl ? id : undefined}
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        cursor="pointer"
        text={hint}
      >
        {
          formatter && selectedItem ?
            formatter(selectedItem) :
            selectedItem.label
        }
      </Hint>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {
          options.map((item, i) => 
            <MenuItem
              key={item.id + i}
              onClick={() => {onChange(id, item); setAnchorEl(null);}}
            >
              {item.label}
            </MenuItem>
          )
        }
      </Menu>
    </div>
  )
}

InlineMenu.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.array,
  formatter: PropTypes.func,
  hint: PropTypes.string,
}

export default InlineMenu

