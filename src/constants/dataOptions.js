
export const metrics = [
  { 
    id: 'ach',
    label: 'Average Test Scores',
    stops: [
      [ 1, '#d53e4f' ],
      [ 2, '#f46d43' ],
      [ 3, '#fdae61' ],
      [ 4, '#fee08b' ],
      [ 5, '#ffffbf' ],
      [ 6, '#e6f598' ],
      [ 7, '#abdda4' ],
      [ 8, '#66c2a5' ],
      [ 9, '#3288bd' ]
    ]
  },
  { 
    id: 'diff',
    label: 'Growth over years',
    stops: [
      [ -1, '#d53e4f' ],
      [ -0.75, '#f46d43' ],
      [ -0.5, '#fdae61' ],
      [ -0.25, '#fee08b' ],
      [ 0, '#ffffbf' ],
      [ 0.25, '#e6f598' ],
      [ 0.5, '#abdda4' ],
      [ 0.75, '#66c2a5' ],
      [ 1, '#3288bd' ]
    ]
  },
  { 
    id: 'slp',
    label: 'Trend over years',
    stops: [
      [ -1, '#d53e4f' ],
      [ -0.75, '#f46d43' ],
      [ -0.5, '#fdae61' ],
      [ -0.25, '#fee08b' ],
      [ 0, '#ffffbf' ],
      [ 0.25, '#e6f598' ],
      [ 0.5, '#abdda4' ],
      [ 0.75, '#66c2a5' ],
      [ 1, '#3288bd' ]
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