const initialState = {
  menuOpen: false,
  helpOpen: false,
  statsViewActive: false,
  helpTab: 0,
  legendType: 'chart',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, menuOpen: action.open }
    case 'TOGGLE_HELP':
      return { ...state, helpOpen: action.open }
    case 'SET_HELP_TAB':
      return { ...state, helpTab: action.tab }
    case 'TOGGLE_STATS_VIEW':
      return { ...state, statsViewActive: action.active }
    case 'TOGGLE_LEGEND_TYPE':
      return { 
        ...state, 
        legendType: state.legendType === 'chart' ? 'condensed' : 'chart'
      }
    default:
      return state
  }
}
