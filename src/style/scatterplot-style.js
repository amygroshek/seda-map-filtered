import * as spStyle from '../style/scatterplot-style';
import { fade } from '@material-ui/core/styles/colorManipulator';

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

export const overlays = (metric) => {
  const overlayConfig = {
    'avg': spStyle.getOverlay(
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
    'grd': spStyle.getOverlay(
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
    'coh': spStyle.getOverlay(
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
  }
  return overlayConfig[metric.id] ? overlayConfig[metric.id] : {}
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

export const xAxis = (metric) => {
  const xAxisConfig = {
    'ses': {
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
  };
  return xAxisConfig[metric.id] ? xAxisConfig[metric.id] : {}
}

export const yAxis = (metric) => {
  const baseConfig = {
    min: metric.min,
    max: metric.max,
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
        color: '#999'
      }
    },
    splitLine: { show: false }
  }
  const yAxisConfig = {
    'avg': baseConfig,
    'grd': baseConfig,
    'coh': baseConfig
  };
  return yAxisConfig[metric.id] ? yAxisConfig[metric.id] : {}
}