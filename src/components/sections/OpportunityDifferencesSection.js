import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getOpportunityControls } from '../../modules/controls';
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
    sections: { opportunity: { hovered, vars }, active  } 
  },
  { match: { params: { region, metric, highlightedState } } }
) => {
  region = region === 'schools' ? 'districts' : region;
  return ({
    active: Boolean(loaded['map']),
    section: {
      id: 'opportunity',
      type: 'scatterplot',
      title: getLang('TITLE_OPP_' + metric.toUpperCase()),
      description: getLang('OPP_DIFF_DESCRIPTION'),
      headerMenu: {
        text: getLang('OPP_DIFF_CONTROL_TEXT'),
        controls: getOpportunityControls(region, vars, highlightedState)
      },
      cards: getCards({ 
        hovered,
        features,
        selected: selected[region] || [],
        metrics: [ vars.xVar, vars.yVar ]
      }),
    },
    scatterplot: {
      xVar: [getDemographicIdFromVarName(vars.xVar), metric].join('_'),
      yVar: [getDemographicIdFromVarName(vars.yVar), metric].join('_'),
      zVar: vars.zVar,
      hovered,
      region,
      data,
      highlightedState: getStateFipsFromAbbr(highlightedState),
      variant: 'opp',
      selected: selected && selected[region],
      freeze: active !== 'opportunity'
    }
  })
} 


const mapDispatchToProps = 
  sectionMapDispatchToProps('opportunity')

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

