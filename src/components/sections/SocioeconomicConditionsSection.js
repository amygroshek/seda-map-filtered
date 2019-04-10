import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDemographicIdFromVarName, getMetricIdFromVarName } from '../../modules/config';
import { getRegionControl, getMetricControl, getDemographicControl, getHighlightControl } from '../../modules/controls';
import LANG from '../../constants/lang.js';
import { sectionMapDispatchToProps } from '../../actions/sectionActions';
import ScatterplotSection from '../base/ScatterplotSection';

/**
 * Gets an array of controls for the section
 * @param {string} region 
 * @param {object} vars 
 * @param {string} highlightedState 
 */
const getSectionControls = (region, vars, highlightedState) => [
  getMetricControl(
    getMetricIdFromVarName(vars.yVar)
  ),
  getDemographicControl(
    getDemographicIdFromVarName(vars.yVar)
  ),
  getRegionControl(region),
  getHighlightControl(highlightedState)
]

const mapStateToProps = (
  { 
    scatterplot: { data, loaded }, 
    selected,
    map: { usState },
    sections: { socioeconomic: { hovered, vars } } 
  },
  { match: { params: { region } } }
) => {
  return ({
    active: Boolean(loaded['map']),
    section: {
      id: 'socioeconomic',
      type: 'scatterplot',
      title: LANG['SES_COND_TITLE'],
      description: LANG['SES_COND_DESCRIPTION'],
      headerMenu: {
        text: usState ?
          "Showing $1 for $2 by $3 in $4" :
          "Showing $1 for $2 by $3 in the $4",
        controls: getSectionControls(region, vars, usState),
      },
      selected: selected && selected[region],
      cardMetrics: [ vars.xVar, vars.yVar ],
    },
    scatterplot: {
      ...vars,
      selected: (selected && selected[region]) || [],
      hovered: hovered && 
        hovered.properties && 
        hovered.properties.id ?
          hovered.properties.id : '',
      highlightedState: usState,
      variant: 'ses',
      region,
      data,
    }
  })
} 

const mapDispatchToProps = 
  sectionMapDispatchToProps('socioeconomic')

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

