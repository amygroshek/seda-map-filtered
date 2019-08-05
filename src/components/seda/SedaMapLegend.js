import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { toggleHelp, showSingleHelpTopic, onViewChange, onMapLegendAction } from '../../actions';
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
  onToggleClick: () => {
    dispatch({type: 'TOGGLE_LEGEND_TYPE'})
    dispatch(onMapLegendAction('toggle-legend'))
  },
  onFullClick: () => {
    dispatch(onViewChange('chart', ownProps))
    dispatch(onMapLegendAction('full-chart'))
  },
  onHelpClick: (helpOpen) => {
    !helpOpen && dispatch(toggleHelp());
    dispatch(showSingleHelpTopic('HELP_MAP'))
    dispatch(onMapLegendAction('show-help'))
  },
})


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapLegend)