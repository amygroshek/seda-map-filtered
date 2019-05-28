
const view = (state = 'map', action) => {
    switch(action.type) {
      case 'SET_VIEW':
        return action.view;
      default:
        return state;
    }
  }

export default view;
