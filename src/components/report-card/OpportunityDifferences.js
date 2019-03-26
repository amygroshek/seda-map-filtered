import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMetricControl, getDemographicControl, getHighlightControl } from '../../modules/config';
import { updateCurrentState, toggleHighlightState } from '../../actions/mapActions';
import { onScatterplotData } from '../../actions/scatterplotActions';
import { getDemographicIdFromVarName, getMetricIdFromVarName } from '../../modules/config';
import LANG from '../../constants/lang.js';
import ReportCardSection from './ReportCardSection';

const mapStateToProps = (
  { 
    scatterplot: { data }, 
    selected, 
    map: { usState, highlightState }, 
    report: { opportunity } 
  },
  { match: { params: { region } } }
) => {
  return ({
    title: LANG['OPP_DIFF_TITLE'],
    description: LANG['OPP_DIFF_DESCRIPTION'],
    variant: 'opp',
    region,
    data,
    selected: selected && selected[region],
    highlightedState: highlightState && usState ? usState : null,
    ...opportunity,
    controls: [
      getMetricControl(
        getMetricIdFromVarName(opportunity.xVar)
      ),
      getDemographicControl(
        getDemographicIdFromVarName(opportunity.xVar),
        'subgroupX',
        'Subgroup 1'
      ),
      getDemographicControl(
        getDemographicIdFromVarName(opportunity.yVar), 
        'subgroupY',
        'Subgroup 2'
      ),
      getHighlightControl(highlightState && usState ? usState : 'none')
    ],
  })
} 

const mapDispatchToProps = (dispatch) => ({
  onOptionChange: (option) => {
    switch(option.id) {
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
        return dispatch({
          type: 'SET_REPORT_OPTION',
          section: 'opportunity',
          ...option
        })
    }
  },
  onData: (data, region) =>
    dispatch(onScatterplotData(data, region)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ReportCardSection)

