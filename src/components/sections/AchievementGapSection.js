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
    report: { achievement },
    hovered: { feature }
  },
  { match: { params: { region } } }
) => {
  return ({
    title: LANG['ACH_GAPS_TITLE'],
    description: LANG['ACH_GAPS_DESCRIPTION'],
    variant: 'ach',
    region,
    data,
    ready: Boolean(loaded['map']),
    selected: selected && selected[region],
    hovered: feature && 
      feature.properties && 
      feature.properties.id ?
        feature.properties.id : '',
    highlightedState: usState,
    ...achievement,
    controlText: 'Showing the $1 of $2 vs. average test scores by $3 in $4',
    controls: [
      getGapControl(
        getDemographicIdFromVarName(achievement.xVar), 
        'gap',
        'Achievement Gap'
      ),
      getSecondaryMetricControl(
        getMetricIdFromVarName(achievement.xVar),
        'secondary'
      ),
      getRegionControl(region),
      getHighlightControl(usState)
    ],
  })
} 

const mapDispatchToProps = 
  sectionMapDispatchToProps('achievement')

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

