import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Panel from '../molecules/Panel';
import HeaderTab from '../molecules/HeaderTab';
import { Typography } from '@material-ui/core';
import { getRegionFromId, getHighLow, getColorForValue } from '../../modules/config';
import { getStateName } from '../../constants/statesFips';
import { getLang, getDescriptionForVarName } from '../../modules/lang';
import LocationItem from '../organisms/LocationItem';
import AccordionItem from '../molecules/AccordionItem';
import LocationList from './LocationList';
import StatSummary from './StatSummary';
import { getFeatureProperty } from '../../modules/features';
import { roundValue } from '../../utils';

const LocationStatSummary = ({ 
  feature, 
  metricId, 
  demographicId = 'all',
}) => {
  
  const region = getRegionFromId(feature.properties.id)
  const varName = [demographicId, metricId].join('_');
  const value = roundValue(getFeatureProperty(feature, varName));
  const color = getColorForValue(value, varName, region);
  const title = getLang('LABEL_' + metricId);
  const up = metricId === 'grd' ? (value > 1) : (value > 0);
  console.log(getFeatureProperty(feature, varName), value, varName)
  const formatter = metricId === 'grd' ?
    (val) => Math.round((val - 1) * 100) + '%': Math.abs
  const description = getDescriptionForVarName(varName, value, formatter);

  return (
    <StatSummary 
      {...{
        title, 
        color, 
        value, 
        description,
        formatter,
        direction: value ?
          (up ? 'up' : 'down') : null
      }}
    />
  )
}

const LocationSummary = ({feature}) => {
  const stats = [ 'avg', 'grd', 'coh', 'ses' ];
  return feature ? (
    <div className="location-summary__stats">
      {
        stats.map((metricId) => 
          <LocationStatSummary
            key={metricId}
            feature={feature}
            metricId={metricId}
          />
        )
      }
    </div>
  ) : (null)
}

LocationSummary.propTypes = {
  feature: PropTypes.object,
  summary: PropTypes.string,
}

const LocationDetailsPanel = ({
  feature,
  others = [],
  metric,
  icon,
  onClose,
}) => {
  // variable to highlight fo the location
  const varName = 'all_'+metric;
  // track state for expanded / collapsed items
  const [ expanded, setExpanded ] = useState(['compare']);
  // id of the location
  const id = feature && feature.properties ? feature.properties.id : null;
  // name of the location
  const name = feature && feature.properties ? feature.properties.name : null;
  // value for the provided varName
  const value = feature && feature.properties && 
    Math.abs(Math.round(feature.properties[varName]*100)/100)
  const region = getRegionFromId(id)
  // get if the value is above or below the midpoint threshold
  const highLow = getHighLow(value, metric)
  // handler to toggle expand on / off
  const toggleExpanded = (itemId) => setExpanded(
    expanded.indexOf(itemId) > -1 ?
      expanded.filter(id => id !== itemId) :
      [ ...expanded, itemId ]
  )
  return (
    <Panel
      title={
        id && <HeaderTab
          icon={icon} 
          text={name}
          subtext={getStateName(id)}
        />
      }
      classes={{root: 'panel--location'}}
      onClose={onClose}
      open={Boolean(feature)}
    > 
      <LocationSummary
        feature={feature}
        summary={getLang(`SUMMARY_${metric}_${highLow}`, { value, name })}
      />
      <AccordionItem 
        id="compare"
        expanded={expanded.indexOf('compare') > -1}
        heading={ getLang('LOCATION_COMPARE_FEATURES_TITLE', {region}) }
        onChange={toggleExpanded}
      >
        <LocationList 
          summary={
            others.length > 1 ? 
              null : getLang('LOCATION_COMPARE_FEATURES', { name })
          } 
          feature={feature} 
          others={others}
        />
      </AccordionItem>
      <AccordionItem 
        id="similar"
        expanded={expanded.indexOf('similar') > -1}
        heading={ getLang('LOCATION_SIMILAR_PLACES_TITLE', {region}) }
        onChange={toggleExpanded}
      >
        { getLang('LOCATION_SIMILAR_PLACES', { name }) }
        <div style={{color:'#999', padding: 16}}>Feature not yet available</div>
      </AccordionItem>
      <AccordionItem 
        id="opportunity" 
        expanded={expanded.indexOf('opportunity') > -1}
        heading={ getLang('LOCATION_DIFFERENCES_TITLE') }
        onChange={toggleExpanded}
      >
        { getLang('LOCATION_DIFFERENCES')}
        <div style={{color:'#999', padding: 16}}>Feature not yet available</div>
      </AccordionItem>
      <AccordionItem 
        id="export" 
        expanded={expanded.indexOf('export') > -1}
        heading={ getLang('LOCATION_EXPORT_REPORT_TITLE') }
        onChange={toggleExpanded}
      >
        { getLang('LOCATION_EXPORT_REPORT', { name }) }
        <div style={{color:'#999', padding: 16}}>Feature not yet available</div>
      </AccordionItem>
    </Panel>
  )
}

LocationDetailsPanel.propTypes = {
  feature: PropTypes.object,
  others: PropTypes.array,
  metric: PropTypes.string,
  icon: PropTypes.any,
  onClose: PropTypes.func,
}

export default LocationDetailsPanel
