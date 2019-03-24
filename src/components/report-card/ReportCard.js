import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import { updateRoute } from '../../modules/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMetricLabels } from '../../modules/metrics';
import LocationStatsList from './LocationStatsList';
import { ReportCardSection } from './ReportCardSection';
import { metrics, demographics, gaps } from '../../constants/dataOptions';
import { getStateSelectOptions } from '../../constants/statesFips';
import { updateCurrentState, toggleHighlightState } from '../../actions/mapActions';


const getMetricControl = (metric, id = 'metric') => ({
  id,
  label: 'Data Metric',
  value: metric,
  options: metrics
})

const getDemographicControl = (
  demographic, 
  id = 'demographic', 
  label = 'Demographics'
) => ({
  id,
  label,
  value: demographic,
  options: demographics
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
  options: gaps
})

const ReportCard = ({
  locations, 
  metricLabels, 
  region, 
  highlight,
  selected,
  selectedColors,
  xVarSes, 
  yVarSes,
  data,
  onDemographicChange,
  onMetricChange,
  onHighlightChange,
  metricControl,
  demographicControl,
  highlightControl,
  opportunity,
  achievement,
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
          title='Socioeconomic Conditions'
          description='This section will show how the socioeconomic conditions compares to other areas. By default, it shows how average test scores correlate to socioeconomic status in the scatterplot. The scatterplot also allows the user to select any of the three key data metrics to see how they correlate to socioeconomic conditions.'
          data={data}
          region={region}
          highlight={highlight}
          selected={selected}
          selectedColors={selectedColors}
          xVar={xVarSes}
          yVar={yVarSes}
          zVar='sz'
          variant='ses'
          controls={[
            metricControl,
            demographicControl,
            highlightControl
          ]}
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
  { scatterplot: { data }, features, selected, metrics, map: { usState, highlightState }, report: { opportunity, achievement } },
  { match: { params: { demographic, region, metric } } }
) => {
  const highlightControl =
    getHighlightControl(highlightState && usState ? usState : 'none');
  return ({
    region,
    metric,
    data,
    yVarSes: demographic + '_' + metric,
    xVarSes: demographic + '_ses',
    metricControl: getMetricControl(metric),
    demographicControl: getDemographicControl(demographic),
    selected: selected && selected[region],
    selectedColors: selected.colors,
    highlightControl: highlightControl,
    highlight: highlightState && usState ? usState : 'none',
    opportunity: {
      ...opportunity,
      controls: [
        getMetricControl(opportunity.xVar.split('_')[1]),
        getDemographicControl(
          opportunity.xVar.split('_')[0], 
          'subgroupX',
          'Subgroup 1'
        ),
        getDemographicControl(
          opportunity.yVar.split('_')[0], 
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
          achievement.xVar.split('_')[0], 
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
      metrics, ['avg', 'grd', 'coh', 'ses', 'seg'], demographic
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