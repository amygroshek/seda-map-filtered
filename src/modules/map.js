const initialState = {
  metric: 'ach',
  region: 'counties',
  demographic: 'all',
  hoveredFeature: null,
  viewport: {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  },
  selected: []
}

const map = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_HOVERED_FEATURE':
      return {
        ...state,
        hoveredFeature: action.hoveredFeature
      }
    case 'SET_MAP_REGION':
      if (action.region === 'schools') {
        window.alert('schools not yet available')
        return state;
      }
      return {
        ...state,
        region: action.region
      }
    case 'SET_MAP_DEMOGRAPHIC':
      if (action.demographic !== 'all') {
        window.alert('demographics not yet available')
      }
      return {
        ...state,
        demographic: action.demographic
      }
    case 'SET_MAP_METRIC':
      if (action.metric !== 'ach') {
        window.alert('metric not yet available')
      }
      return {
        ...state,
        metric: action.metric
      }
    case 'ADD_SELECTED_FEATURE':
      return {
        ...state,
        selected: [ 
          ...state.selected, 
          action.feature
        ]
      }
    case 'SET_MAP_VIEWPORT':
      return {
        ...state,
        viewport: { 
          ...state.viewport,
          ...action.viewport 
        }
      }
    default:
      return state;
  }
}

export const getChoroplethProperty = (state) => {
  const { metric } = state;
  const demographic = 'mn'; 
  // TODO: uncomment line below when real tilesets are available
  // const demographic = this.props.demographic;
  return demographic + '_' + metric;
}

export default map;