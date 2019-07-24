import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { toggleHelp } from '../../actions';
import { updateRoute } from '../../modules/router';
import { MapLegend } from '../organisms/Map';

const mapStateToProps = ({ 
  selected,
  ui: { legendType },
  sections: { hovered },
},
{ match: { params: { view, secondary, region, metric, demographic } } }
) => {
  return ({
    view,
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
  onHelpClick: () => dispatch(toggleHelp()),
})


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapLegend)