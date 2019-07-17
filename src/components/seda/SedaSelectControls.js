

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { getStateSelectOptions } from '../../constants/statesFips';
import { getSingularRegions, getDemographics } from '../../modules/config';
import InlineMenu from '../atoms/InlineMenu';
import { onRegionChange, onDemographicChange, onHighlightedStateChange } from '../../actions';

const RegionInlineMenu = ({region, onChange}) => {
  return (
    <InlineMenu 
      id='region'
      label='Region'
      value={region}
      options={getSingularRegions()}
      onChange={onChange}
    />
  )
}
RegionInlineMenu.propTypes = {
  region: PropTypes.string,
  onChange: PropTypes.func,
}

export const RegionControl = compose(
  withRouter,
  connect(
    (s, { match: { params: { region = 'counties' }}}) => ({
      region
    }),
    (dispatch, ownProps) => ({
      onChange: (id, option) => {
        dispatch(onRegionChange(option.id, ownProps))
      }
    })
  )
)(RegionInlineMenu)

const DemographicAndGapMenu = ({demographic, onChange}) => {
  return (
    <InlineMenu 
      id='demographic'
      label='Demographics'
      value={demographic}
      options={[
        ...getDemographics(), 
        // ...getGaps()      
      ]}
      formatter={(option) => option.label + (
        demographic.length === 1 || demographic === 'all' ? ' students' : ''
      )}
      onChange={onChange}
    />
  )
}
DemographicAndGapMenu.propTypes = {
  demographic: PropTypes.string,
  onChange: PropTypes.func,
}

export const DemographicAndGapControl = compose(
  withRouter,
  connect(
    (s, { match: { params: { demographic = 'all' }}}) => ({
      demographic
    }),
    (dispatch, ownProps) => ({
      onChange: (id, option) => 
        dispatch(onDemographicChange(option.id, ownProps))
    })
  )
)(DemographicAndGapMenu)


const HighlightedStateMenu = ({highlightedState, onChange}) => {
  return (
    <InlineMenu 
      id='highlight'
      label='Highlight'
      value={highlightedState}
      options={[
        {
          id: 'us',
          label: 'U.S.'
        },
        ...getStateSelectOptions()
      ]}
      onChange={onChange}
    />
  )
}
HighlightedStateMenu.propTypes = {
  highlightedState: PropTypes.string,
  onChange: PropTypes.func,
}


export const HighlightedStateControl = compose(
  withRouter,
  connect(
    (s, { match: { params: { highlightedState = 'us' }}}) => ({
      highlightedState
    }),
    (dispatch, ownProps) => ({
      onChange: (id, option) =>
        dispatch(onHighlightedStateChange(option.id, ownProps))
    })
  )
)(HighlightedStateMenu)
