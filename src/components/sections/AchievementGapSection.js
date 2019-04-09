import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRegionControl, getGapControl, getHighlightControl, getSecondaryMetricControl, getMetricIdFromVarName } from '../../modules/config';
import { getDemographicIdFromVarName } from '../../modules/config';
import LANG from '../../constants/lang.js';
import ScatterplotSection, { sectionMapDispatchToProps } from './ScatterplotSection';

const mapStateToProps = (
  { 
    scatterplot: { data, loaded }, 
    selected, 
    map: { usState }, 
    sections: { achievement: { hovered, vars } },
  },
  { match: { params: { region } } }
) => {
  return ({
    title: LANG['ACH_GAPS_TITLE'],
    description: LANG['ACH_GAPS_DESCRIPTION'],
    ready: Boolean(loaded['map']),
    headerMenu: {
      text: 'Showing the $1 of $2 vs. average test scores by $3 in $4',
      controls: [
        getGapControl(
          getDemographicIdFromVarName(vars.xVar), 
          'gap',
          'Achievement Gap'
        ),
        getSecondaryMetricControl(
          getMetricIdFromVarName(vars.xVar),
          'secondary'
        ),
        getRegionControl(region),
        getHighlightControl(usState)
      ],
    },
    scatterplot: {
      ...vars,
      selected: selected && selected[region],
      hovered: hovered && 
        hovered.properties && 
        hovered.properties.id ?
          hovered.properties.id : '',
      highlightedState: usState,
      variant: 'ach',
      region,
      data,
    }
  })
} 

const mapDispatchToProps = 
  sectionMapDispatchToProps('achievement')

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

