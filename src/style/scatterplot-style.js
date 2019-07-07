import { fade } from '@material-ui/core/styles/colorManipulator';
import { getSizerFunctionForRegion, isGapVar, getDemographicFromVarName, getMetricIdFromVarName, getMetricFromVarName, getChoroplethColors, getMetricRangeFromVarName } from '../modules/config';
import { getLang } from '../modules/lang';
import { getCSSVariable } from '../utils';

/** GRID CONFIGURATION  */

export const grid = (variant) => {
  switch(variant) {
    case 'map':
      return {
        top: 24,
        right: 100,
        bottom: 32,
        left: 24,
      }
    default:
      return { 
        top: 8, 
        right: 8,
        bottom: 24, 
        left: 24, 
      }
  }
}

const isStateHighlighed = (highlightedState) =>
  highlightedState && highlightedState !== 'us'

/** SERIES CONFIGURATION */

/**
 * Gets an echart series
 */
const getSeries = (seriesId, type, options) => ({
  id: seriesId,
  type: type,
  ...options
})


/**
 * Get the style overrides for the base series
 * @param {boolean} highlightedOn 
 */
const getBaseSeries = ({ highlightedState, sizer, variant }) => {
  const hl = isStateHighlighed(highlightedState)
  return getSeries('base', 'scatter', {
    silent: hl || (variant === 'preview'),
    large: hl,
    largeThreshold: 0,
    itemStyle: {
      color: hl ? '#ddd' : '#76ced2cc',
      borderColor: hl ? 'transparent' : 'rgba(6, 29, 86, 0.4)',
      borderWidth: hl ? 0 : 0.75
    },
    symbolSize: hl ? 6 : (value) => sizer(value[2])
  })
}


/**
 * Get the style overrides for the highlight series
 */
const getHighlightedSeries = ({ highlightedState, sizer }) =>
  getSeries('highlighted', 'scatter', {
    show: isStateHighlighed(highlightedState),
    itemStyle: {
      borderColor: 'rgba(6, 29, 86, 0.4)'
    },
    symbolSize: (value) => sizer(value[2])
  })






export const series = (seriesId, variant, options = {}) => {
  switch(seriesId) {
    case 'base':
      return getBaseSeries({...options, variant})
    case 'highlighted':
      return getHighlightedSeries(options)
    default:
      return getSeries(seriesId, variant, options)
  }
}

/** SCATTERPLOT OVERLAY CONFIGURATION */


/**
 * Gets `series.markPoints` echart options based on an
 * array of points.
 * @param {array<{axis, x, y, label, options}>} points
 */
const getMarkPoints = (points) => {
  return {
    animation: false,
    silent: true,
    data: points
      .map(p => p.axis ? getAxisPoint(p) : null)
      .filter(p => p)
  }
}

/**
 * Gets a echarts `series` containing any marked lines or
 * points for the graph.
 * @param {array} points 
 * @param {array} lines 
 */
const getOverlay = (points, lines) => {
  return {
    type: 'scatter',
    animation: false,
    silent: true,
    visualMap: false,
    data: points,
    symbolSize: 1,
    label: {
      show:false
    },
    markPoint: getMarkPoints(points.map(
      ({axis = 'y', value, x, y, name, ...rest}) => ({
        axis, 
        x: axis === 'y' ? (x || '93%') : value[0], 
        y: axis === 'y' ? value[1] : (y || '100%'), 
        label: name,
        ...rest
      }))),
    markLine: getMarkLines(lines)
  }
}

/**
 * Gets a point that falls on the x or y axis
 * @param {object} point 
 */
const getAxisPoint = ({axis, x, y, label, labelStyle, options }) => {
  const position = axis === 'y' ?
    { x: x, yAxis: y } :
    { y: y, xAxis: x };
    return {
      ...position,
      symbol: 'circle',
      symbolSize: 1,
      label: {
        formatter: '{val|' + label + '}',
        align: 'right',
        rich: {
          val: {
            fontSize: 11.7,
            fontWeight: 'normal',
            color: '#5d5d5d',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            textBorderColor: 'transparent',
            textBorderWidth: 0,
            lineHeight: 18,
          }
        },
        ...labelStyle
      },
      ...options
    }
}

/**
 * Gets `series.markLine` echart options based on an
 * array of lines.
 * @param {array<{axis, position, style}>} lines 
 */
const getMarkLines = (lines) => {
  return {
    animation: false,
    silent: true,
    data: lines
      .map(l => l.axis ? getAxisLine(l) : null)
      .filter(l => l)
  }
}

