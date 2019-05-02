import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SedaScatterplot, { fetchScatterplotVars } from 'react-seda-scatterplot'
import { theme } from '../../style/echartTheme';
import { getBaseVars, getRangeFromVarName } from '../../modules/config'
import { getScatterplotOptions } from '../../style/scatterplot-style';
import CircleOverlay from './CircleOverlay';
import { getSizerFunction } from '../../utils';
import { getDataForId } from '../../modules/scatterplot';

const endpoint = process.env.REACT_APP_VARS_ENDPOINT;

/**
 * Gets the state IDs that belong to a certain state
 * @param {array} ids 
 * @param {string} fips 
 */
const getStateIds = (ids, fips) => {
  if (ids && fips) {
    return ids
      .filter(d => d.substring(0,2) === fips)
  }
  return [];
}

/**
 * Gets the IDs for a provided state from the data
 * @param {string} stateId 
 * @param {object} data 
 */
const getStateHighlights = (stateId, data) => {
  return data && data['name'] && stateId ? 
    getStateIds(Object.keys(data['name']), stateId) : []
}

/**
 * Gets an object containing the state to render a circle
 * @param {string} id 
 * @param {number|string} x 
 * @param {number|string} y 
 * @param {number|string} z 
 * @param {boolean} active 
 */
const getCircle = (id, x, y, z, active) => ({
  id,
  active,
  x: parseFloat(x),
  y: parseFloat(y),
  z: parseFloat(z)
})

/**
 * Returns an object with props to render the circle overlay
 * @param {string} xVar 
 * @param {string} yVar 
 * @param {string} zVar 
 * @param {object} data 
 * @param {string} region 
 * @param {array} selected 
 * @param {Feature} hovered 
 */
const getCircleOverlay = 
  (xVar, yVar, zVar, data, region, selected, hovered) => {
    if (!data || !data[xVar] || !data[yVar] || !data[zVar]) {
      return {}
    }
    const hoveredId = hovered && hovered.properties && hovered.properties.id ?
      hovered.properties.id : null
    // add circles for selected items
    const circles = selected.map(s => 
      getCircle(s, data[xVar][s], data[yVar][s], data[zVar][s], hoveredId === s)
    )
    // add circle for hovered item if it exists
    if (hoveredId && selected.indexOf(hoveredId) === -1) {
      const featProps = hovered.properties
      circles.push(
        getCircle(hoveredId, featProps[xVar], featProps[yVar], featProps[zVar], true)
      )
    }
    return {
      xRange: getRangeFromVarName(xVar, region),
      yRange: getRangeFromVarName(yVar, region),
      sizer: getSizerFunction(data[zVar], { range: [ 12, 52 ]}),
      circles
    }
}

function DynamicScatterplot({
  data,
  xVar,
  yVar,
  zVar,
  region,
  hovered,
  highlightedState,
  variant,
  selected,
  freeze,
  error,
  onHover,
  onClick,
  onData,
  onReady,
  onError
}) {
  // memoize scatterplot options
  const scatterplotOptions = useMemo(
    () => {
      return getScatterplotOptions(
        variant, 
        data[region], 
        { xVar, yVar, zVar }, 
        highlightedState,
        region
      )
    },
    [xVar, yVar, zVar, highlightedState, data[region]]
  );
  // memoize highlighted state IDs for the scatterplot
  const highlighted = useMemo(
    () => getStateHighlights(highlightedState, data && data[region]),
    [highlightedState, region, data[region]]
  );  
  // memoize circle overlay
  const circleOverlay = useMemo(() => {
    return getCircleOverlay(
      xVar, yVar, zVar, 
      data[region], region, selected, hovered
    )
  }, [xVar, yVar, zVar, data[region], selected, hovered])
  // fetch any additional school level data for highlighted states
  useEffect(() => {
    if (!freeze && region === 'schools' && highlightedState && highlightedState !== 'us') {
      fetchScatterplotVars(
        [ xVar, yVar, zVar ], 
        'schools', 
        endpoint, 
        getBaseVars()['schools'],
        highlightedState
      ).then((data) => {
        onData && onData(data, 'schools');
        return data
      })
    }
  }, [xVar, yVar, zVar, region, highlightedState, freeze])
  return (
    <div className='dynamic-scatterplot'>
      <div className='dynamic-scatterplot__graph'>
        <div className={classNames(
          "blocker", "blocker--freeze", { 'blocker--show': freeze }
        ) }>
          { error &&
            <span className="notification notification--error">{ error }</span>
          }
        </div>
        <SedaScatterplot
          endpoint={endpoint}
          xVar={xVar}
          yVar={yVar}
          zVar={zVar}
          onReady={onReady}
          onHover={(loc) => loc && loc.id ?
            onHover({ id: loc.id, properties: loc }) :
            onHover(null)
          }
          onClick={onClick}
          onData={onData}
          onError={onError}
          data={data}
          prefix={region}
          options={scatterplotOptions}
          highlighted={highlighted}
          theme={theme}
          metaVars={getBaseVars()}
          freeze={freeze}
        />
        <CircleOverlay
          {...circleOverlay}
          variant={variant}
          style={scatterplotOptions.grid}
          onHover={(circle) => {
            onHover({
              id: circle.id, 
              properties: { 
                id: circle.id,
                ...getDataForId(circle.id, data[region])
              }
            })
          }}
          onClick={(circle) => { 
            onClick({
              id: circle.id,
              ...getDataForId(circle.id, data[region])
            })
          }}
        />
      </div>
    </div>
  )
}

DynamicScatterplot.propTypes = {
  xVar: PropTypes.string,
  yVar: PropTypes.string,
  zVar: PropTypes.string,
  region: PropTypes.string,
  data: PropTypes.object,
  highlightedState: PropTypes.string,
  selected: PropTypes.array,
  hovered: PropTypes.object,
  variant: PropTypes.string,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onData: PropTypes.func,
  onReady: PropTypes.func,
  onError: PropTypes.func,
  freeze: PropTypes.bool,
  error: PropTypes.string,
}

export default DynamicScatterplot

