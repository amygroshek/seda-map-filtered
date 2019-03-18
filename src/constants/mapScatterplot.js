import * as spStyle from '../style/scatterplot-style';
import { fade } from '@material-ui/core/styles/colorManipulator';

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