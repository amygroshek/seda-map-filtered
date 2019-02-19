const initialState = {
  items: {
    'avg': { 
      id: 'avg',
      label: 'Average Test Scores',
      short_label: 'Avg. Test Score',
      min: 2.5,
      max: 8.5,
      numSteps: 9
    },
    'grd': { 
      id: 'grd',
      label: 'Growth over years',
      short_label: 'Growth Rate',
      min: 0.6,
      max: 1.4,
      numSteps: 9
    },
    'coh': { 
      id: 'coh',
      label: 'Trend over years',
      short_label: 'Trend',
      min: -0.3,
      max: 0.3,
      numSteps: 9
    }
  },
  colors: []
}

/**
 * Gets expanded min / max of a metric by adding a provided
 * number of steps to each.
 * @param {Object} state object containing all metrics
 * @param {string} metric the metric to expand
 * @param {int} padSteps the number of steps to expand the min / max
 */
export const getPaddedMinMax = (state, metric, padSteps = 0) => {
  const m = state[metric];
  let { min, max, numSteps } = m;
  if (padSteps) {
    const stepSize = Math.abs(max - min) / numSteps;
    min = Math.round((min - (stepSize * padSteps))*10)/10;
    max = Math.round((max + (stepSize * padSteps))*10)/10;
  }
  return { min, max }
}

export const getStops = (state, metric) => {}
