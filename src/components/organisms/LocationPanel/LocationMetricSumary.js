import React from 'react'
import PropTypes from 'prop-types'
import { getLang } from '../../../modules/lang';
import { LocationStatList } from './LocationStats';
import { getMetricRange, getRegionFromFeatureId } from '../../../modules/config';
import { getFeatureProperty } from '../../../modules/features';
import { Typography, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Callout from '../../molecules/Callout';
import HelpIcon from '@material-ui/icons/Help'
import { formatNumber, formatPercentDiff } from '../../../utils';

const PanelButton = ({ langKey, ...rest }) => {
  return (
    <Button className='button--panel' fullWidth={true} {...rest}>
      {getLang(langKey)}
      <ChevronRightIcon />
    </Button>
  )
}

const LocationMetric = ({
  feature,
  metric,
  children,
  formatter,
  onGapClick,
  ...rest
}) => {
  if (!feature) { return null; }
  const region = getRegionFromFeatureId(feature.properties.id);
  const range = getMetricRange(metric, 'all', region, 'map')
  const statToLabel = (s) => getLang('LABEL_'+s.split('_')[0])
  return (
    <div 
      id={ "metric_" + metric }
      className="panel-section__metric-details"
      {...rest}
    >
      { children }
      <Typography className={"panel-section__subheading"} variant="h6">
        {getLang(
          'LABEL_BY_SUBGROUP', 
          { metric: getLang('LABEL_' + metric) }
        )}
      </Typography>
      <LocationStatList
        feature={feature}
        varNames={['np', 'p'].map(d => d+'_'+metric)}
        range={range}
        formatter={formatter}
        varNameToLabel={statToLabel}
      />
      <PanelButton langKey='BUTTON_GAP_PN' onClick={() => onGapClick('pn', metric)} />
      <LocationStatList
        feature={feature}
        varNames={['w', 'b', 'h', 'a'].map(d => d+'_'+metric)}
        range={range}
        formatter={formatter}
        varNameToLabel={statToLabel}
      />
      <PanelButton langKey='BUTTON_GAP_WB' onClick={() => onGapClick('wb', metric)} />
      <PanelButton langKey='BUTTON_GAP_WH' onClick={() => onGapClick('wh', metric)} />
      <LocationStatList
        feature={feature}
        varNames={['m', 'f'].map(d => d+'_'+metric)}
        range={range}
        formatter={formatter}
        varNameToLabel={statToLabel}
      />
      <PanelButton langKey='BUTTON_GAP_MF' onClick={() => onGapClick('mf', metric)} />
    </div>
  )
}

LocationMetric.propTypes = {
  feature: PropTypes.object.isRequired,
  metric: PropTypes.string.isRequired,
  children: PropTypes.node,
}

const valueToLowMidHigh = (metricId, value) => {
  if (!value && value !== 0) { return 'NONE'; }
  return metricId === 'grd' ?
    (value > 1 ? 'HIGH' : (value < 1 ? 'LOW' : 'MID')) :
    (value > 0 ? 'HIGH' : (value < 0 ? 'LOW' : 'MID')) 
}

const avgSesDiffToLowMidHigh = (avg, ses) => {
  if (!avg && avg !== 0) { return 'NONE'; }
  if (!ses && ses !== 0) { return 'NONE'; }
  const v1 = valueToLowMidHigh('avg', avg);
  const v2 = valueToLowMidHigh('ses', ses);
  if (v1 === v2) { return 'MID' }
  if (v1 === 'HIGH') { return 'HIGH' }
  if (v1 === 'LOW') { return 'LOW' }
  if (v2 === 'HIGH') { return 'LOW' }
  if (v2 === 'LOW') { return 'HIGH' }
  return 'NONE';
}

const MetricSummary = ({metric, demographic = 'all', name, value}) => {
  const langKey = 'SUMMARY_' + metric + '_' + valueToLowMidHigh(metric, value);
  return (
    <Typography variant="body1" paragraph={true} 
      dangerouslySetInnerHTML={{'__html': getLang(langKey, { name, value })}}>
    </Typography>
  )
}

export const LocationAvgSection = ({feature, ...rest}) => {
  if (!feature) { return null }
  const name = getFeatureProperty(feature, 'name');
  const avgValue = getFeatureProperty(feature, 'all_avg');
  const sesValue = getFeatureProperty(feature, 'all_ses');

  const diffHighLow = avgSesDiffToLowMidHigh(avgValue, sesValue);
  const sesLangKey = 'SUMMARY_AVGSES_' + diffHighLow; 
  return (
    <LocationMetric
      metric="avg"
      feature={feature}
      {...rest}
    >
      <MetricSummary metric='avg' name={name} value={formatNumber(avgValue)} />
      <Callout
        type="help"
        size="small"
        icon={<HelpIcon />}
      >{ getLang('CALLOUT_AVG_OPP') }</Callout>
      <Typography 
        variant="body1" 
        paragraph={true} 
        dangerouslySetInnerHTML={{'__html': getLang(sesLangKey, { name })}}
      />
      <Callout
        type="help"
        size="small"
        icon={<HelpIcon />}
      >{ getLang('CALLOUT_AVG_SES') }</Callout>
      
    </LocationMetric>
  )
}

export const LocationGrdSection = ({feature, ...rest}) => {
  if (!feature) { return null }
  const name = getFeatureProperty(feature, 'name');
  const value = getFeatureProperty(feature, 'all_grd');
  return (
    <LocationMetric
      metric="grd"
      feature={feature}
      formatter={formatPercentDiff}
      {...rest}
    >
      <MetricSummary metric='grd' name={name} value={formatPercentDiff(value)} />
      <Callout
        type="help"
        size="small"
        icon={<HelpIcon />}
      >{ getLang('CALLOUT_GRD') }</Callout>
    </LocationMetric>
  )
}

export const LocationCohSection = ({feature, ...rest}) => {
  if (!feature) { return null }
  const name = getFeatureProperty(feature, 'name');
  const value = getFeatureProperty(feature, 'all_coh');
  return (
    <LocationMetric
      metric="coh"
      feature={feature}
      {...rest}
    >
      <MetricSummary metric='coh' name={name} value={formatNumber(value)} />
      <Callout
        type="help"
        size="small"
        icon={<HelpIcon />}
      >{ getLang('CALLOUT_COH') }</Callout>
    </LocationMetric>
  )
}

const LocationMetricDetails = ({metric, ...props}) => {
  switch (metric) {
    case 'avg':
      return <LocationAvgSection {...props} />
    case 'grd':
      return <LocationGrdSection {...props} />
    case 'coh':
      return <LocationCohSection {...props} />
    default:
      return null;
  }
}

export default LocationMetricDetails
