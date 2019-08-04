import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { toggleHelp, showSingleHelpTopic } from '../../actions';
import { updateRoute } from '../../modules/router';
import { MapLegend } from '../organisms/Map';

const mapStateToProps = ({ 
  selected,
  ui: { legendType, helpOpen },
  sections: { hovered },
},
{ match: { params: { view, secondary, region, metric, demographic } } }
) => {
  return ({
    view,
    helpOpen,
    region,
    metric,
    demographic,
    secondary,
    selected,
    hovered,
    variant: legendType,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onToggleClick: () => dispatch({
    type: 'TOGGLE_LEGEND_TYPE'
  }),
  onFullClick: () => {
    updateRoute(ownProps, { view: 'chart' })
  },
  onHelpClick: (helpOpen) => {
    !helpOpen && dispatch(toggleHelp());
    dispatch(showSingleHelpTopic('HELP_MAP'))
  },
})


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapLegend)