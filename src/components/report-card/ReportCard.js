import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import { updateRoute } from '../../modules/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LocationStatsList from './LocationStatsList';
import { ReportCardSection } from './ReportCardSection';
import { getStateSelectOptions } from '../../constants/statesFips';
import { updateCurrentState, toggleHighlightState } from '../../actions/mapActions';
import { getMetrics, getDemographics, getGaps, getMetricById, getMetricLabels, getDemographicIdFromVarName, getMetricIdFromVarName } from '../../modules/config';


const getMetricControl = (metric, id = 'metric') => ({
  id,
  label: 'Data Metric',
  value: metric,
  options: getMetrics()
})

const getDemographicControl = (
  demographic, 
  id = 'demographic', 
  label = 'Demographics'
) => ({
  id,
  label,
  value: demographic,
  options: getDemographics()
})

const getHighlightControl = (highlight) => ({
  id: 'highlight',
  label: 'Highlight',
  value: highlight ? highlight : 'none',
  options: [
    {
      id: 'none',
      label: 'None'
    },
    ...getStateSelectOptions()
  ]
})

const getGapControl = (gap) => ({
  id: 'gap',
  label: 'Gap Type',
  value: gap,
  options: getGaps()
})

const ReportCard = ({
  locations, 
  metricLabels, 
  region, 
  highlight,
  selected,
  selectedColors,
  data,
  onDemographicChange,
  onMetricChange,
  onHighlightChange,
  opportunity,
  achievement,
  socioeconomic,
  onOptionChange
}) => {
  return (
    <div className="report-card">
      <div className="report-card__body">
        <div className="report-card-section">
          <Typography classes={{root: "report-card-section__heading" }}>
            Selected Locations
          </Typography>
          <div className="report-card-section__body">
            { 
              Boolean(locations.length) && <LocationStatsList
                locations={locations}
                stats={metricLabels}
              />
            }
            { Boolean(!locations.length) && <Typography variant="body2">No locations selected. Select a location through the scatterplots, map, or search</Typography>}
          </div>
        </div>
        <ReportCardSection 
          {...socioeconomic}
          title='Socioeconomic Conditions'
          description='This section will show how the socioeconomic conditions compares to other areas. By default, it shows how average test scores correlate to socioeconomic status in the scatterplot. The scatterplot also allows the user to select any of the three key data metrics to see how they correlate to socioeconomic conditions.'
          data={data}
          region={region}
          highlight={highlight}
          selected={selected}
          selectedColors={selectedColors}
          variant='ses'
          onOptionChange={(option) => {
            switch(option.id) {
              case 'metric':
                return onMetricChange(option.value)
              case 'demographic':
                return onDemographicChange(option.value)
              case 'highlight':
                return onHighlightChange(option.value)
              default:
                return false
            }
          }}
        />
        <ReportCardSection 
          {...opportunity}
          title='Opportunity Differences'
          description='This section will show how opportunity differs among subgroups. By default, it will show achievement compared between poor and non-poor students. The scatterplot also allows the user to select any of the three key data metrics along with a list of subgroups to compare.'
          data={data}
          region={region}
          highlight={highlight}
          selected={selected}
          selectedColors={selectedColors}
          variant='opp'
          onOptionChange={(option) => {
            option.id === 'highlight' ?
              onHighlightChange(option.value) :
              onOptionChange('opportunity', option)
          }}
        />
        <ReportCardSection 
          {...achievement}
          title='Achievement Gaps'
          description='This section will show how achievement gaps are associated with other variables like socioeconomic status or segregation. By default, it shows white / black achievement gap by white / black socioeconomic status gap. The scatterplot also allows the user to select the type of achievement gap and comparison variable.'
          data={data}
          region={region}
          highlight={highlight}
          selected={selected}
          selectedColors={selectedColors}
          zVar='sz'
          variant='ach'
          onOptionChange={(option) => {
            option.id === 'highlight' ?
              onHighlightChange(option.value) :
              onOptionChange('achievement', option)
          }}
        />
      </div>
    </div>
  )
}

ReportCard.propTypes = {
  locations: PropTypes.array,
  demographic: PropTypes.string, 
  onDemographicChange: PropTypes.func,
  metricLabels: PropTypes.object
}

const mapStateToProps = (
  { scatterplot: { data }, features, selected, map: { usState, highlightState }, report: { opportunity, achievement } },
  { match: { params: { demographic, region, metric } } }
) => {
  const highlightControl =
    getHighlightControl(highlightState && usState ? usState : 'none');
  return ({
    region,
    metric: getMetricById(metric),
    data,
    selected: selected && selected[region],
    selectedColors: selected.colors,
    highlightControl: highlightControl,
    highlight: highlightState && usState ? usState : 'none',
    socioeconomic: {
      xVar: demographic + '_ses',
      yVar: demographic + '_' + metric,
      zVar: 'sz',
      controls: [
        getMetricControl(metric),
        getDemographicControl(demographic),
        highlightControl
      ]
    },
    opportunity: {
      ...opportunity,
      controls: [
        getMetricControl(
          getMetricIdFromVarName(opportunity.xVar)
        ),
        getDemographicControl(
          getDemographicIdFromVarName(opportunity.xVar),
          'subgroupX',
          'Subgroup 1'
        ),
        getDemographicControl(
          getDemographicIdFromVarName(opportunity.yVar), 
          'subgroupY',
          'Subgroup 2'
        ),
        highlightControl
      ]
    },
    achievement: {
      ...achievement,
      controls: [
        getGapControl(
          getDemographicIdFromVarName(achievement.xVar), 
          'gap',
          'Achievement Gap'
        ),
        highlightControl
      ]
    },
    locations: selected[region]
      .map(l => 
        features[l] && features[l].properties ? 
          features[l].properties : null
      )
      .filter(l => l)
    ,
    metricLabels: getMetricLabels(
      ['avg', 'grd', 'coh', 'ses', 'seg'], demographic
    ),
    demographic
  })
} 


const mapDispatchToProps = (dispatch, ownProps) => ({
  onOptionChange: (section, option) => 
    dispatch({
      type: 'SET_REPORT_OPTION',
      section,
      ...option
    }),
  onDemographicChange: (value) => 
    updateRoute(ownProps, { demographic: value }),
  onMetricChange: (value) =>
    updateRoute(ownProps, { metric: value }),
  onHighlightChange: (value) => {
    if (value === 'none') {
      dispatch(toggleHighlightState(false))
      dispatch(updateCurrentState(null))
    } else {
      dispatch(toggleHighlightState(true))
      dispatch(updateCurrentState(value))
    }
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ReportCard)