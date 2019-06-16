

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { getStateSelectOptions } from '../../constants/statesFips';
import { getSingularRegions, getDemographics } from '../../modules/config';
import InlineMenu from '../atoms/InlineMenu';
import { updateRoute } from '../../modules/router';
import { navigateToStateByAbbr } from '../../actions/mapActions';

export const RegionControl = compose(
  withRouter,
  connect(
    (state, { match: { params: { region = 'counties' }}}) => ({
      id: 'region', 
      label: 'Region',
      value: region,
      options: getSingularRegions()
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
)(InlineMenu)

export const DemographicAndGapControl = compose(
  withRouter,
  connect(
    (state, { match: { params: { demographic = 'all' }}}) => ({
      id: 'demographic', 
      label: 'Demographics',
      value: demographic,
      options: [
        ...getDemographics().filter(d => d.id !== 'frl'), 
        // ...getGaps()      
      ],
      formatter: (option) => option.label + (
        demographic.length === 1 || demographic === 'all' ? ' students' : ''
      ),
    }),
    (dispatch, ownProps) => ({
      onChange: (id, option) => updateRoute(ownProps, { 
        [id]: option.id
      })
    })
  )
)(InlineMenu)


export const HighlightedStateControl = compose(
  withRouter,
  connect(
    (state, { match: { params: { highlightedState = 'us' }}}) => ({
      id: 'highlight',
      label: 'Highlight',
      value: highlightedState,
      options: [
        {
          id: 'us',
          label: 'U.S.'
        },
        ...getStateSelectOptions()
      ],
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
)(InlineMenu)