/**
 * Gets line data that spans the graph on the x or y axis
 * @param {object} line 
 */
const getAxisLine = ({
  axis = 'y', 
  position = 0, 
  lineStyle, 
  start, 
  end
}) => {
  const startPosition = axis === 'y' ?
    { x: (start || 16), yAxis: position } :
    { y: (start || 24), xAxis: position };
  const endPosition = axis === 'y' ?
    { x: end || '93%', yAxis: position } :
    { y: end || '100%', xAxis: position };
  return [
    {
      ...startPosition,
      symbol: 'none',
      lineStyle: {
        color: 'rgba(0,0,0,0.2)',
        ...lineStyle
      }
    },
    {
      ...endPosition,
      symbol: 'none' 
    }
  ]
}


const getLangKeyForAxisLabel = (value, metric) => {
  const base = 'AXIS_' + metric.toUpperCase()
  const position = value === 0 ? '_ZERO' :
    value > 0 ? '_HIGH' : '_LOW'
  const single = value === 1 ? '_SINGLE' : ''
  return base + position + single;
}

const getMapAverageOverlay = (region) => {
  // show lines and labels every 2 grades for schools
  const increment = region === 'schools' ? 2 : 1
  // schools go from -7 : 7, others go -3 : 3
  const start = region === 'schools' ? -6 : -3
  // number of lines to overlay
  const numLines = 7
  return getOverlay(
    new Array(numLines).fill().map((v, i) => {
      const position = start + (i * increment);
      const labelKey =
        getLangKeyForAxisLabel(position, 'avg')
      const label = getLang(labelKey, { value: Math.abs(position) })
      return {
        value: [0, position], 
        name: label,
        visualMap: false
      }
    }),
    new Array(numLines).fill().map((v, i) => ({
      axis: 'y',
      position: start + (i * increment)
    }))
  )
}

const LabelY = ({position = 0, label = '0', axis = 'y', x = '95%', ...rest}) => {
  return {
    value: [0, position], 
    name: label,
    axis,
    x,
    ...rest
  }
}
const LabelX = ({position = 0, label = '0', axis = 'x', y = '95%', ...rest}) => {
  return {
    value: [position, 0], 
    name: label,
    axis,
    y,
    ...rest
  }
}
const LineY = ({position = 0, ...rest}) => ({
  axis: 'y',
  position,
  ...rest
})
const LineX = ({position = 0, ...rest}) => ({
  axis: 'x',
  position,
  ...rest
})

const getPreviewAverageOverlay = () => {
  // number of lines to overlay
  const lines = new Array(1).fill().map(
    () => LineY({ start: '0%', end: '100%'})
  )
  const labels = lines.map(() => LabelY({ x: 12}));
  return getOverlay(labels, lines)
}

const getPreviewGrowthOverlay = () => {
  // number of lines to overlay
  const lines = new Array(1).fill().map(
    () => LineY({ position: 1, start: '0%', end: '100%'})
  )
  const labels = lines.map(() => LabelY({ x: 12, label: '1', position: 1}));
  return getOverlay(labels, lines)
}

const getPreviewSesOverlay = () => {
  // number of lines to overlay
  const lines = new Array(1).fill().map(() => LineX({ start: '0%', end: '100%'}))
  const labels = lines.map(() => 
    LabelX({ 
      labelStyle: { align: 'center' },
      y: '94%'
    })
  );
  return getOverlay(labels, lines)
}


const getMapAverageGapOverlay = () => getOverlay(
  new Array(8).fill().map((v, i) => {
    const position = 0 - i;
    const labelKey =
      getLangKeyForAxisLabel(position, 'avg_gap')
    const label = getLang(labelKey, { value: position })
    return {
      value: [0, position], 
      name: label,
      visualMap: false
    }
  }),
  new Array(8).fill().map((v, i) => ({
    axis: 'y',
    position: 0 - i
  }))
)

const getMapGrowthOverlay = (region) => {
  // show lines and labels every 2 grades for schools
  const increment = region === 'schools' ? 0.5 : 0.2
  // schools go from -7 : 7, others go -3 : 3
  const start = region === 'schools' ? 0 : 0.4
  const numLines = region === 'schools' ? 5 : 7
  return getOverlay(
    new Array(numLines).fill().map((v, i) => {
      const position = Math.round((start + (i * increment)) * 10)/10;
      const labelKey =
        getLangKeyForAxisLabel(position, 'grd')
      const label = getLang(labelKey, { value: Math.abs(position) })
      return {
        value: [0, position], 
        name: label,
        visualMap: false
      }
    }),
    new Array(numLines).fill().map((v, i) => ({
      axis: 'y',
      position: Math.round((start + (i * increment)) * 10)/10
    }))
  )
}



