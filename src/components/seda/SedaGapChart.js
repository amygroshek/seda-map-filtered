import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getMapVars, getDemographicIdFromVarName } from '../../modules/config';
import { getStateFipsFromAbbr } from '../../constants/statesFips';
import { loadLocation, onHoverFeature, onScatterplotData, onScatterplotLoaded, onScatterplotError, onCoordsChange, setTooltipVars } from "../../actions";
import Scatterplot from '../organisms/Scatterplot';
import SedaLocationMarkers from './SedaLocationMarkers';
import ScatterplotAxis from '../organisms/Scatterplot/ScatterplotAxis';
import { GapTypeInlineMenu } from './SedaSelectControls';
import { getLabel } from '../../modules/lang';

const SedaGapChart = ({
  region,
  metric,
  demographic,
  highlightedState,
  hovered,
  data,
  onData,
  onReady,
  onHover,
  onClick,
  onError,
}) => {
  const [ secondary, setSecondary ] = useState('ses');
  const vars = getMapVars(region, metric, demographic);
  const xDem = getDemographicIdFromVarName(vars.xVar);
  // segregation only for poor vs. non-poor
  const isPoorVsNonpoor = xDem === 'pn';
  vars.xVar = isPoorVsNonpoor ?
    'np_seg' : xDem + '_' + secondary;
  return (
    <Scatterplot {...{
      ...vars,
      region,
      data,
      variant: 'map',
      highlightedState: getStateFipsFromAbbr(highlightedState),
      className: 'scatterplot--secondary',
      onData,
      onReady,
      onHover,
      onClick,
      onError
    }}>
      <div className="scatterplot__gap-selector">
        <span>Gap in { isPoorVsNonpoor && getLabel('SEG') }</span>
        { !isPoorVsNonpoor && 
            <GapTypeInlineMenu
              metric={secondary}
              onChange={(id) => { setSecondary(id) }}
            />
        }
      </div>
      <SedaLocationMarkers 
        {...{...vars}} 
        onHover={onHover}
      />
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

SedaGapChart.propTypes = {
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
  sections: { hovered },
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
  onHover: (feature, vars, e) => {
    dispatch(onHoverFeature(feature, 'map'))
    dispatch(setTooltipVars(vars))
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
)(SedaGapChart)

