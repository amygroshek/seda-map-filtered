import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDemographicIdFromVarName, getRegionControl, getMetricControl, getDemographicControl, getHighlightControl, getMetricIdFromVarName } from '../../modules/config';

import LANG from '../../constants/lang.js';
import ScatterplotSection, { sectionMapDispatchToProps } from './ScatterplotSection';

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
    title: LANG['SES_COND_TITLE'],
    description: LANG['SES_COND_DESCRIPTION'],
    variant: 'ses',
    region,
    data,
    ready: Boolean(loaded['map']),
    selected: selected && selected[region],
    hovered: hovered && 
      hovered.properties && 
      hovered.properties.id ?
        hovered.properties.id : '',
    highlightedState: usState,
    ...vars,
    controlText: usState ?
      "Showing $1 for $2 by $3 in $4" :
      "Showing $1 for $2 by $3 in the $4",
    controls: [
      getMetricControl(
        getMetricIdFromVarName(vars.yVar)
      ),
      getDemographicControl(
        getDemographicIdFromVarName(vars.yVar)
      ),
      getRegionControl(region),
      getHighlightControl(usState)
    ],
  })
} 

const mapDispatchToProps = 
  sectionMapDispatchToProps('socioeconomic')

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

