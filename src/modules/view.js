
const view = (state = 'right', action) => {
    switch(action.type) {
      case 'SET_VIEW':
        return action.view;
      default:
        return state;
    }
  }

export default view;
