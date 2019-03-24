
/**
 * Variables contained in the base csv file for each region
 */
export const BASE_VARS = {
  'counties': ['id', 'name', 'lat', 'lon', 'all_avg', 'all_ses', 'sz' ],
  'districts': ['id', 'name', 'lat', 'lon', 'all_avg', 'all_ses', 'sz' ],
  'schools': ['id', 'name', 'lat', 'lon', 'all_avg', 'frl_pct', 'sz' ]
}

export const metrics = [
  {
    id: 'avg',
    label: 'Average Test Scores',
    short_label: 'Avg. Test Score',
    description: 'Shows the set of educational opportunities children have had from birth to the time they take the tests',
    help: 'Average test scores for grades 3-8 explainer',
    min: -4,
    max: 4,
    map: true,
    scatterplot: true,
  },
  {
    id: 'grd',
    label: 'Growth of test scores',
    short_label: 'Growth Rate',
    descriptive_label: 'Grow %value% grade levels each year',
    description: 'Shows how much students learn on average while they are in school',
    min: 0.4,
    max: 1.6,
    map: true,
    scatterplot: true,
  },
  {
    id: 'coh',
    label: 'Trend of test scores',
    short_label: 'Trend',
    description: 'Indicates the extent to which a community is getting better at providing educational opportunities over time',
    min: -0.3,
    max: 0.3,
    map: true,
    scatterplot: true,
  },
  {
    id: 'ses',
    label: 'Socioeconomic Status',
    short_label: 'SES',
    description: 'Socioeconomic status helper',
    map: false,
    scatterplot: true
  },
  {
    id: 'seg',
    label: 'Segregation Measure',
    short_label: 'Segregation',
    description: 'Segregation status helper',
    map: false,
    scatterplot: true
  }
]

export const getMetricById = (id) =>
  metrics.find(m => m.id === id)

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
