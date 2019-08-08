import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { makeId } from '../../utils';

function InlineMenu({
  id,
  options = [],
  label,
  value,
  formatter,
  onChange
}) {
  id = id || useState(makeId())[0];
  const selectedItem = options.find(i => i.id === value);
  if(!selectedItem) {
    console.error('no selected item', id, value)
  }
  return (
    <FormControl className='inline-menu'>
      { label && <InputLabel htmlFor={id}>{label}</InputLabel> }
      <Select
        value={value}
        onChange={(e) => { onChange(e.target.value)}}
        inputProps={{
          name: label,
          id: id,
        }}
      >
        {
          options.map((item, i) => 
            <MenuItem
              key={item.id + i}
              value={item.id}
              // onClick={() => {onChange(id, item)}}
            >
              {
                formatter && item ?
                  formatter(item) :
                  item.label
              }
            </MenuItem>
          )
        }
      </Select>
    </FormControl>
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

