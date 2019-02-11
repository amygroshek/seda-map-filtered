export const metrics = [
  { 
    id: 'avg',
    label: 'Average Test Scores',
    stops: [
      [ 2, '#f46d43' ],
      [ 3, '#fdae61' ],
      [ 4, '#fee08b' ],
      [ 5, '#ffffbf' ],
      [ 6, '#e6f598' ],
      [ 7, '#abdda4' ],
      [ 8, '#66c2a5' ],
    ]
  },
  { 
    id: 'grd',
    label: 'Growth over years',
    stops: [
      [ 0.2, '#f46d43' ],
      [ 0.4, '#fdae61' ],
      [ 0.6, '#fee08b' ],
      [ 0.8, '#ffffbf' ],
      [ 1, '#e6f598' ],
      [ 1.2, '#abdda4' ],
      [ 1.4, '#66c2a5' ],
    ]
  },
  { 
    id: 'coh',
    label: 'Trend over years',
    stops: [
      [ -0.4, '#d53e4f' ],
      [ -0.3, '#f46d43' ],
      [ -0.2, '#fdae61' ],
      [ -0.1, '#fee08b' ],
      [ 0, '#ffffbf' ],
      [ 0.1, '#e6f598' ],
      [ 0.2, '#abdda4' ],
      [ 0.3, '#66c2a5' ],
      [ 0.4, '#3288bd' ]
    ]
  }
];

export const regions = [
  {
    id: 'counties',
    label: 'Counties'
  },
  {
    id: 'districts',
    label: 'Districts'
  },
  {
    id: 'schools',
    label: 'Schools'
  }
];

export const demographics = [
  {
    id: 'all',
    label: 'Total Population'
  },
  {
    id: 'w',
    label: 'White'
  },
  {
    id: 'b',
    label: 'Black'
  },
  {
    id: 'h',
    label: 'Hispanic'
  },
  {
    id: 'a',
    label: 'Asian'
  },
  {
    id: 'm',
    label: 'Male'
  },
  {
    id: 'f',
    label: 'Female'
  },
  {
    id: 'p',
    label: 'Poor'
  },
  {
    id: 'np',
    label: 'Non-Poor'
  },
]

export const getStopsForMetric = (metric) => {
  const match = metrics.find(m => m.id === metric);
  if (!match) { 
    throw new Error('No metric found matching ' + metric); 
  }
  return match.stops;
}
