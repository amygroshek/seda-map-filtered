import { updateRoute } from '../../modules/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMetricControl, getDemographicControl, getHighlightControl } from '../../modules/config';
import { updateCurrentState, toggleHighlightState } from '../../actions/mapActions';
import { onScatterplotData } from '../../actions/scatterplotActions';
import LANG from '../../constants/lang.js';
import ScatterplotSection from './ScatterplotSection';

const mapStateToProps = (
  { scatterplot: { data }, selected, map: { usState, highlightState } },
  { match: { params: { demographic, region, metric } } }
) => {
  return ({
    title: LANG['SES_COND_TITLE'],
    description: LANG['SES_COND_DESCRIPTION'],
    variant: 'ses',
    region,
    data,
    selected: selected && selected[region],
    highlightedState: highlightState && usState ? usState : null,
    xVar: demographic + '_ses',
    yVar: demographic + '_' + metric,
    zVar: 'sz',
    controls: [
      getMetricControl(metric),
      getDemographicControl(demographic),
      getHighlightControl(highlightState && usState ? usState : 'none')
    ],
  })
} 

const mapDispatchToProps = (dispatch, ownProps) => ({
  onOptionChange: (option) => {
    switch(option.id) {
      case 'metric':
        return updateRoute(ownProps, { metric: option.value })
      case 'demographic':
        return updateRoute(ownProps, { demographic: option.value })
      case 'highlight':
        if (option.value === 'none') {
          dispatch(toggleHighlightState(false))
          dispatch(updateCurrentState(null))
        } else {
          dispatch(toggleHighlightState(true))
          dispatch(updateCurrentState(option.value))
        }
        return;
      default:
        return;
    }
  },
  onData: (data, region) =>
    dispatch(onScatterplotData(data, region)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

