import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Panel from '../molecules/Panel';
import HeaderTab from '../molecules/HeaderTab';
import { Typography } from '@material-ui/core';
import Accordion from './Accordion';
import { getRegionFromId } from '../../modules/config';
import { getStateName } from '../../constants/statesFips';
import { getLang } from '../../constants/lang';
import CompareFeatures, {LocationItem} from '../seda/SedaCompareFeatures';
import { onPinFeature } from '../../actions/mapActions';

const getHighLow = (value, metric) => {
  if (!value) { return 'NONE'; }
  switch (metric) {
    case 'avg':
      return value > 0.3 ? 'HIGH' : value < -0.3 ? 'LOW' : 'MID'
    case 'coh':
      return value > 0.1 ? 'HIGH' : value < -0.1 ? 'LOW' : 'MID'
    case 'grd':
      return value > 1.09 ? 'HIGH' : value < 0.91 ? 'LOW' : 'MID'
    default:
      return ''
  }
}

const FullSummaryCard = ({
  feature,
  others = [],
  metric,
  icon,
  onClose,
  onPinLocation,
}) => {
  const varName = 'all_'+metric;
  const [ expanded, setExpanded ] = useState(['s2']);
  const id = feature && feature.properties ? feature.properties.id : null;
  const name = feature && feature.properties ? feature.properties.name : null;
  const value = feature && feature.properties && feature.properties[varName]
  return (
    <Panel
      title={
        id && <HeaderTab
          icon={icon} 
          text={name}
          subtext={getStateName(id)}
        />
      }
      classes={{
        root: 'location-panel panel'
      }}
      onClose={onClose}
      open={Boolean(feature)}
    > 
      { id && <div className="location-summary__stats">
        
        <Typography paragraph={true}>
          {getLang('SUMMARY_'+metric+'_'+getHighLow(value, metric), { value: Math.abs(Math.round(value*100)/100), name })}
        </Typography>
        <LocationItem feature={feature} />
    </div> }
      { id && <Accordion
        expanded={expanded}
        onToggle={(itemId) => setExpanded(
          expanded.indexOf(itemId) > -1 ?
            expanded.filter(id => id !== itemId) :
            [ ...expanded, itemId ]
        )}
        items={[
          {
            id: 's2',
            heading: 'Compare ' + getRegionFromId(id),
            content: <CompareFeatures 
              feature={feature} 
              others={others}
              onPinFeature={(feature) =>
                onPinLocation(feature, getRegionFromId(id))
              }
            />
          },
          {
            id: 's1',
            heading: 'Similar ' + getRegionFromId(id),
            content: <div>
              {`The following places are similar to ${name} based on size, socioeconomic status, and other factors:`}
              <div style={{color:'#999', padding: 16}}>Feature not yet available</div>
            </div>
          },
          {
            id: 'export',
            heading: 'Export a Report',
            content: <div>
              {`Select one of the options below to export a PDF report or Powerpoint presentation about the educational opportunity in ${name}.`}
              <div style={{color:'#999', padding: 16}}>Feature not yet available</div>

            </div>
          },
          
      ]}
      />}
    </Panel>
  )
}

FullSummaryCard.propTypes = {
  feature: PropTypes.object,
  others: PropTypes.array,
  metric: PropTypes.object,
  icon: PropTypes.any,
  onClose: PropTypes.func,
  onPinLocation: PropTypes.func,
}

const mapStateToProps = (
  { active, selected, features },
  { match: { params: { region }}}
) => {
  return ({
    feature: active,
    others: (selected[region] || []).map(id => features[id])
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    onPinLocation: (feature, region) => {
      dispatch(onPinFeature(feature, region))
      dispatch({ type: 'CLEAR_ACTIVE_LOCATION' })
    }
  })
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(FullSummaryCard)
