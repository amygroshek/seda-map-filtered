import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export default function AccordionItem({
  id, 
  expanded, 
  heading, 
  htmlContent,
  children,
  onChange,
  className,
  ...rest
}) {
  return (
    <ExpansionPanel 
      square 
      expanded={expanded} 
      onChange={() => {onChange && onChange(id)}}
      classes={{root: classNames('accordion-item', className) }}
      {...rest}
    >
      <ExpansionPanelSummary 
        expandIcon={<ExpandMoreIcon />}
        aria-controls={id + "-content"} 
        id={ id + "-header" }
        classes={{root: classNames(
          'accordion-item__heading', 
          (Boolean(className) && className+'__heading')
        )}}
      >
        <Typography>{heading}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails 
        classes={{root: classNames(
          'accordion-item__content', 
          (Boolean(className) && className+'__content')
        )}}
      >
        { htmlContent && 
          <div dangerouslySetInnerHTML={{'__html': htmlContent }} />
        }
        { children }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

AccordionItem.propTypes = {
  id: PropTypes.string,
  expanded: PropTypes.bool,
  heading: PropTypes.string,
  htmlContent: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  className: PropTypes.string,
}