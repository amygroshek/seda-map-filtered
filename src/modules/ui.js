const initialState = {
  menuOpen: false,
  helpOpen: false,
  statsViewActive: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, menuOpen: action.open }
    case 'TOGGLE_HELP':
      return { ...state, helpOpen: action.open }
    case 'TOGGLE_STATS_VIEW':
      return { ...state, statsViewActive: action.active }
    default:
      return state
  }
}
