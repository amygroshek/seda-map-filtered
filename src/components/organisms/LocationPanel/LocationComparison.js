import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import algoliasearch from 'algoliasearch';
import { getLang } from '../../../modules/lang';
import AccordionItem from '../../molecules/AccordionItem';
import LocationList from './LocationList';
import { Typography } from '@material-ui/core';
import { getSingularRegion } from '../../../modules/config';
import { getFeatureProperty } from '../../../modules/features';

var client = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_KEY);

const getDataForFeatureId = (index, id) =>
  index.search(id)
    .then((content) => 
      content.hits
        .filter((hit) => hit.id === id)
        .map((hit) => ({
          id: hit.id,
          properties: {
            id: hit.id,
            lat: hit.lat,
            lon: hit.lon,
            name: hit.name,
            state: hit.state_name,
            all_avg: 1.5,
            all_grd: 0.8,
            all_coh: 0.2,
            all_ses: -0.5
            // all_avg: hit.all_avg,
            // all_grd: hit.all_grd,
            // all_coh: hit.all_coh,
            // all_ses: hit.all_ses
          }
        }))[0]
    )

const getDataForFeatureIds = (ids, region) => {
  var index = client.initIndex(region);
  return Promise.all(
    ids.map(id => getDataForFeatureId(index, id))
  )
}

const SimilarLocations = ({
  feature,
  region,
}) => {
  const endpoint = process.env.REACT_APP_SIMILAR_ENDPOINT;
  const [ similar, setSimilar ] = useState(null);
  const featureId = getFeatureProperty(feature, 'id');
  
  useEffect(() => {
    const filename = featureId.substring(0, 2) + '.csv';
    const fetchData = async () => {
      const result = await axios(
        `${endpoint}${region}/${filename}`,
      );
      const matcher = new RegExp(`^${featureId},.*\n`, 'gm');
      const otherIds = result.data.match(matcher)[0]
        .slice(0,-1)
        .split(',')
        .filter(id => id !== featureId)
      const otherData =
        await getDataForFeatureIds(otherIds, region);
      setSimilar(otherData);
    };
    fetchData();
  }, [ featureId ]);
  return similar ? (
    <LocationList 
      feature={feature} 
      others={similar}
      showMarkers={false}
    />
  ) : <p>Loading...</p>
}

SimilarLocations.propTypes = {
  feature: PropTypes.object,
  region: PropTypes.string,
}

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
      { expanded &&
          <SimilarLocations
            feature={feature}
            region={region}
          />
      }
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
