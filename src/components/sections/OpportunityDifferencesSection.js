import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMetricControl, getDemographicControl, getHighlightControl, getRegionControl } from '../../modules/config';
import { getDemographicIdFromVarName, getMetricIdFromVarName } from '../../modules/config';
import LANG from '../../constants/lang.js';
import ScatterplotSection, { sectionMapDispatchToProps } from './ScatterplotSection';

const mapStateToProps = (
  { 
    scatterplot: { data, loaded }, 
    selected,
    hovered: { feature },
    map: { usState }, 
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
    hovered: feature && 
      feature.properties && 
      feature.properties.id ?
        feature.properties.id : '',
    ready: Boolean(loaded['map']),
    highlightedState: usState,
    ...opportunity,
    controlText: 'Showing $1 for $2 vs. $3 by $4 in $5',
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
      getRegionControl(region),
      getHighlightControl(usState)
    ],
  })
} 

const mapDispatchToProps = 
  sectionMapDispatchToProps('opportunity')

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

