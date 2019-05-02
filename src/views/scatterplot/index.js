import { compose } from 'redux';
import { connect } from 'react-redux';
import { getRegionControl, getAllMetricsControl, getAllDemographicsControl } from '../../modules/controls';
import { getDemographicIdFromVarName, getMetricIdFromVarName } from '../../modules/config';
import ScatterplotSection from '../../components/base/ScatterplotSection';
import { getCardDispatchForSection, getScatterplotDispatchForSection } from '../../actions/sectionActions';
import { getCards } from '../../modules/sections';

/**
 * Gets an array of controls for the section
 * @param {string} region
 * @param {object} vars 
 * @param {string} highlightedState 
 */
const getSectionControls = (region, vars) => [
  getAllDemographicsControl(
    getDemographicIdFromVarName(vars.xVar),
    'subgroupX',
    'Demographic'
  ),
  getAllMetricsControl(
    getMetricIdFromVarName(vars.xVar),
    'metricX',
    'Metric'
  ),
  getAllDemographicsControl(
    getDemographicIdFromVarName(vars.yVar),
    'subgroupY',
    'Demographic'
  ),
  getAllMetricsControl(
    getMetricIdFromVarName(vars.yVar),
    'metricY',
    'Metric'
  ),
  getRegionControl(region)
]

const mapStateToProps = (
  { 
    scatterplot: { data }, 
    sections: { master: { hovered, vars, error }  } 
  }
) => {
  return ({
    active: true,
    section: {
      id: 'master',
      type: 'scatterplot',
      title: 'All Data Scatterplot',
      description: ' ',
      headerMenu: {
        text: 'X Axis: $[xMetric] $[xDem].  Y Axis: $[yMetric] $[yDem] Region: $[region]',
        controls: getSectionControls(vars.region, vars)
      },
      cards: getCards({ 
        hovered,
        features: {},
        selected: [],
        metrics: [ vars.xVar, vars.yVar ]
      }),
    },
    scatterplot: {
      ...vars,
      hovered,
      data,
      highlightedState: 'us',
      variant: 'master',
      freeze: Boolean(error),
      selected: [],
      error
    }
  })
}


const mapDispatchToProps = (dispatch) => ({
  ...getCardDispatchForSection(dispatch, 'map'),
  ...getScatterplotDispatchForSection(dispatch, 'map'),
  onOptionChange: (id, option) =>
    dispatch({
      type: 'SET_REPORT_VARS',
      sectionId: 'master',
      optionId: id,
      value: option.id
    })
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ScatterplotSection)

