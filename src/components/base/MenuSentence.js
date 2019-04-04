import React from 'react'
import PropTypes from 'prop-types'
import InlineMenu from './InlineMenu';
import { Typography } from '@material-ui/core';

function MenuSentence({text, controls, onChange, ...rest}) {
  let controlIndex = 0;
  const chunks = text.split(/(\d)/)
    .filter(chunk => chunk[chunk.length-1] === '$')
    .map(chunk => chunk.substr(0, chunk.length-1))
    .reduce((arr, chunk, i) => {
      arr.push(
        <span key={'chunk'+i+'text'}>{chunk}</span> 
      )
      arr.push(
        <InlineMenu 
          key={'chunk'+i+'menu'} 
          {...controls[controlIndex++]}
          onChange={onChange}
        />
      )
      return arr;
    }, [])
  return (
    <Typography component="div" {...rest}>
      { chunks.map(c => c) }
    </Typography>
  )
}

MenuSentence.propTypes = {
  text: PropTypes.string,
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
  onChange: PropTypes.func
}

export default MenuSentence

