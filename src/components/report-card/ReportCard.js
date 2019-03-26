import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LocationStatsList from './LocationStatsList';
import { getMetricLabels } from '../../modules/config';
import SocioeconomicConditions from './SocioeconomicConditions';
import OpportunityDifferences from './OpportunityDifferences';
import AchievementGaps from './AchievementGaps';

const ReportCard = ({
  locations, 
  metricLabels, 
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
        <SocioeconomicConditions />
        <OpportunityDifferences />
        <AchievementGaps />
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
  { features, selected },
  { match: { params: { demographic, region } } }
) => {
  return ({
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
  })
} 

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(ReportCard)