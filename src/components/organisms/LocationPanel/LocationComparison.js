import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import algoliasearch from 'algoliasearch';
import { getLang } from '../../../modules/lang';
import AccordionItem from '../../molecules/AccordionItem';
import LocationList from './LocationList';
import { Typography, Button } from '@material-ui/core';
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
          stub: true, // flags that this is not a full feature
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
  name,
  markerColor,
  onSelectFeature
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
    <>
      <Typography>
        { getLang('LOCATION_SIMILAR_PLACES', { name }) }
      </Typography>
      <LocationList
        className="location-list--similar"
        feature={feature} 
        others={similar}
        showMarkers={false}
        markerColor={markerColor}
        onSelectFeature={onSelectFeature}
      />
    </>
  ) : <p>Loading...</p>
}

SimilarLocations.propTypes = {
  feature: PropTypes.object,
  region: PropTypes.string,
  name: PropTypes.string,
  markerColor: PropTypes.string,
  onSelectFeature: PropTypes.func,
}

const LocationComparison = ({
  id,
  region,
  markerColor,
  name,
  feature,
  others,
  expanded,
  onChange,
  onSelectFeature,
  onShowSimilar
}) => {
  const [ showSimilar, setShowSimilar ] = useState(false);
  // hide similar location when switching locations
  useEffect(() => setShowSimilar(false), [ name ]);
  return (
    <AccordionItem 
      id={id}
      expanded={expanded}
      heading={ getLang('LOCATION_COMPARE_FEATURES_TITLE', {region: getSingularRegion(region)}) }
      onChange={onChange}
      className="panel-section"
    >
      {
        others.length < 2 && 
          <Typography paragraph={true}>
            {getLang('LOCATION_COMPARE_FEATURES_NONE', { name })}
          </Typography>
      }
      { others.length > 1 &&
          <Typography>
            {getLang('LOCATION_COMPARE_FEATURES', { name })}
          </Typography>
      }
      <LocationList
        className="location-list--comparison"
        markerColor={markerColor}
        feature={feature} 
        others={others}
        onSelectFeature={onSelectFeature}
      />
      {
        !showSimilar &&
        <Typography paragraph={true}>
          { getLang('LOCATION_SIMILAR_PLACES_SUMMARY', {name}) }
        </Typography>
      }
      { showSimilar ? (
          <SimilarLocations
            feature={feature}
            region={region}
            name={name}
            markerColor={markerColor}
            onSelectFeature={onSelectFeature}
          />
        ) : (
          <Button 
            onClick={() => setShowSimilar(true) && onShowSimilar(feature)}
            variant="contained"
            color="primary"
          >{ getLang('LOCATION_SIMILAR_SHOW') }</Button>
        )
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
  onChange: PropTypes.func,
  onSelectFeature: PropTypes.func,
  onShowSimilar: PropTypes.func,
  markerColor: PropTypes.string,
}

export default LocationComparison
