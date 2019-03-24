import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import SedaScatterplot from 'react-seda-scatterplot'
import Controls from '../base/Controls';
import { theme } from '../../style/echartTheme';
import * as scatterplotStyle from '../../style/scatterplot-style';
import { BASE_VARS, getMetricById } from '../../constants/dataOptions';

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
 * Get the style overrides for the base series
 * @param {boolean} highlightedOn 
 */
const getBaseSeries = (highlightedOn) => {
  return {
    id: 'base',
    type: 'scatter',
    animation: false,
    silent: highlightedOn ? true : false,
    itemStyle: {
      color: highlightedOn ? 
        'rgba(0,0,0,0.1)' : '#76ced2cc',
      borderColor: highlightedOn ? 
        'rgba(0,0,0,0.1)' : 'rgba(6, 29, 86, 0.4)',
    },
  }
}

/**
 * Get the style overrides for the highlight series
 */
const getHighlightedSeries = (isOn) => {
  return {
    id: 'highlighted',
    type: 'scatter',
    show: isOn,
    itemStyle: {
      borderColor: 'rgba(6, 29, 86, 0.4)',
    }
  }
}

/**
 * Get the style overrides for the selected series
 */
const getSelectedSeries = (colors = ['#f00']) => {
  return {
    id: 'selected',
    type: 'scatter',
    itemStyle: {
      color: ({dataIndex}) => {
        return colors[dataIndex % colors.length]
      }
    }
  }
}

/**
 * Gets the configuration overrides for the base scatterplot
 */
const getOverrides = (
  xVar, 
  yVar, 
  variant, 
  highlightedState, 
  selectedColors,
  options = {}
) => {
  const yMetric = getMetricById(yVar.split('_')[1]);
  const xMetric = getMetricById(xVar.split('_')[1]);
  const yDem = yVar.split('_')[0];
  const xDem = xVar.split('_')[0];
  const hl = Boolean(highlightedState);
  const series = [
    getBaseSeries(hl),
    getHighlightedSeries(hl),
    getSelectedSeries(selectedColors)
  ];
  const overlays = scatterplotStyle.overlays(yMetric, variant);
  if (overlays) {
    series.push(overlays);
  }
  const overrides = {
    grid: { top:24, bottom:48, left:0, right:48 },
    xAxis: scatterplotStyle.xAxis(xMetric, xDem),
    yAxis: scatterplotStyle.yAxis(yMetric, yDem),
    series,
    tooltip: {
      show:true,
      trigger: 'item',
    }
  };
  return { 
    ...overrides,
    ...options
  };
}

function DynamicScatterplot({
  data,
  controls,
  xVar,
  yVar,
  zVar,
  region,
  options,
  highlightedState,
  selected,
  selectedColors,
  variant,
  onOptionChange,
  onHover,
  onClick,
  onData
}) {
  const scatterplotOptions = useMemo(
    () => getOverrides(xVar, yVar, variant, highlightedState, selectedColors, options),
    [xVar, yVar, zVar, highlightedState, options, selectedColors]
  );
  const highlighted = useMemo(
    () => getStateHighlights(highlightedState, data && data[region]),
    [highlightedState, region]
  );
  return (
    <div className='dynamic-scatterplot'>
      { controls &&
        <Controls 
          controls={controls}
          onOptionChange={onOptionChange}
        />
      }
      <div className='dynamic-scatterplot__graph'>
        <SedaScatterplot
          endpoint={process.env.REACT_APP_VARS_ENDPOINT}
          xVar={xVar}
          yVar={yVar}
          zVar={zVar}
          onHover={onHover}
          onClick={onClick}
          onData={onData}
          data={data}
          prefix={region}
          options={scatterplotOptions}
          highlighted={highlighted}
          selected={selected}
          theme={theme}
          baseVars={BASE_VARS}
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
  controls: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({ 
          id: PropTypes.string, 
          label: PropTypes.string 
        })
      )
    })
  ),
  options: PropTypes.object,
  data: PropTypes.object,
  highlightedState: PropTypes.string,
  selected: PropTypes.array,
  selectedColors: PropTypes.array,
  variant: PropTypes.string,
  onOptionChange: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onData: PropTypes.func,
}

export default DynamicScatterplot

