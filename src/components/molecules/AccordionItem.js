import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export default function AccordionItem({
  id, 
  expanded, 
  heading, 
  content,
  onChange,
  ...rest
}) {
  return (
    <ExpansionPanel 
      square 
      expanded={expanded} 
      onChange={() => {onChange && onChange(id)}}
      classes={{root: 'accordion-item'}}
      {...rest}
    >
      <ExpansionPanelSummary 
        expandIcon={<ExpandMoreIcon />}
        aria-controls={id + "-content"} 
        id={ id + "-header" }
        classes={{root: 'accordion-item__heading'}}
      >
        <Typography>{heading}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails 
        classes={{root: 'accordion-item__content'}}
      >
        { typeof content === 'string' && 
          <div dangerouslySetInnerHTML={{'__html': content }} />
        }
        { typeof content !== 'string' && content }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

AccordionItem.propTypes = {
  id: PropTypes.string,
  expanded: PropTypes.bool,
  heading: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  onChange: PropTypes.func,
}