const getMapGrowthGapOverlay = () => getOverlay(
  new Array(5).fill().map((v, i) => {
    const position = Math.round((-0.4 + (i * (1)/5)) * 10) / 10;
    const labelKey =
      getLangKeyForAxisLabel(position, 'grd_gap')
    const label = getLang(labelKey, { value: Math.abs(position) })
    return {
      value: [0, position], 
      name: label,
      visualMap: false
    }
  }),
  new Array(5).fill().map((v, i) => ({
    axis: 'y',
    position: -0.4 + (i * 1/5)
  }))
)

const getMapTrendOverlay = (region) => {
  // show lines and labels every 2 grades for schools
  const increment = region === 'schools' ? 0.5 : 0.2
  // schools go from -7 : 7, others go -3 : 3
  const start = region === 'schools' ? -1 : -0.4
  const numLines = 5
  return getOverlay(
    new Array(numLines).fill().map((v, i) => {
      const position = Math.round((start + (i * increment))*10)/10;
      const labelKey =
        getLangKeyForAxisLabel(position, 'coh')
      const label = getLang(labelKey, { value: Math.abs(position) })
      return {
        value: [0, position], 
        name: label,
        visualMap: false
      }
    }),
    new Array(numLines).fill().map((v, i) => ({
      axis: 'y',
      position: start + (i * increment)
    }))
  )
}

const getMapTrendGapOverlay = () => getOverlay(
  new Array(5).fill().map((v, i) => {
    const position = Math.round((-0.2 + (i * 0.1))*10)/10;
    const labelKey =
      getLangKeyForAxisLabel(position, 'coh_gap')
    const label = getLang(labelKey, { value: Math.abs(position) })
    return {
      value: [0, position], 
      name: label,
      visualMap: false
    }
  }),
  new Array(5).fill().map((v, i) => ({
    axis: 'y',
    position: -0.2 + (i * 0.1)
  }))
)

const getOpportunityAverageOverlay = () => ({
  type: 'line',
  animation: false,
  silent: true,
  visualMap: false,
  data: [[-4, -4], [4, 4]],
  symbolSize: 0.1,
  label: {
    show:false
  },
  itemStyle: {
    color: '#999'
  },
  markLine: {
    animation: false,
    silent: true,
    label: {
      position: 'middle',
      formatter: function(value) {
        return value.name
      } 
    },
    lineStyle: {
      type: 'dashed',
      color: '#999'
    },
    data: [
      [
        { 
          name: getLang('OPP_DIFF_EQUAL_LINE'), 
          coord: [-4, -4], 
          symbol: 'none',
        },
        { coord: [ 4,  4], symbol: 'none' },
      ]
    ]
  }
})

const getOverlaysForMetric = (variant, metric, { xVar, yVar, region }) => {
  const identifier = metric + '_' + variant
  switch(identifier) {
    case 'avg_map':
      if (isGapVar(yVar))
        return [ getMapAverageGapOverlay() ]
      else
        return [ getMapAverageOverlay(region) ]
    case 'coh_preview':
    case 'avg_preview':
        return [ getPreviewAverageOverlay() ]
    case 'ses_preview':
        return [ getPreviewSesOverlay() ]
    case 'grd_preview':
        return [ getPreviewGrowthOverlay() ]
    case 'grd_map':
      if (isGapVar(yVar))
        return [ getMapGrowthGapOverlay() ]
      else
        return [ getMapGrowthOverlay(region) ]
    case 'coh_map':
      if (isGapVar(yVar))
        return [ getMapTrendGapOverlay() ]
      else
        return [ getMapTrendOverlay(region) ]
    case 'avg_opp':
      return [ getOpportunityAverageOverlay() ]
    default:
      return []
  }
}

const overlays = (variant, context) => {
  const yMetricId = getMetricIdFromVarName(context.yVar);
  const xMetricId = getMetricIdFromVarName(context.xVar);
  return [
    ...getOverlaysForMetric(variant, yMetricId, context),
    ...getOverlaysForMetric(variant, xMetricId, context)
  ]
}

/** VISUAL MAP CONFIGURATION */

