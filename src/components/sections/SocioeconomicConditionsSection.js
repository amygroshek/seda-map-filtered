import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDemographicIdFromVarName, getRegionControl, getMetricControl, getDemographicControl, getHighlightControl, getMetricIdFromVarName } from '../../modules/config';
import { onScatterplotData, getDispatchForSection } from '../../actions/scatterplotActions';
import LANG from '../../constants/lang.js';
import ScatterplotSection from './ScatterplotSection';

const mapStateToProps = (
  { 
    scatterplot: { data }, 
    selected, 
    map: { usState },
    report: { socioeconomic } 
  },
  { match: { params: { region } } }
) => {
  return ({
    title: LANG['SES_COND_TITLE'],
    description: LANG['SES_COND_DESCRIPTION'],
    variant: 'ses',
    region,
    data,
    selected: selected && selected[region],
    highlightedState: usState,
    ...socioeconomic,
    controlText: usState ?
      "Showing $1 for $2 by $3 in $4" :
      "Showing $1 for $2 by $3 in the $4",
    controls: [
      getMetricControl(
        getMetricIdFromVarName(socioeconomic.yVar)
      ),
      getDemographicControl(
        getDemographicIdFromVarName(socioeconomic.yVar)
      ),
      getRegionControl(region),
      getHighlightControl(usState)
    ],
  })
} 

const mapDispatchToProps = (dispatch, ownProps) => ({
  onOptionChange: 
    getDispatchForSection(dispatch, 'socioeconomic', ownProps),
  onData: (data, region) =>
    dispatch(onScatterplotData(data, region)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

