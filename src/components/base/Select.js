import React from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const Select = ({ items, onChange, ...props }) => (
  <TextField
    select
    onChange={ (e) => onChange(e.target.value) }
    { ...props }
  >
    {items.map(item =>
      <MenuItem key={item.id} value={item.id}>
        <ListItemText primary={item.label} />
      </MenuItem>
    )}
  </TextField>
)

Select.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
}

export default Select;