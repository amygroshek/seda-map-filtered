import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import SedaScatterplot, { fetchScatterplotVars } from 'react-seda-scatterplot'
import { theme } from './echartTheme';
import { getBaseVars } from '../../../modules/config'
import { getScatterplotOptions } from './utils';
import { getStateAbbr } from '../../../constants/statesFips';

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
  className,
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
      const options = getScatterplotOptions(
        variant, 
        data[region], 
        { xVar, yVar, zVar }, 
        highlightedState,
        region
      )
      return options
    },
    [xVar, yVar, zVar, highlightedState, data[region]]
  );

  // memoize highlighted state IDs for the scatterplot
  const highlighted = useMemo(() => {
    const hl = getStateHighlights(highlightedState, data && data[region])
    // limit to 3000
    return hl.slice(0, 3000)
  }, [highlightedState, region, data[region]]);

  // fetch base vars for region if they haven't already been fetched
  // this is required 
  useEffect(() => {
    if (!data || !data[region] || !data['name']) {
      fetchScatterplotVars(
        [ 'name' ], 
        region, 
        endpoint, 
        getBaseVars()[region]
      ).then((data) => {
        onData && onData(data, region);
        return data
      })
    }
  }, [ region, zVar ]);

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
    <div className={classNames('scatterplot', className)}>
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
        onHover={(loc, e) => {
          return loc && loc.id ?
            onHover(
              { 
                id: loc.id, 
                properties: { ...loc, state: getStateAbbr(loc.id) } 
              },
              {
                xVar,
                yVar,
              },
              e.event.event
            ) : (
              e.event.event.toElement && 
              !e.event.event.toElement.classList.contains('marker') &&
                onHover(null, {}, e.event.event)
            )
            
        }}
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

