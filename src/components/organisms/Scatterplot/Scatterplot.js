import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import SedaScatterplot, { fetchScatterplotVars } from 'react-seda-scatterplot'
import { theme } from './echartTheme';
import { getBaseVars } from '../../../modules/config'
import { getScatterplotOptions } from './utils';

const baseVars = getBaseVars()
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


function Scatterplot({
  data,
  xVar,
  yVar,
  zVar,
  region,
  highlightedState,
  variant,
  freeze,
  error,
  children,
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
      { error &&
        <span className="notification notification--error">{ error }</span>
      }

      <SedaScatterplot
        {...{
          endpoint,
          xVar,
          yVar,
          zVar,
          onReady,
          onClick,
          onData,
          onError,
          data,
          highlighted,
          theme,
          freeze
        }}
        prefix={region}
        options={scatterplotOptions}
        metaVars={baseVars}
        onHover={(loc) => loc && loc.id ?
          onHover({ id: loc.id, properties: loc }) :
          onHover(null)
        }
      />
      {children}
    </div>
  )
}

Scatterplot.propTypes = {
  heading: PropTypes.object,
  xVar: PropTypes.string,
  yVar: PropTypes.string,
  zVar: PropTypes.string,
  region: PropTypes.string,
  data: PropTypes.object,
  highlightedState: PropTypes.string,
  selected: PropTypes.array,
  hovered: PropTypes.object,
  variant: PropTypes.string,
  children: PropTypes.node,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onData: PropTypes.func,
  onReady: PropTypes.func,
  onError: PropTypes.func,
  freeze: PropTypes.bool,
  error: PropTypes.string,
}

export default Scatterplot

