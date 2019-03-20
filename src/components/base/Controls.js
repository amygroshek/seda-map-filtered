import React from 'react'
import PropTypes from 'prop-types'
import Select from '../base/Select';

/**
 * Renders select boxes for every configuration item in `controls`
 */
function Controls({controls, onOptionChange, children }) {
  return (
    <div className='controls'>
      { 
        controls.map(c =>
          <Select
            key={c.id + '-select'}
            label={c.label}
            value={ c.value }
            items={ c.options }
            onChange={
              (e) => onOptionChange && 
                onOptionChange({ id: c.id, value: e })
            }
          />
        )
      }
      { children }
    </div>
  )
}

Controls.propTypes = {
  controls: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({ 
          id: PropTypes.string, 
          label: PropTypes.string 
        })
      )
    })
  ),
  onOptionChange: PropTypes.func,
  children: PropTypes.any
}

export default Controls

