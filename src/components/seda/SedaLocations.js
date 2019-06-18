import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SummaryCardStack from '../organisms/SummaryCardStack';
import { getSelectedColors } from '../../modules/config';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { onRemoveSelectedFeature, onViewportChange, onHoverFeature, updateMapSize, setActiveLocation } from "../../actions/mapActions";
import { parseLocationsString, getLocationFromFeature } from '../../modules/router';
import * as _debounce from 'lodash.debounce';

const SELECTED_COLORS = getSelectedColors();

/**
 * Returns the name followed by the state for the location
 */
const getLocationNameFromFeature = 
  ({ properties: { name, state }}) =>
    name && state ? [name, state].join(', ') : 'Unknown'

/**
 * Returns the text summary for the location
 */
// const getLocationSummaryFromFeature = (feature, { metric, demographic }) => {
//   const keys = [ [demographic, metric].join('_') ]
//   const keyValues = keys.reduce((obj, k) => ({
//     ...obj,
//     [k]: feature.properties[k]
//   }), {})
//   return getTooltipText(keyValues)
// }

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
const getCards = (selected, features) =>
  selected
    .map(id => features[id])
    .map((f, i) => ({
      id: f.properties.id,
      title: getLocationNameFromFeature(f),
      color: getLocationColor(i),
      feature: f
    }))


const SedaLocations = ({
  selected,
  features,
  onCardDismiss, 
  onCardHover, 
  onCardClick, 
  onCardEntered, 
  onCardExited
}) => {
  const cards = useMemo(() => getCards(selected, features), [ selected ])
  return (
    <SummaryCardStack
      {...{cards, onCardDismiss, onCardHover, onCardClick, onCardEntered, onCardExited}}
    >
    </SummaryCardStack>
  )
}

SedaLocations.propTypes = {
  selected: PropTypes.array,
  features: PropTypes.object,
  activeId: PropTypes.string,
  onCardDismiss: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardHover: PropTypes.func,
  onCardExited: PropTypes.func,
  onCardEntered: PropTypes.func,
}

const mapStateToProps = (
  { selected, features, active }, 
  { match: { params: {region} }}
) => ({
  activeId: active && active.properties ? active.properties.id : null,
  selected: (selected[region] || []),
  features
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
  )
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaLocations)
