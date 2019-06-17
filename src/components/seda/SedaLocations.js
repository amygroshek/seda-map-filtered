import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SummaryCardStack from '../organisms/SummaryCardStack';
import { getSelectedColors } from '../../modules/config';
import { getTooltipText } from '../../style/scatterplot-style';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { onRemoveSelectedFeature, onViewportChange, onHoverFeature, updateMapSize, setActiveLocation } from "../../actions/mapActions";
import { parseLocationsString, getLocationFromFeature } from '../../modules/router';
import * as _debounce from 'lodash.debounce';

const SELECTED_COLORS = getSelectedColors();

const SedaLocations = ({
  onShowStats,
  ...stackProps

}) => {
  return (
    <SummaryCardStack
      {...stackProps}
    >
    </SummaryCardStack>
  )
}

SedaLocations.propTypes = {
  cards: PropTypes.array,
  activeId: PropTypes.string,
  onCardDismiss: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardHover: PropTypes.func,
  onShowStats: PropTypes.func,
  onCardExited: PropTypes.func,
}

/**
 * Returns an array of selected locations for the region
 */
const getSelectedIdsForRegion = (selected, region) =>
  selected && selected[region] ? selected[region] : []

/**
 * Returns the name followed by the state for the location
 */
const getLocationNameFromFeature = 
  ({ properties: { name, state }}) =>
    name && state ? [name, state].join(', ') : 'Unknown'

/**
 * Returns the text summary for the location
 */
const getLocationSummaryFromFeature = (feature, { metric, demographic }) => {
  const keys = [ [demographic, metric].join('_') ]
  const keyValues = keys.reduce((obj, k) => ({
    ...obj,
    [k]: feature.properties[k]
  }), {})
  return getTooltipText(keyValues)
}

/**
 * Returns the color associated with the given index
 * @param {*} index 
 */
const getLocationColor = (index) =>
  SELECTED_COLORS[index % SELECTED_COLORS.length]

/**
 * Returns card objects for given selected state,
 * feature state, and route params
 */
const getCards = (selected, features, params) =>
  getSelectedIdsForRegion(selected, params['region'])
    .map(id => features[id])
    .map((f, i) => ({
      id: f.properties.id,
      title: getLocationNameFromFeature(f),
      summary: getLocationSummaryFromFeature(f, params),
      color: getLocationColor(i),
      feature: f
    }))

const mapStateToProps = (
  { selected, features }, 
  { match: { params }}
) => ({
  cards: getCards(selected, features, params)
})

const mapDispatchToProps = (dispatch) => ({
  onCardDismiss: ({feature}) => 
    dispatch(onRemoveSelectedFeature(
      feature
    )),
  onCardHover: ({feature}) => {
    dispatch(onHoverFeature(feature, 'map'))
  },
  onCardClick: ({feature}) => {
    const l = parseLocationsString(
      getLocationFromFeature(feature)
    )[0];
    if (l) {
      dispatch(setActiveLocation(feature))
      dispatch(onViewportChange({ 
        latitude: parseFloat(l.lat), 
        longitude: parseFloat(l.lon),
        zoom: l.id.length + 2
      }, true))
    }
  },
  onCardEntered: _debounce(
    () => dispatch(updateMapSize()), 
    200
  ),
  onCardExited: _debounce(
    () => dispatch(updateMapSize()), 
    200
  ),
  onShowStats: () => {
    console.log('show stats')
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaLocations)
