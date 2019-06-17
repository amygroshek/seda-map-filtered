import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Typography } from '@material-ui/core';

import { getLang } from '../../constants/lang';
import { getColorForValue, getRegionFromId } from '../../modules/config';

const round = (num) => Math.round(num*10)/10

export const LocationItem = ({ feature: {properties }, ...props}) => {
  return (
    <div className="location-item" {...props}>
      <div className="location-item__name">
        {properties.name}
      </div>
      <div className="stats stats--horizontal">
        <div className={
          classNames("stats__item", {
            "stats__item--high": properties['all_avg'] > 0,
            "stats__item--low": properties['all_avg'] < 0
          })}
          style={{
            borderColor: getColorForValue(
              properties['all_avg'], 
              'all_avg', 
              getRegionFromId(properties.id)
            )
          }}
        >
          <span className="label stats__item-label">
            { getLang('LABEL_SHORT_AVG') }
          </span>
          <span className="stats__item-value">
            { round(properties['all_avg']) || (round(properties['all_avg']) === 0 ? 0 : 'N/A') }
          </span>
        </div>
        <div className={
          classNames("stats__item", {
            "stats__item--high": properties['all_avg'] > 1,
            "stats__item--low": properties['all_avg'] < 1
          })}
          style={{
            borderColor: getColorForValue(
              properties['all_grd'], 
              'all_grd', 
              getRegionFromId(properties.id)
            )
          }}
        >
          <span className="label stats__item-label">
            { getLang('LABEL_SHORT_GRD') }
          </span>
          <span className="stats__item-value">
            { round(properties['all_grd']) || 'N/A' }
          </span>
        </div>
        <div 
          className={
          classNames("stats__item", {
            "stats__item--high": properties['all_avg'] > 0,
            "stats__item--low": properties['all_avg'] < 0
          })}
          style={{
            borderColor: getColorForValue(
              properties['all_coh'], 
              'all_coh', 
              getRegionFromId(properties.id)
            )
          }}
        >
          <span className="label stats__item-label">
            { getLang('LABEL_SHORT_COH') }
          </span>
          <span className="stats__item-value">
          { round(properties['all_coh']) || (round(properties['all_coh']) === 0 ? 0 : 'N/A') }
          </span>
        </div>
      </div>
    </div>
    
  )
}

LocationItem.propTypes = {
  feature: PropTypes.object,
}

const CompareFeatures = ({feature, others = [], onPinFeature}) => {
  return (
    <div>
      { others.length < 2 && 
        <Typography paragraph={true}>
          Select another place from the map, chart, or  
          search to compare it with {feature.properties.name}
        </Typography>
      }
      {
        others.map((f,i) =>
          f.properties.id !== feature.properties.id && <LocationItem key={'f'+i} feature={f} />
        )
      }
      {/* <Typography paragraph={true}>
        Press the button below to save this location
        for future comparisons.
      </Typography> */}
      
      {/* <Button 
        className="button--panel" 
        variant="contained" 
        color="primary"
        onClick={(e) => { onPinFeature(feature)}}
      >
        <PinDropIcon className="icon icon--left" />
        Pin {feature.properties.name}
      </Button> */}
    </div>
  )
}

CompareFeatures.propTypes = {
  feature: PropTypes.object,
  others: PropTypes.array,
  onPinFeature: PropTypes.func,
}

export default CompareFeatures;


