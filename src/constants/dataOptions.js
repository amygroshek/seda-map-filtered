import LANG from "./lang";

/** min / max dot sizes */
export const DOT_SIZES = [ 6, 48 ]

/**
 * default viewport on map view
 */
export const DEFAULT_VIEWPORT = {
  latitude: 37.39,
  longitude: -96.78,
  zoom: 3.15
}

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
  '#A24BFF', 
  '#C289FF', 
  '#BF00D0', 
  '#FF6DCF', 
  '#FFC5EC', 
  '#FF7B18', 
  '#FFB92A'
];



/**
 * colors for map choropleths
 */
export const CHOROPLETH_COLORS = [
  // original
  // '#37469C', 
  // '#3561A8', 
  // '#519DD4', 
  // '#68C5D0', 
  // '#A2E2D4', 
  // '#E5F8C1', 
  // '#F9FECC'

  // blue green
  // '#0A5099',
  // '#367FCA',
  // '#abd9e9',
  // '#f7f7f7',
  // '#bfe9ab',
  // '#32C48A',
  // '#098554'

  '#174b80',
  '#4189d2',
  '#abd9e9',
  '#f7f7f7',
  '#bfe9ab',
  '#2fb57f',
  '#136e4a'

  // blue / brown
  // '#4B1C01',
  // '#824B2A',
  // '#CFAEA5',
  // '#f7f7f7',
  // '#A0C3DB',
  // '#5A7CAE',
  // '#000B3C',

  // blue / pink
  // '#0090ff',
  // '#3da9fc',
  // '#7ac2fa',
  // '#f4f4f4',
  // '#fa7a99',
  // '#fc3d6c',
  // '#ff003e',

  // purple / teal
  // '#1054a2', 
  // '#477ab5', 
  // '#b5c6db', 
  // '#ececee', 
  // '#b1d9c9', 
  // '#3bb480', 
  // '#00a15b'
  
];

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
      '*_*_gap': [ -7, 0 ],
      '*_counties': [ -4, 3 ],
      '*_districts': [ -3.5, 3.5 ],
      '*_schools': [ -5, 5 ],
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
      '*_*_gap': [ -0.3, 0.5 ],
      'map_schools': [ -3, 3 ],
      '*_schools': [ -0.6, 2.6 ],
      'map_*_*': [ 0.5, 1.5 ],
      '*': [ 0.5, 1.5 ],
    },
    map: true,
    scatterplot: true,
  },
  {
    id: 'coh',
    label: LANG['LABEL_COH'],
    description: LANG['EXPLAINER_COH'],
    range: {
      '*_*_gap': [-0.3333, 0.3333],
      '*_schools': [-1.5, 1.5],
      'map_*_*': [ -0.333, 0.3333 ],
      '*': [ -0.4, 0.4 ],
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
      '*_*_b': [ -14, 5 ],
      '*_*_h': [ -16, 5 ],
      '*_*_wb': [ -4, 14 ],
      '*_*_wh': [ -5, 16 ],
      '*': [ -6, 4 ],
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
    id: 'pct',
    label: 'Percent',
    description: '',
    range: {
      '*': [0, 1],
    },
  }
]

/**
 * regions data is available for
 */
export const REGIONS = [
  {
    id: 'counties',
    label: LANG['LABEL_COUNTIES']
  },
  {
    id: 'districts',
    label: LANG['LABEL_DISTRICTS']
  },
  {
    id: 'schools',
    label: LANG['LABEL_SCHOOLS']
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
  },
  {
    id: 'frl',
    'label': LANG['LABEL_FRL']
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
    id: 'wa',
    label: LANG['LABEL_WA']
  },
  {
    id: 'pn',
    label: LANG['LABEL_PN']
  }
]
