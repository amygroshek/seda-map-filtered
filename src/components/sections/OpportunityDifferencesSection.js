import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getOpportunityControls } from '../../modules/controls';
import { getLang } from '../../constants/lang.js';
import ScatterplotSection from '../base/ScatterplotSection';
import { sectionMapDispatchToProps } from '../../actions/sectionActions';
import { getStateFipsFromAbbr, getStatePropByAbbr } from '../../constants/statesFips';
import { getCards } from '../../modules/sections';
import { getDemographicIdFromVarName, getDemographicFromVarName } from '../../modules/config';


const getScatterplotHeading = (vars, metric, region, highlightedState) => {
  const titleKey = 'OP_TITLE_' + metric.toUpperCase();
  const state = getStatePropByAbbr(highlightedState, 'full') || 'U.S.';
  const grades = metric === 'avg' ? 'for grades 3 - 8' :
    metric === 'grd' ? 'from grades 3 - 8' : 'from 2009 - 2016'
  return {
    title: getLang(titleKey, { 
      dem1: getDemographicFromVarName(vars.xVar).label,
      dem2: getDemographicFromVarName(vars.yVar).label
    }),
    subtitle:  state + ' ' +
      getLang('LABEL_' + region.toUpperCase()).toLowerCase() + ', ' + 
      ' ' + grades
  }
}

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
  const scatterVars = {
    xVar: [getDemographicIdFromVarName(vars.xVar), metric].join('_'),
    yVar: [getDemographicIdFromVarName(vars.yVar), metric].join('_'),
    zVar: vars.zVar,
  }
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
      ...scatterVars,
      heading: getScatterplotHeading(scatterVars, metric, region, highlightedState),
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

