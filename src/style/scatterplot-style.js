import { fade } from '@material-ui/core/styles/colorManipulator';
import { getDemographicLabel, getLabelFromVarName } from '../modules/config';
import { getStateName } from '../constants/statesFips';


/**
 * Gets `series.markPoints` echart options based on an
 * array of points.
 * @param {array<{axis, x, y, label, options}>} points
 */
export const getMarkPoints = (points) => {
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
export const getOverlay = (points, lines) => {
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
    markPoint: getMarkPoints(points.map(p => ({
      axis:'y', x: '97%', y: p.value[1], label: p.name
    }))),
    markLine: getMarkLines(lines)
  }
}

/**
 * Gets a point that falls on the x or y axis
 * @param {object} point 
 */
export const getAxisPoint = ({axis, x, y, label, options }) => {
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
            fontSize: 12,
            fontWeight: 'normal',
            color: '#000',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            textBorderColor: 'transparent',
            textBorderWidth: 0,
            lineHeight: 18
          }
        },
      },
      ...options
    }
}

/**
 * Gets `series.markLine` echart options based on an
 * array of lines.
 * @param {array<{axis, position, style}>} lines 
 */
export const getMarkLines = (lines) => {
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
export const getAxisLine = ({axis, position, style}) => {
  const startPosition = axis === 'y' ?
    { x: 0, yAxis: position } :
    { y: 24, xAxis: position };
  const endPosition = axis === 'y' ?
    { x: '100%', yAxis: position } :
    { y: '100%', xAxis: position };
  return [
    {
      ...startPosition,
      symbol: 'none',
      lineStyle: {
        color: 'rgba(0,0,0,0.2)',
        ...style
      }
    },
    {
      ...endPosition,
      symbol: 'none' 
    }
  ]
}

export const grid = {
  top: '24',
  right: '80',
  bottom: '96',
  left: '24',
}

export const overlays = (metricId, variant = '') => {
  const overlayConfig = {
    'avg': getOverlay(
      new Array(7).fill().map((v, i) => {
        const position = -3 + i;
        const grades = Math.abs(position) === 1 ? 'grade' : 'grades'
        const label = position === 0 ? 'average\nperformance' :
          position > 0 ? 
            `${Math.abs(position)} ${grades}\nahead` : 
            `${Math.abs(position)} ${grades}\nbehind`
        return {
          value: [0, position], 
          name: label,
          visualMap: false
        }
      }),
      new Array(7).fill().map((v, i) => ({
        axis: 'y',
        position: -3 + i
      }))
    ),
    'grd': getOverlay(
      new Array(5).fill().map((v, i) => {
        const position = 0.6 + (i * (1)/5);
        const label = position === 1 ? 'average\ngrowth' :
          position > 1 ? 
            `${Math.abs(position)} grade levels\nper year` : 
            `${Math.abs(position)} grade levels\nper year`
        return {
          value: [0, position], 
          name: label,
          visualMap: false
        }
      }),
      new Array(5).fill().map((v, i) => ({
        axis: 'y',
        position: 0.6 + (i * 1/5)
      }))
    ),
    'coh': getOverlay(
      new Array(5).fill().map((v, i) => {
        const position = Math.round((-0.2 + (i * 0.1))*10)/10;
        const label = position === 0 ? 'no change\nin test scores' :
          position > 0 ? 
            `${Math.abs(position)} grade level\nincrease` : 
            `${Math.abs(position)} grade level\ndecrease`
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
    ),
    'avg_opp': {
      type: 'line',
      animation: false,
      silent: true,
      visualMap: false,
      data: [[-4, -4], [4, 4]],
      symbolSize: 0.1,
      label: {
        show:false
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
              name: 'equal opportunity', 
              coord: [-4, -4], 
              symbol: 'none',
            },
            { coord: [ 4,  4], symbol: 'none' },
          ]
        ]
      }
    }
  }
  const configKey = variant ? 
    metricId + '_' + variant : metricId
  return overlayConfig[configKey] ? overlayConfig[configKey] : null
}

