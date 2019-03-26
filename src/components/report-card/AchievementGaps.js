import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getGapControl, getHighlightControl } from '../../modules/config';
import { updateCurrentState, toggleHighlightState } from '../../actions/mapActions';
import { onScatterplotData } from '../../actions/scatterplotActions';
import { getDemographicIdFromVarName } from '../../modules/config';
import LANG from '../../constants/lang.js';
import ReportCardSection from './ReportCardSection';

const mapStateToProps = (
  { 
    scatterplot: { data }, 
    selected, 
    map: { usState, highlightState }, 
    report: { achievement } 
  },
  { match: { params: { region } } }
) => {
  return ({
    title: LANG['ACH_GAPS_TITLE'],
    description: LANG['ACH_GAPS_DESCRIPTION'],
    variant: 'ach',
    region,
    data,
    selected: selected && selected[region],
    highlightedState: highlightState && usState ? usState : null,
    ...achievement,
    controls: [
      getGapControl(
        getDemographicIdFromVarName(achievement.xVar), 
        'gap',
        'Achievement Gap'
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
          section: 'achievement',
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

