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
    map: { usState }, 
    sections: { opportunity: { hovered, vars }  } 
  },
  { match: { params: { region } } }
) => {
  return ({
    title: LANG['OPP_DIFF_TITLE'],
    description: LANG['OPP_DIFF_DESCRIPTION'],
    ready: Boolean(loaded['map']),
    headerMenu: {
      text: 'Showing $1 for $2 vs. $3 by $4 in $5',
      controls: [
        getMetricControl(
          getMetricIdFromVarName(vars.xVar)
        ),
        getDemographicControl(
          getDemographicIdFromVarName(vars.xVar),
          'subgroupX',
          'Subgroup 1'
        ),
        getDemographicControl(
          getDemographicIdFromVarName(vars.yVar), 
          'subgroupY',
          'Subgroup 2'
        ),
        getRegionControl(region),
        getHighlightControl(usState)
      ],
    },
    scatterplot: {
      ...vars,
      highlightedState: usState,
      variant: 'opp',
      region,
      data,
      selected: selected && selected[region],
      hovered: hovered && 
        hovered.properties && 
        hovered.properties.id ?
          hovered.properties.id : '',
    }
  })
} 

const mapDispatchToProps = 
  sectionMapDispatchToProps('opportunity')

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