const getMapVisualMap = ({
  varName,
  colors = getChoroplethColors(), 
  highlightedState,
  region
}) => {
  const range = getMetricRangeFromVarName(varName, region, 'map')
  return {
    type: 'continuous',
    min: range[0],
    max: range[1],
    inRange: {
      color: colors.map(c => fade(c, 0.9))
    },
    show: false,
    seriesIndex: isStateHighlighed(highlightedState) ? 2 : 0,
    calculable: true,
    right:0,
    bottom:'auto',
    top:'auto',
    left: 'auto',
    orient: 'vertical',
    itemHeight: 400,
    itemWidth: 24,
    precision: 1,
  }
}

const visualMap = (
  variant,
  options,
) => {
  switch (variant) {
    case 'map':
    case 'preview':
      return [ getMapVisualMap(options) ]
    default:
      return []
  }
}

/** X AXIS CONFIGURATION */

const getXAxis = ({ metric, demographic, region, ...rest }) => {
  const [ min, max ] = getMetricRangeFromVarName([demographic.id, metric.id].join('_'), region);
  return {
    min,
    max,
    axisLabel: { show: false },
    axisLine: { show: false },
    splitLine: { show: true },
    ...rest
  }
}


const getMapXAxis = ({ metric, demographic, region }) => {
  const [ min, max ] = getMetricRangeFromVarName([demographic.id, metric.id].join('_'), region);
  return {
    min, 
    max,
    axisLabel: {
      inside: true,
      formatter: (value) => {
        // percent for schools
        return region === 'schools' ?
          (value*100)+'%' : value
      }
    },
    name: region === 'schools' ? 
      getLang('LABEL_PCT') + ' ' + getLang('LABEL_FRL') :
      getLang('LABEL_SES')
    ,
    nameGap: 8,
    nameTextStyle: {
      fontSize: 14,
      fontWeight: 'normal',
      color: getCSSVariable('--text'),
      fontFamily: getCSSVariable('--heading-font')
    },
    splitLine: { show: false },
  }
}  

const xAxis = (variant, { varName, region }) => {
  const metric = getMetricFromVarName(varName);
  const demographic = getDemographicFromVarName(varName);
  if (!metric || !demographic) { return {} }
  switch (variant) {
    case 'map':
      return getMapXAxis({ metric, demographic, region })
    default:
      return getXAxis({metric, demographic, region})
  }
}

/** Y AXIS CONFIGURATION */

const getYAxis = ({metric, demographic, region, ...rest}) => {
  const [ min, max ] = getMetricRangeFromVarName(
    [demographic.id, metric.id].join('_'), region
  )
  return {
    min,
    max,
    position: 'right',
    axisLabel: { show: false },
    axisLine: { show: false },
    splitLine: { show: true },
    nameLocation: 'middle',
    ...rest
  }
}

const getMapYAxis = ({metric, demographic, region, ...rest}) => {
  const [ min, max ] = getMetricRangeFromVarName(
    [demographic.id, metric.id].join('_'), region
  )
  return {
    min,
    max,
    position: 'right',
    axisLabel: { 
      show: false,
      showMinLabel: false,
      showMaxLabel: false,
    },
    axisLine: { 
      show: region === 'schools' ? false : true,
      lineStyle: {
        type: 'dashed',
        color: '#ccc'
      }
    },
    splitLine: { show: false },
    name: getLang('LABEL_' + metric.id),
    nameGap: 80,
    nameLocation: 'middle',
    nameTextStyle: {
      fontSize: 14,
      fontWeight: 'normal',
      color: getCSSVariable('--text'),
      fontFamily: getCSSVariable('--heading-font')
    },
    ...rest
  }
}

const yAxis = (variant, { varName, region }) => {
  const metric = getMetricFromVarName(varName);
  const demographic = getDemographicFromVarName(varName);
  if (!metric || !demographic) { return {} }
  switch (variant) {
    case 'map':
      return getMapYAxis({ metric, demographic, region })
    default:
      return getYAxis({ metric, demographic, region })
  }
}

export const getScatterplotOptions = (
  variant,
  data = {},
  { xVar, yVar, zVar },
  highlightedState,
  region
) => {
  if (!data[xVar] || !data[yVar] || !data[zVar]) { return {} }
  const sizer = getSizerFunctionForRegion(region)
  const options = {
    grid: grid(variant),
    visualMap: visualMap(variant, { varName: yVar, highlightedState, region }),
    xAxis: xAxis(variant, { varName: xVar, region }),
    yAxis: yAxis(variant, { varName: yVar, region }),
    series: [
      series('base', variant, { highlightedState, sizer }),
      series('highlighted', variant, { highlightedState, sizer }),
      ...overlays(variant, { xVar, yVar, region })
    ]
  }
  return options;
}

