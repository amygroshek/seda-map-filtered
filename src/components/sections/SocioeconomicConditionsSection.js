import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSocioeconomicControls } from '../../modules/controls';
import { getLang } from '../../constants/lang.js';
import { sectionMapDispatchToProps } from '../../actions/sectionActions';
import ScatterplotSection from '../base/ScatterplotSection';
import { getStateFipsFromAbbr } from '../../constants/statesFips';
import { getCards } from '../../modules/sections';

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
        controls: getSocioeconomicControls(region, vars, highlightedState),
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
      selected: (selected && selected[region]) || [],
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

