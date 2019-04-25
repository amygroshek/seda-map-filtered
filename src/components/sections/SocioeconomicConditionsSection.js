import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDemographicIdFromVarName, getMetricIdFromVarName } from '../../modules/config';
import { getRegionControl, getMetricControl, getDemographicControl, getHighlightControl } from '../../modules/controls';
import { getLang } from '../../constants/lang.js';
import { sectionMapDispatchToProps } from '../../actions/sectionActions';
import ScatterplotSection from '../base/ScatterplotSection';
import { getStateFipsFromAbbr } from '../../constants/statesFips';
import { getCards } from '../../modules/sections';

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
    features,
    sections: { socioeconomic: { hovered, vars }, active } 
  },
  { match: { params: { region, highlightedState } } }
) => {
  region = (region === 'schools' ? 'districts' : region);
  return ({
    active: Boolean(loaded['map']),
    section: {
      id: 'socioeconomic',
      type: 'scatterplot',
      title: getLang('SES_COND_TITLE'),
      description: getLang('SES_COND_DESCRIPTION'),
      headerMenu: {
        text: getLang('SES_CONTROL_TEXT'),
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
      selected: (selected && selected[region]) || [],
      hovered: hovered && 
        hovered.properties && 
        hovered.properties.id ?
          hovered.properties.id : '',
      highlightedState: getStateFipsFromAbbr(highlightedState),
      variant: 'ses',
      region,
      data,
      freeze: (active !== 'socioeconomic')
    }
  })
} 

const mapDispatchToProps = 
  sectionMapDispatchToProps('socioeconomic')

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

