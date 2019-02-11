export const metrics = [
  { 
    id: 'avg',
    label: 'Average Test Scores',
    stops: [
      [ 2, '#195BA9' ],
      [ 3, '#2887D5' ],
      [ 4, '#2CA0E3' ],
      [ 5, '#28AFE1' ],
      [ 6, '#26BAE0' ],
      [ 7, '#26C4D1' ],
      [ 8, '#2ACEB2' ],
    ]
  },
  { 
    id: 'grd',
    label: 'Growth over years',
    stops: [
      [ 0.2, '#195BA9' ],
      [ 0.4, '#2887D5' ],
      [ 0.6, '#2CA0E3' ],
      [ 0.8, '#28AFE1' ],
      [ 1,   '#26BAE0' ],
      [ 1.2, '#26C4D1' ],
      [ 1.4, '#2ACEB2' ],
    ]
  },
  { 
    id: 'coh',
    label: 'Trend over years',
    stops: [
      [ -0.4, '#0E3C8B' ],
      [ -0.3, '#195BA9' ],
      [ -0.2, '#2887D5' ],
      [ -0.1, '#2CA0E3' ],
      [ 0,    '#28AFE1' ],
      [ 0.1,  '#26BAE0' ],
      [ 0.2,  '#26C4D1' ],
      [ 0.3,  '#2ACEB2' ],
      [ 0.4,  '#2CD1A3' ]
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
