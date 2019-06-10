import React from 'react';
import PropTypes from 'prop-types';

import CardHeader from '@material-ui/core/CardHeader';
import CloseButton from './CloseButton';
import Marker from '../atoms/Marker';
import { Card, CardContent } from '@material-ui/core';

const SummaryCard = ({
  id,
  title,
  summary,
  color,
  children,
  onDismiss,
  ...rest
}) => {
  return (
    <Card
      classes={{
        root: 'summary-card'
      }}
      {...rest}
    >
      <CardHeader
        classes={{
          root: 'summary-card__header'
        }}
        avatar={
          color && <Marker 
            className="marker--location"
            color={color} 
          />
        }
        action={
          onDismiss && <CloseButton size="small"
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              onDismiss(id); 
              return false; 
            }} 
          />
        }
        title={title}
        subheader={summary}
      />
      { children && 
        <CardContent classes={{
          root: 'summary-card__content'
        }}>
          {children}
        </CardContent>
      }
    </Card>
  )
}

SummaryCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  onDismiss: PropTypes.func
}

export default SummaryCard