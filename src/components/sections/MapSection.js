import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Map from '../map/Map';
import MapSectionHeader from '../map/MapSectionHeader';
import MapScatterplot from '../map/MapScatterplot';
import MapSearch from '../map/MapSearch';
import Controls from '../base/Controls';
import { loadRouteLocations } from '../../actions/featuresActions';
import { getHighlightControl, getRegionControl } from '../../modules/config';
import MapLocationCards from '../map/MapLocationCards';

const MapSection = ({
  controls = [],
  hasLocationsSelected,
  xVar,
  yVar,
}) => {
  return (
    <div className="section section--map">

      <div className="section__header">
        <Typography variant="h5" component="div" className="section__heading">
          <MapSectionHeader />
        </Typography>
        <Typography className="section__description">
          This paragraph gives an overview of what is shown on
          the scatterplot and map below.  It is dynamic text that
          can change based on the selections above.
        </Typography>
      </div>
      
      { hasLocationsSelected &&
        <div className="section__places">
          <MapLocationCards
            metrics={[yVar, xVar]}
          />
        </div>
      }
    
      <div className="section__component">

        <div className="section__controls">
          <Controls
            controls={controls}
          >
            <MapSearch />
          </Controls>
        </div>
        
        <div className="section__right">
          <Map />
        </div>
        <div className="section__left section__left--scatterplot">
          <MapScatterplot />
        </div>
      </div>
    </div>
  )
}

MapSection.propTypes = {
  controls: PropTypes.array,
  hasLocationsSelected: PropTypes.bool
}

const mapStateToProps = ({ 
  scatterplot: { loaded },
  selected,
  map: { usState, highlightState },
},
{ match: { params: { region, metric, demographic } } }
) => ({
  xVar: demographic + '_' + metric,
  yVar: demographic + '_ses',
  hasLocationsSelected: 
    selected && selected[region] && 
    selected[region].length > 0, 
  mapScatterplotLoaded: loaded && loaded['map'],
  controls: [
    getRegionControl(region),
    getHighlightControl(
      highlightState && usState ? usState : 'none'
    )
  ],
})

const mapDispatchToProps = (dispatch) => ({
  loadRouteLocations: (locations) => 
    dispatch(loadRouteLocations(locations))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapSection)
