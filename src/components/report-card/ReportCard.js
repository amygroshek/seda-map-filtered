import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import { updateRoute } from '../../modules/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMetricLabels } from '../../modules/metrics';
import LocationStatsList from './LocationStatsList';
import { SocioeconomicConditions } from './SocioeconomicConditions';
import { metrics, demographics } from '../../constants/dataOptions';
import { getStateSelectOptions } from '../../constants/statesFips';
import { updateCurrentState, toggleHighlightState } from '../../actions/mapActions';


const controls = {
  'ses' : (metric, demographic, highlight) => 
    [
      {
        id: 'metric',
        label: 'Data Metric',
        value: metric,
        options: metrics
      },
      {
        id: 'demographic',
        label: 'Demographic',
        value: demographic,
        options: demographics
      },
      {
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
      }
    ]
};

const ReportCard = ({
  locations, 
  metricLabels, 
  region, 
  highlight, 
  xVarSes, 
  yVarSes,
  controlsSes,
  onDemographicChange,
  onMetricChange,
  onHighlightChange
}) => {
  return (
    <div className="report-card">
      <div className="report-card__body">
        <div className="report-card-section">
          <div className="report-card-section__body">
            { 
              locations && <LocationStatsList
                locations={locations}
                stats={metricLabels}
              />
            }
          </div>
        </div>
        <SocioeconomicConditions 
          region={region}
          highlight={highlight}
          xVar={xVarSes}
          yVar={yVarSes}
          zVar='sz'
          controls={controlsSes}
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
        {/* <div className="report-card-section">
          <Typography classes={{root: "report-card-section__heading" }}>
            Opportunity Differences
          </Typography>
          <div className="report-card-section__body">
            <Typography variant="body2">
              This section will show how opportunity differs among subgroups. By default, it will show achievement compared between poor and non-poor students. The scatterplot also allows the user to select any of the three key data metrics along with a list of subgroups to compare.
            </Typography>
            <DynamicScatterplot 
              xVar='np_avg'
              yVar='p_avg'
              zVar='sz'
              highlight='largest'
              region={region}
            />
          </div>
        </div>
        <div className="report-card-section">
          <Typography classes={{root: "report-card-section__heading" }}>
            Achievement Gaps
          </Typography>
          <div className="report-card-section__body">
            <Typography variant="body2">
              This section will show how achievement gaps are associated with other variables like socioeconomic status or segregation. By default, it shows white / black achievement gap by white / black socioeconomic status gap. The scatterplot also allows the user to select the type of achievement gap and comparison variable. 
            </Typography>
            <DynamicScatterplot 
              xVar='wb_ses'
              yVar='wb_avg'
              zVar='sz'
              xVars={[{
                id: 'wb_ses',
                label: 'Socioeconomic Status'
              }, {
                id: 'wb_seg',
                label: 'Segregation'
              }]}
              highlight='largest'
              region={region}
            />
          </div>
        </div> */}
        <div className="report-card-section">
          <Typography classes={{root: "report-card-section__heading" }}>
            Similar Places
          </Typography>
          <div className="report-card-section__body">
            <Typography variant="body2">
              This section will show similar places based on size, socioeconomic status, and racial composition.
            </Typography>
          </div>
        </div>
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
  { features, selected, metrics, map: { usState, highlightState } },
  { match: { params: { demographic, region, metric } } }
) => ({
  region,
  metric,
  yVarSes: demographic + '_' + metric,
  xVarSes: demographic + '_ses',
  controlsSes: controls['ses'](
    metric, 
    demographic, 
    highlightState && usState ? usState : 'none'
  ),
  highlight: highlightState && usState ? usState : 'none',
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

const mapDispatchToProps = (dispatch, ownProps) => ({
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