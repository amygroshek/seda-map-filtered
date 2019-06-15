const initialState = {
  menuOpen: false,
  helpOpen: true,
  statsViewActive: false,
  helpTab: 0
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
    default:
      return state
  }
}
