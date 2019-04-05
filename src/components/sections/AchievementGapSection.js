import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRegionControl, getGapControl, getHighlightControl, getSecondaryMetricControl, getMetricIdFromVarName } from '../../modules/config';
import { onScatterplotData, getDispatchForSection } from '../../actions/scatterplotActions';
import { getDemographicIdFromVarName } from '../../modules/config';
import LANG from '../../constants/lang.js';
import ScatterplotSection from './ScatterplotSection';

const mapStateToProps = (
  { 
    scatterplot: { data }, 
    selected, 
    map: { usState }, 
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
    highlightedState: usState,
    ...achievement,
    controlText: 'Showing the $1 of $2 vs. average test scores by $3 in $4',
    controls: [
      getGapControl(
        getDemographicIdFromVarName(achievement.xVar), 
        'gap',
        'Achievement Gap'
      ),
      getSecondaryMetricControl(
        getMetricIdFromVarName(achievement.xVar),
        'secondary'
      ),
      getRegionControl(region),
      getHighlightControl(usState)
    ],
  })
} 

const mapDispatchToProps = (dispatch, ownProps) => ({
  onOptionChange: 
    getDispatchForSection(dispatch, 'achievement', ownProps),
  onData: (data, region) =>
    dispatch(onScatterplotData(data, region)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

