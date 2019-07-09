import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Panel from '../../molecules/Panel';
import { getRegionFromId } from '../../../modules/config';
import { getLang } from '../../../modules/lang';
import AccordionItem from '../../molecules/AccordionItem';
import LocationComparison from './LocationComparison';
import LocationSummary from './LocationSummary';
import LocationItem from './LocationItem';

const LocationPanel = ({
  feature,
  others = [],
  onClose,
}) => {
  // track state for expanded / collapsed items
  const [ expanded, setExpanded ] = useState(['compare']);
  // id of the location
  const id = feature && feature.properties ? feature.properties.id : null;
  // name of the location
  const name = feature && feature.properties ? feature.properties.name : null;
  const region = getRegionFromId(id)
  // handler to toggle expand on / off
  const toggleExpanded = (itemId) => setExpanded(
    expanded.indexOf(itemId) > -1 ?
      expanded.filter(id => id !== itemId) :
      [ ...expanded, itemId ]
  )
  const selectedIndex = feature && others.findIndex((f, i) =>
    f.properties.id === feature.properties.id
  )
  return (
    <Panel
      title={
        id && <LocationItem
          idx={selectedIndex}
          feature={feature}
        />
      }
      classes={{root: 'panel--location'}}
      onClose={onClose}
      open={Boolean(feature)}
    > 
      <LocationSummary feature={feature}  />
      <LocationComparison
        id="compare"
        feature={feature}
        name={name}
        region={region}
        others={others}
        expanded={expanded.indexOf('compare') > -1}
        onChange={toggleExpanded}
      />
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

LocationPanel.propTypes = {
  feature: PropTypes.object,
  others: PropTypes.array,
  metric: PropTypes.string,
  icon: PropTypes.any,
  onClose: PropTypes.func,
}

export default LocationPanel
