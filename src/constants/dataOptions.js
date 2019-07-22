import LANG from "./en";

/** min / max dot sizes */
export const DOT_SIZES = [ 8, 48 ]

/** data ranges to map to size ranges */
export const REGION_DOMAINS = {
  'counties': [ 1000, 100000 ],
  'districts': [ 1000, 10000 ],
  'schools': [ 10, 500 ],
}


export const MAX_LOCATIONS = 6;

/**
 * default vars for each section
 */
export const SECTIONS = {
  'map': {
    xVar: 'all_ses',
    yVar: 'all_avg',
    zVar: 'all_sz',
  },
  'master': {
    xVar: 'all_ses',
    yVar: 'all_avg',
    zVar: 'all_sz',
    region: 'counties',
  },
}

export const MAP_REGION_TO_ID_LENGTH = {
  'counties': 5,
  'districts': 7,
  'schools': 12
}

export const MAP_ID_LENGTH_TO_REGION = {
  2: 'states',
  5: 'counties',
  7: 'districts',
  12: 'schools'
}

/**
 * Variables contained in the base csv file for each region
 */
export const BASE_VARS = {
  'counties': ['id', 'name', 'lat', 'lon', 'all_sz' ],
  'districts': ['id', 'name', 'lat', 'lon', 'all_sz' ],
  'schools': ['id', 'name', 'lat', 'lon', 'all_sz' ]
}

/**
 * Colors for selected locations
 */
export const SELECTED_COLORS = [
  '#F46800', 
  '#8C1AF4', 
  '#B2002A', 
  '#F84EBF', 
  '#3F00B3', 
  '#FF0C0C'
];

/**
 * colors for map choropleths
 */
export const CHOROPLETH_COLORS = [
  '#174b80',
  '#4189d2',
  '#abd9e9',
  '#f7f7f7',
  '#bfe9ab',
  '#2fb57f',
  '#136e4a'
];

export const NO_DATA_COLOR = '#ccc';

/**
 * Data metrics in the SEDA data set
 */
export const METRICS = [
  {
    id: 'avg',
    label: LANG['LABEL_AVG'],
    description: LANG['EXPLAINER_AVG'],
    range: {
      'map_*_gap': [ -6, 6 ],
      'map_counties': [ -3, 3 ],
      'map_districts': [ -3.5, 3.5 ],
      'map_schools': [ -5, 5 ],
      '*_*_gap': [ -1.5, 4.75 ],
      '*_counties': [ -4.5, 2.5 ],
      '*_districts': [ -4.5, 4.5 ],
      '*_schools': [ -8, 8 ],
    },
    map: true,
    scatterplot: true,
  },
  {
    id: 'grd',
    label: LANG['LABEL_GRD'],
    description: LANG['EXPLAINER_GRD'],
    range: {
      'map_*_gap': [ -0.4, 0.4 ],
      'map_schools': [ 0, 2 ],
      'map_*_*': [ 0.5, 1.5 ],
      '*_*_wb': [ -0.3, 0.45 ],
      '*_*_gap': [ -0.4, 0.4 ],
      '*_schools': [ -0.6, 2.6 ],
      '*': [ 0.3, 1.7 ],
    },
    map: true,
    scatterplot: true,
  },
  {
    id: 'coh',
    label: LANG['LABEL_COH'],
    description: LANG['EXPLAINER_COH'],
    range: {
      '*_*_gap': [-0.25, 0.25],
      '*_schools': [-1.5, 1.5],
      'map_*_*': [ -0.333, 0.3333 ],
      '*': [ -0.5, 0.5 ],
    },
    map: true,
    scatterplot: true,
  },
  {
    id: 'ses',
    label: LANG['LABEL_SES'],
    description: LANG['EXPLAINER_SES'],
    map: false,
    scatterplot: true,
    range: {
      '*_districts_h': [-5, 3],
      '*_counties_h': [-5.5, 0.5],
      '*_*_b': [ -6, 2 ],
      '*_*_h': [ -6, 2 ],
      '*_districts_wb': [ -1, 6 ],
      '*_*_wb': [ 0, 5 ],
      '*_districts_wh': [ -1, 5 ],
      '*_*_wh': [ -0.5, 4.5 ],
      'map_*_*': [ -3, 3 ],
      '*_counties': [-4, 3],
      '*': [ -5, 4 ],
    }
  },
  {
    id: 'seg',
    label: LANG['LABEL_SEG'],
    description: LANG['EXPLAINER_SEG'],
    range: {
      '*': [ -5, 5 ],
    },
    map: false,
    scatterplot: true
  },
  {
    id: 'frl',
    label: LANG['LABEL_FRL'],
    description: LANG['EXPLAINER_FRL'],
    range: {
      '*': [ 0, 1 ],
    },
    map: false,
    scatterplot: true
  },
]

/**
 * regions data is available for
 */
export const REGIONS = [
  {
    id: 'counties',
    label: LANG['LABEL_COUNTIES'],
    singular: LANG['LABEL_COUNTIES_SINGULAR']
  },
  {
    id: 'districts',
    label: LANG['LABEL_DISTRICTS'],
    singular: LANG['LABEL_DISTRICTS_SINGULAR']
  },
  {
    id: 'schools',
    label: LANG['LABEL_SCHOOLS'],
    singular: LANG['LABEL_SCHOOLS_SINGULAR']
  }
];

/**
 * demographics data is available for
 */
export const DEMOGRAPHICS = [
  {
    id: 'all',
    label: LANG['LABEL_ALL']
  },
  {
    id: 'w',
    label: LANG['LABEL_W']
  },
  {
    id: 'b',
    label: LANG['LABEL_B']
  },
  {
    id: 'h',
    label: LANG['LABEL_H']
  },
  {
    id: 'a',
    label: LANG['LABEL_A']
  },
  {
    id: 'm',
    label: LANG['LABEL_M']
  },
  {
    id: 'f',
    label: LANG['LABEL_F']
  },
  {
    id: 'p',
    label: LANG['LABEL_P']
  },
  {
    id: 'np',
    label: LANG['LABEL_NP']
  }
]

/**
 * gaps data is available for
 */
export const GAPS = [
  {
    id: 'wb',
    label: LANG['LABEL_WB']
  },
  {
    id: 'wh',
    label: LANG['LABEL_WH']
  },
  {
    id: 'pn',
    label: LANG['LABEL_PN']
  },
  {
    id: 'mf',
    label: LANG['LABEL_MF']
  }
]
