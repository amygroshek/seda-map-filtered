import React from 'react'
import PropTypes from 'prop-types'
import { getLang } from '../../../modules/lang';
import AccordionItem from '../../molecules/AccordionItem';
import LocationList from './LocationList';
import { Typography } from '@material-ui/core';
import { getSingularRegion } from '../../../modules/config';

const LocationComparison = ({
  id,
  region,
  name,
  feature,
  others,
  expanded,
  onChange
}) => {
  return (
    <AccordionItem 
      id={id}
      expanded={expanded}
      heading={ getLang('LOCATION_COMPARE_FEATURES_TITLE', {region: getSingularRegion(region)}) }
      onChange={onChange}
      className="panel-section"
    >
      {
        others.length < 1 &&
          <Typography>
            {getLang('LOCATION_COMPARE_FEATURES', { name })}
          </Typography>
      }
      <LocationList 
        feature={feature} 
        others={others}
      />
      <Typography>
        { getLang('LOCATION_SIMILAR_PLACES', { name }) }
      </Typography>
      <div style={{color:'#999', padding: 16}}>Feature not yet available</div>
    </AccordionItem>
  )
}

LocationComparison.propTypes = {
  id: PropTypes.string,
  region: PropTypes.string,
  name: PropTypes.string,
  feature: PropTypes.object,
  others: PropTypes.array,
  expanded: PropTypes.bool,
  onChange: PropTypes.func
}

export default LocationComparison
