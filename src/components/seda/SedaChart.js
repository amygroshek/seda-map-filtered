import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getScatterplotVars, getChoroplethColors } from '../../modules/config';
import { getStateFipsFromAbbr } from '../../constants/statesFips';
import { loadLocation, onHoverFeature, onScatterplotData, onScatterplotLoaded, onScatterplotError, onCoordsChange } from "../../actions";
import Scatterplot from '../organisms/Scatterplot';
import SedaLocationMarkers from './SedaLocationMarkers';
import ScatterplotHeading from '../organisms/Scatterplot/ScatterplotHeading';
import ScatterplotAxis from '../organisms/Scatterplot/ScatterplotAxis';

const COLORS = getChoroplethColors();


const SedaExplorerChart = ({
  region,
  metric,
  demographic,
  secondary,
  highlightedState,
  hovered,
  data,
  onData,
  onReady,
  onHover,
  onClick,
  onError,
}) => {
  const vars = getScatterplotVars(region, metric, demographic);
  return (
    <Scatterplot {...{
      ...vars,
      region,
      data,
      variant: 'map',
      colors: COLORS,
      highlightedState: getStateFipsFromAbbr(highlightedState),
      onData,
      onReady,
      onHover,
      onClick,
      onError
    }}>
      <ScatterplotHeading {...{...vars, region, highlightedState}} />
      <SedaLocationMarkers {...{...vars}} />
      <ScatterplotAxis
        axis='y'
        varName={vars.yVar}
        hovered={hovered}
        region={region}
        className='scatterplot__axis scatterplot__axis--y'
      />
      <ScatterplotAxis
        axis='x'
        varName={vars.xVar}
        hovered={hovered}
        region={region}
        className='scatterplot__axis scatterplot__axis--x'
      />
    </Scatterplot>
  )
}

SedaExplorerChart.propTypes = {
  region: PropTypes.string,
  metric: PropTypes.string,
  demographic: PropTypes.string,
  highlightedState: PropTypes.string,
  hovered: PropTypes.object,
  data: PropTypes.object,
  onData: PropTypes.func,
  onReady: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onError: PropTypes.func,
}

const mapStateToProps = ({ 
  scatterplot: { data },
  sections: { map: { hovered } },
},
{ match: { params: { region, metric, secondary, demographic, highlightedState } } }
) => {
  return ({
    region,
    metric,
    secondary,
    demographic,
    highlightedState,
    hovered,
    data,
  })
}

const mapDispatchToProps = (dispatch) => ({
  onData: (data, region) =>
    dispatch(onScatterplotData(data, region)),
  onReady: () => 
    dispatch(onScatterplotLoaded('map')),
  onHover: (feature, e) => {
    dispatch(onHoverFeature(feature, 'map'))
    dispatch(onCoordsChange({x: e.pageX, y: e.pageY }))
  },
    
  onClick: (location) =>
    dispatch(loadLocation(location)),
  onError: (e, sectionId = 'map') =>
    dispatch(onScatterplotError(e, sectionId))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SedaExplorerChart)

