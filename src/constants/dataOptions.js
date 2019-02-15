
export const metrics = [
  { 
    id: 'avg',
    label: 'Average Test Scores',
    stops: [
      [ 1,  '#312B88' ],
      [ 2, '#6634C2' ],
      [ 3,    '#4452C7' ],
      [ 4, '#1C8AD4' ],
      [ 5,  '#45AED2' ],
      [ 6, '#73D4BF' ],
      [ 7,    '#9DE57F' ],
      [ 8, '#C8F393' ],
      [ 9,  '#FBEB93' ],
    ]
  },
  { 
    id: 'grd',
    label: 'Growth over years',
    stops: [
      [ 0.2, '#312B88' ],
      [ 0.4, '#6634C2' ],
      [ 0.6, '#4452C7' ],
      [ 0.8, '#1C8AD4' ],
      [ 1,   '#45AED2' ],
      [ 1.2, '#73D4BF' ],
      [ 1.4, '#9DE57F' ],
      [ 1.6, '#C8F393' ],
      [ 1.8, '#FBEB93' ],
    ]
  },
  { 
    id: 'coh',
    label: 'Trend over years',
    stops: [
      [ -0.3,   '#312B88' ],
      [ -0.225, '#6634C2' ],
      [ -0.15,  '#4452C7' ],
      [ -0.075, '#1C8AD4' ],
      [ 0,      '#45AED2' ],
      [ 0.075,  '#73D4BF' ],
      [ 0.15,   '#9DE57F' ],
      [ 0.225,  '#C8F393' ],
      [ 0.3,    '#FBEB93' ]
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
