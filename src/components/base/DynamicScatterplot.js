import React, { useMemo, useState, useEffect } from 'react'
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
  onHover,
  onClick,
  onData,
  onReady,
  freeze
}) {
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
  const highlighted = useMemo(
    () => getStateHighlights(highlightedState, data && data[region]),
    [highlightedState, region, data[region]]
  );
  const [circleOverlay, setCircleOverlay] = useState({});
  
  // setup circle overlay
  useEffect(
    () => {
      data[region][xVar] && data[region][yVar] && data[region][zVar] &&
      setCircleOverlay({
        xRange: getRangeFromVarName(xVar, region),
        yRange: getRangeFromVarName(yVar, region),
        sizer: getSizerFunction(data[region][zVar], { range: [ 12, 52 ]}),
        circles: selected.map(s => ({
          x: parseFloat(data[region][xVar][s]),
          y: parseFloat(data[region][yVar][s]),
          z: parseFloat(data[region][zVar][s]),
          active: hovered === s,
          id: s
        }))
      })
    },
    [xVar, yVar, data[region], selected, hovered]
  )
  // fetch any additional school level data for highlighted states
  useEffect(() => {
    if (!freeze && region === 'schools' && highlightedState && highlightedState !== 'us') {
      // load school data for state
      fetchScatterplotVars(
        [ xVar, yVar, zVar ], 
        'schools', 
        endpoint, 
        getBaseVars()['schools'],
        `${highlightedState}`.padStart(2, "0")
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
        ) }></div>
        <SedaScatterplot
          endpoint={endpoint}
          xVar={xVar}
          yVar={yVar}
          zVar={zVar}
          hovered={hovered}
          onReady={onReady}
          onHover={(loc) => loc && loc.id ?
              onHover({ id: loc.id, properties: loc }) :
              null
          }
          onClick={onClick}
          onData={onData}
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
          style={{
            ...scatterplotOptions.grid
          }}
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
  hovered: PropTypes.string,
  variant: PropTypes.string,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onData: PropTypes.func,
  onReady: PropTypes.func,
  freeze: PropTypes.bool,
}

export default DynamicScatterplot