export const visualMap = (metric, colors, highlightIndex = 0) => {
  const baseConfig = {
    type: 'continuous',
    min: metric.min,
    max: metric.max,
    range: [metric.min, metric.max],
    inRange: {
      color: colors.map(c => fade(c, 0.9))
    },
    show:false,
    seriesIndex: highlightIndex,
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
  const visualMapConfig = {
    'avg': {},
    'grd': {},
    'coh': {}
  }
  return visualMapConfig[metric.id] ? 
    [{
      ...baseConfig,
      ...visualMapConfig[metric.id]
    }] : [{}]
}

export const xAxis = (metric, demographic = '') => {
  const baseConfig = {
    axisLabel: {
      show: true
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: true
    },
    splitNumber: 7,
    nameGap: 32,
    nameLocation: 'middle'
  };
  const configKey = demographic ? 
    demographic +'_'+ metric.id : metric.id;
  switch (configKey) {
    case 'ses':
      return {
        splitLine: { show: false },
        axisLabel: {
          formatter: function (val) {
            if (val === 0) {
              return 'average\nsocioeconomic status'
            }
            return null;
          },
          fontSize: 14,
          inside: false,
          margin: 10,
        },
      }
    // gap axis labels
    case 'p_grd':
    case 'np_grd':
    case 'b_grd':
      return {
        ...baseConfig,
        min: metric.min,
        max: metric.max,
        name: metric.label + (
          demographic ? 
            ' (' + getDemographicLabel(demographic) + ' students)' : 
            ''
        ),
        splitLine: {
          show: true
        },
        splitNumber: 5,
        interval: 0.2,
      }
    case 'wb_ses':
    case 'wh_ses':
    case 'wa_ses':
    case 'pn_ses':
      return {
        ...baseConfig,
        name: metric.label + (
          demographic ? 
            ' (' + getDemographicLabel(demographic) + ')' : 
            ''
        ),
      }
    default:
      return {
        ...baseConfig,
        min: metric.min,
        max: metric.max,
        name: metric.label + (
          demographic ? 
            ' (' + getDemographicLabel(demographic) + ' students)' : 
            ''
        ),
      }
  }
}

export const yAxis = (metric, demographic = '') => {
  const baseConfig = {
    position: 'right',
    axisLabel: { 
      show: false,
      showMinLabel: false,
      showMaxLabel: false,
    },
    axisLine: { 
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#ccc'
      }
    },
    splitLine: { show: false },
    min: metric.min,
    max: metric.max,
  }
  const configKey = demographic ? 
    demographic +'_'+ metric.id : metric.id;
  switch (configKey) {
    case 'avg':
    case 'grd':
    case 'coh':
      return baseConfig
    case 'wb_avg':
    case 'wh_avg':
    case 'wa_avg':
    case 'pn_avg':
      return {
        ...baseConfig,
        max: 0,
        min: -6,
        axisLabel: {
          show: true
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: true
        },
        splitNumber: 7,
        name: metric.label + (
          demographic ? 
            ' (' + getDemographicLabel(demographic) + ')' : 
            ''
        ),
        nameGap: 32,
        nameLocation: 'middle'
      }
    default:
      return {
        ...baseConfig,
        axisLabel: {
          show: true
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: true
        },
        splitNumber: 7,
        name: metric.label + (
          demographic ? 
            ' (' + getDemographicLabel(demographic) + ' students)' : 
            ''
        ),
        nameGap: 32,
        nameLocation: 'middle'
      }
  }
}

export const tooltip = (placeNames, xVar, yVar) => {
  const xLabel = getLabelFromVarName(xVar);
  const yLabel = getLabelFromVarName(yVar);
  return {
    show:true,
    trigger: 'item',
    formatter: ({value}) => {
      const name = placeNames && placeNames[value[3]] ? 
        placeNames[value[3]] : 'Unknown'
      const stateName = getStateName(value[3])
      const line1 = xLabel + ': ' + value[0];
      const line2 = yLabel + ': ' + value[1];
      return `
        <strong>${name}, ${stateName}</strong><br />
        ${line1}<br />
        ${line2}
      `
    }
  }
}