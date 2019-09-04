import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { onHoverFeature, onScatterplotData, onScatterplotLoaded, onScatterplotError, onCoordsChange, setTooltipVars } from "../../../actions";


import Scatterplot from '../Scatterplot';
import ScatterplotHeading from '../Scatterplot/ScatterplotHeading';
import ScatterplotAxis from '../Scatterplot/ScatterplotAxis';
import { getStateFipsFromAbbr } from '../../../constants/statesFips';
import SedaTooltip from '../../seda/SedaTooltip';
import Logo from '../../atoms/Logo';


const EmbedScatterplot = ({
  xVar,
  yVar,
  zVar,
  data,
  hovered,
  region,
  highlightedState,
  onReady,
  onData,
  onHover,
  onError,
  onClick,
}) => {
  return (
    <Scatterplot {...{
      xVar,
      yVar,
      zVar,
      region,
      data,
      variant: 'map',
      className: 'scatterplot--embed',
      highlightedState: getStateFipsFromAbbr(highlightedState),
      onData,
      onReady,
      onHover,
      onClick,
      onError
    }}>
      <ScatterplotHeading {...{
        xVar,
        yVar,
        zVar, 
        region, 
        highlightedState
      }} />
      <ScatterplotAxis
        axis='y'
        varName={yVar}
        hovered={hovered}
        region={region}
        className='scatterplot__axis scatterplot__axis--y'
      />
      <ScatterplotAxis
        axis='x'
        varName={xVar}
        hovered={hovered}
        region={region}
        className='scatterplot__axis scatterplot__axis--x'
      />
    </Scatterplot>
  )
} 

EmbedScatterplot.propTypes = {
  xVar: PropTypes.string,
  yVar: PropTypes.string,
  zVar: PropTypes.string,
  data: PropTypes.object,
  hovered: PropTypes.object,
  region: PropTypes.string,
  highlightedState: PropTypes.string,
  onReady: PropTypes.func,
  onData: PropTypes.func,
  onHover: PropTypes.func,
  onError: PropTypes.func,
  onClick: PropTypes.func,
}

function ChartEmbedView(props) {
  
  return (
    <div className='chart-embed'>
      <Logo url='https://edopportunity.org/' target='_blank' />
      <SedaTooltip />
      <EmbedScatterplot 
        {...props}
      />
    </div>
   
  )
}

ChartEmbedView.propTypes = {

}

const mapStateToProps = ({ 
  scatterplot: { data },
  sections: { hovered },
},
{ match: { params: { xVar, yVar, zVar, region, highlightedState } } }
) => {
  return ({
    region,
    xVar,
    yVar,
    zVar,
    highlightedState,
    hovered,
    data,
  })
}

const mapDispatchToProps = (dispatch) => ({
  onData: (data, region) =>
    dispatch(onScatterplotData(data, region)),
  onReady: () => {
    dispatch(onScatterplotLoaded('map'))
    window.SEDA.trigger('map')
  },
  onHover: (feature, vars, e) => {
    dispatch(onHoverFeature(feature, 'map'))
    dispatch(setTooltipVars(vars))
    dispatch(onCoordsChange({x: e.pageX, y: e.pageY }))
  },
  onClick: () => {},
  onError: (e, sectionId = 'map') =>
    dispatch(onScatterplotError(e, sectionId))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ChartEmbedView)

