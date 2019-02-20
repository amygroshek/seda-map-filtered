
export const hoverOptions = {
  grid: {
    top: '24',
    right: '32',
    bottom: '40',
    left: '32',
  },
  xAxis: {
    type: 'value',
    name: '',
    interval: 1,
    nameTextStyle: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    min: -6,
    max:4,
    nameLocation: 'center',
    nameGap: 16,
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      formatter: function () {
        return ' '
      },
      inside: false,
      margin: 8,
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show:false,
      formatter: function () {
        return ' '
      },
    }
  }
}

export const scatterOptions = {
  grid: {
    top: '24',
    right: '32',
    bottom: '40',
    left: '32',
  },
  visualMap: {
    dimension: 1,
    show:false,
    calculable: false
  },
  xAxis: {
    type: 'value',
    name: 'Parents Socioeconomic Status',
    interval: 1,
    nameTextStyle: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    min: -6,
    max:4,
    nameLocation: 'center',
    nameGap: 16,
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      formatter: function (val) {
        if (val === 3) {
          return 'richer →';
        }
        if (val === -5) {
          return '← poorer';
        }
        return null;
      },
      inside: false,
      margin: 8,
    }
  },
  yAxis: {
    type: 'value',
    splitNumber: 7,
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: [ 'rgba(0,0,0,0.1)']
      },
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      inside: false,
      textVerticalAlign: 'middle',
      showMaxLabel: true,
      showMinLabel: true,
      color: '#999',
      fontSize: 12
    }
  }
};