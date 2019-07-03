

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { getStateSelectOptions } from '../../constants/statesFips';
import { getSingularRegions, getDemographics } from '../../modules/config';
import InlineMenu from '../atoms/InlineMenu';
import { updateRoute } from '../../modules/router';
import { navigateToStateByAbbr } from '../../actions';

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
        const routeUpdates = { region: option.id };
        // set demographic to 'all' if switching to schools
        if (option.id === 'schools') {
          routeUpdates['demographic'] = 'all';
        }
        updateRoute(ownProps, routeUpdates)
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
        ...getDemographics().filter(d => d.id !== 'frl'), 
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
      onChange: (id, option) => updateRoute(ownProps, { 
        [id]: option.id
      })
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
      onChange: (id, option) => {
        updateRoute(ownProps, { 
          highlightedState: option.id
        })
        dispatch(navigateToStateByAbbr(option.id))
      }
    })
  )
)(HighlightedStateMenu)
