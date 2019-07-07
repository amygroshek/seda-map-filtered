import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import SedaScatterplot from 'react-seda-scatterplot'
import { theme } from './echartTheme';
import { getBaseVars } from '../../../modules/config'
import { getScatterplotOptions } from './utils';
import { getStateFipsFromAbbr } from '../../../constants/statesFips';

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
    getStateIds(Object.keys(data['name']), getStateFipsFromAbbr(stateId)) : []
}

function ScatterplotPreview({
  data,
  xVar,
  yVar,
  zVar,
  region,
  highlightedState,
  freeze,
  children,
  onError
}) {
  // memoize scatterplot options
  const scatterplotOptions = useMemo(
    () => {
      return getScatterplotOptions(
        'preview', 
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
  return (
    <div className='scatterplot-preview'>
      <SedaScatterplot
        {...{
          endpoint,
          xVar,
          yVar,
          zVar,
          onError,
          data,
          highlighted,
          theme,
          freeze
        }}
        prefix={region}
        options={scatterplotOptions}
        metaVars={baseVars}
      />
      {children}
    </div>
  )
}

ScatterplotPreview.propTypes = {
  xVar: PropTypes.string,
  yVar: PropTypes.string,
  zVar: PropTypes.string,
  region: PropTypes.string,
  data: PropTypes.object,
  highlightedState: PropTypes.string,
  selected: PropTypes.array,
  hovered: PropTypes.object,
  children: PropTypes.node,
  onError: PropTypes.func,
  freeze: PropTypes.bool,
  error: PropTypes.string,
}

export default ScatterplotPreview

