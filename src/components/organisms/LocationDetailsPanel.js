import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Panel from '../molecules/Panel';
import HeaderTab from '../molecules/HeaderTab';
import { Typography } from '@material-ui/core';
import { getRegionFromId, getHighLow } from '../../modules/config';
import { getStateName } from '../../constants/statesFips';
import { getLang } from '../../constants/lang';
import LocationItem from '../organisms/LocationItem';
import AccordionItem from '../molecules/AccordionItem';
import LocationList from './LocationList';

const LocationSummary = ({feature, summary}) => {
  return feature ? (
    <div className="location-summary__stats">
      <Typography paragraph={true}>{summary}</Typography>
      <LocationItem feature={feature} />
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
  const [ expanded, setExpanded ] = useState(['s2']);
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
      classes={{root: 'location-panel panel'}}
      onClose={onClose}
      open={Boolean(feature)}
    > 
      <LocationSummary
        feature={feature}
        summary={getLang(`SUMMARY_${metric}_${highLow}`, { value, name })}
      />
      <AccordionItem 
        id="compare" 
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
        heading={ getLang('LOCATION_SIMILAR_PLACES_TITLE', {region}) }
        onChange={toggleExpanded}
      >
        { getLang('LOCATION_SIMILAR_PLACES', { name }) }
        <div style={{color:'#999', padding: 16}}>Feature not yet available</div>
      </AccordionItem>
      <AccordionItem 
        id="opportunity" 
        heading={ getLang('LOCATION_DIFFERENCES_TITLE') }
        onChange={toggleExpanded}
      >
        { getLang('LOCATION_DIFFERENCES')}
        <div style={{color:'#999', padding: 16}}>Feature not yet available</div>
      </AccordionItem>
      <AccordionItem 
        id="export" 
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
