import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRegionControl, getGapControl, getHighlightControl, getSecondaryMetricControl } from '../../modules/controls';
import { getDemographicIdFromVarName, getMetricIdFromVarName } from '../../modules/config';
import { getLang } from '../../constants/lang.js';
import ScatterplotSection from '../base/ScatterplotSection';
import { sectionMapDispatchToProps } from '../../actions/sectionActions';
import { getStateFipsFromAbbr } from '../../constants/statesFips';
import { getCards } from '../../modules/sections';

/**
 * Gets an array of controls for the section
 * @param {string} region 
 * @param {object} vars 
 * @param {string} highlightedState 
 */
const getSectionControls = (region, vars, highlightedState) => [
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
  getHighlightControl(highlightedState)
]

const mapStateToProps = (
  { 
    scatterplot: { data, loaded }, 
    selected,
    features,
    sections: { achievement: { hovered, vars }, active },
  },
  { match: { params: { region, highlightedState } } }
) => {
  region = (region === 'schools' ? 'districts' : region);
  return ({
    active: Boolean(loaded['map']),
    section: {
      id: 'achievement',
      type: 'scatterplot',
      title: getLang('ACH_GAPS_TITLE'),
      description: getLang('ACH_GAPS_DESCRIPTION'),
      headerMenu: {
        text: getLang('ACH_GAPS_CONTROL_TEXT'),
        controls: getSectionControls(region, vars, highlightedState),
      },
      cards: getCards({ 
        hovered,
        features,
        selected: selected[region] || [],
        metrics: [ vars.xVar, vars.yVar ]
      }),
    },
    
    scatterplot: {
      ...vars,
      hovered,
      region,
      data,
      selected: selected && selected[region],
      highlightedState: getStateFipsFromAbbr(highlightedState),
      variant: 'ach',
      freeze: (active !== 'achievement')
    }
  })
} 

const mapDispatchToProps = 
  sectionMapDispatchToProps('achievement')

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

