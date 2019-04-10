import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRegionControl, getMetricControl, getDemographicControl, getHighlightControl } from '../../modules/controls';
import { getDemographicIdFromVarName, getMetricIdFromVarName } from '../../modules/config';
import LANG from '../../constants/lang.js';
import ScatterplotSection from '../base/ScatterplotSection';
import { sectionMapDispatchToProps } from '../../actions/sectionActions';

/**
 * Gets an array of controls for the section
 * @param {string} region 
 * @param {object} vars 
 * @param {string} highlightedState 
 */
const getSectionControls = (region, vars, highlightedState) => [
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
  getHighlightControl(highlightedState)
]

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
    active: Boolean(loaded['map']),
    section: {
      id: 'opportunity',
      type: 'scatterplot',
      title: LANG['OPP_DIFF_TITLE'],
      description: LANG['OPP_DIFF_DESCRIPTION'],
      headerMenu: {
        text: 'Showing $1 for $2 vs. $3 by $4 in $5',
        controls: getSectionControls(region, vars, usState)
      },
      selected: selected && selected[region],
      cardMetrics: [ vars.xVar, vars.yVar ],
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

