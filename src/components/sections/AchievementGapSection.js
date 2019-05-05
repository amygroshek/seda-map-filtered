import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAchievementControls } from '../../modules/controls';
import { getLang } from '../../constants/lang.js';
import ScatterplotSection from '../base/ScatterplotSection';
import { sectionMapDispatchToProps } from '../../actions/sectionActions';
import { getStateFipsFromAbbr } from '../../constants/statesFips';
import { getCards } from '../../modules/sections';
import { getDemographicIdFromVarName } from '../../modules/config';


const mapStateToProps = (
  { 
    scatterplot: { data, loaded }, 
    selected,
    features,
    sections: { achievement: { hovered, vars }, active },
  },
  { match: { params: { region, metric, highlightedState } } }
) => {
  region = (region === 'schools' ? 'districts' : region);
  return ({
    active: Boolean(loaded['map']),
    section: {
      id: 'achievement',
      type: 'scatterplot',
      title: getLang('TITLE_ACH_' + metric.toUpperCase()),
      description: getLang('ACH_GAPS_DESCRIPTION'),
      headerMenu: {
        text: getLang('ACH_GAPS_CONTROL_TEXT'),
        controls: getAchievementControls(region, vars, highlightedState),
      },
      cards: getCards({ 
        hovered,
        features,
        selected: selected[region] || [],
        metrics: [ vars.xVar, vars.yVar ]
      }),
    },
    
    scatterplot: {
      xVar: vars.xVar,
      yVar: [getDemographicIdFromVarName(vars.yVar), metric].join('_'),
      zVar: vars.zVar,
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

