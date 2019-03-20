
export const metrics = [
  {
    id: 'avg',
    label: 'Average Test Scores',
  },
  {
    id: 'grd',
    label: 'Growth of test scores',
  },
  {
    id: 'coh',
    label: 'Trend of test scores',
  }
]

export const regions = [
  {
    id: 'counties',
    label: 'Counties'
  },
  {
    id: 'districts',
    label: 'School Districts'
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


export const gaps = [
  {
    id: 'wb',
    label: 'White / Black Gap'
  },
  {
    id: 'wh',
    label: 'White / Hispanic Gap'
  },
  {
    id: 'wa',
    label: 'White / Asian Gap'
  },
  {
    id: 'pn',
    label: 'Poor / Non-poor Gap'
  }
]

export const getDemographicLabel = (id) => {
  let dem = demographics.find(d => d.id === id);
  if (!dem) {
    dem = gaps.find(d => d.id === id)
  }
  if (!dem) {
    throw new Error('no demographic found for ' + id)
  }
  return dem.label;
}
