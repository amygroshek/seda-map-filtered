import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Panel from '../../molecules/Panel';
import { getRegionFromFeatureId, getSelectedColors } from '../../../modules/config';
import { getLang } from '../../../modules/lang';
import AccordionItem from '../../molecules/AccordionItem';
import LocationComparison from './LocationComparison';
import { LocationStatDiverging } from './LocationStats';
import LocationItem from './LocationItem';
import LocationMetricDetails from './LocationMetricSumary';
import { Button, ButtonBase, Typography } from '@material-ui/core';

const SELECTED = getSelectedColors();

const LocationMetric = ({
  metric, 
  feature, 
  toggleExpanded, 
  onGapClick, 
  onHelpClick,
  expanded
}) => (
  <div>
    <LocationStatDiverging
      feature={feature}
      varName={'all_'+metric}
      label={getLang('LABEL_SHORT_'+metric)}
      showDescription={true}
      showLabels={true}
    />
    <ButtonBase
      className='button button--link'
      disableRipple={true}
      onClick={() => toggleExpanded('metric_'+metric)}
    >
      {
        expanded ?
          getLang('LOCATION_HIDE_'+metric) :
          getLang('LOCATION_SHOW_'+metric)
      }
    </ButtonBase>
    { expanded &&
      <LocationMetricDetails
        metric={metric}
        feature={feature}
        onGapClick={onGapClick}
        onHelpClick={onHelpClick}
      />
    }
  </div>
)

const LocationPanel = ({
  feature,
  metric,
  others = [],
  onClose,
  onGapClick,
  onHelpClick,
  onSelectFeature,
}) => {
  // track state for expanded / collapsed items
  const [ expanded, setExpanded ] = useState([]);
  // id of the location
  const id = feature && feature.properties ? feature.properties.id : null;
  // name of the location
  const name = feature && feature.properties ? feature.properties.name : null;
  const region = getRegionFromFeatureId(id)
  // handler to toggle expand on / off
  const toggleExpanded = (itemId) => setExpanded(
    expanded.indexOf(itemId) > -1 ?
      expanded.filter(id => id !== itemId) :
      [ ...expanded, itemId ]
  )
  const selectedIndex = feature && others.findIndex((f, i) =>
    f.properties.id === feature.properties.id
  )
  const markerColor = SELECTED[selectedIndex];
  return feature && feature.properties ? (
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
      <div className="panel-section panel-section--summary">
        <div className="panel-section__content">
          <LocationMetric 
            feature={feature}
            metric='avg'
            expanded={expanded.indexOf('metric_avg') > -1}
            onGapClick={onGapClick}
            onHelpClick={onHelpClick}
            toggleExpanded={toggleExpanded}
          />
          <LocationMetric 
            feature={feature}
            metric='grd'
            expanded={expanded.indexOf('metric_grd') > -1}
            onGapClick={onGapClick}
            onHelpClick={onHelpClick}
            toggleExpanded={toggleExpanded}
          />
          <LocationMetric 
            feature={feature}
            metric='coh'
            expanded={expanded.indexOf('metric_coh') > -1}
            onGapClick={onGapClick}
            onHelpClick={onHelpClick}
            toggleExpanded={toggleExpanded}
          />
          <LocationStatDiverging
            feature={feature}
            varName='all_ses'
            label={getLang('LABEL_SHORT_SES')}
            showDescription={true}
            showLabels={true}
          />
        </div>
      </div>
      <LocationComparison
        id="compare"
        feature={feature}
        markerColor={markerColor}
        name={name}
        region={region}
        others={others}
        expanded={expanded.indexOf('compare') > -1}
        onChange={toggleExpanded}
        onSelectFeature={onSelectFeature}
      />
      <AccordionItem 
        id="export" 
        expanded={expanded.indexOf('export') > -1}
        heading={ getLang('LOCATION_EXPORT_REPORT_TITLE') }
        onChange={toggleExpanded}
      >
        <Typography paragraph={true}>
          { getLang('LOCATION_EXPORT_REPORT', { name }) }
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => { alert('report unavailable') }}
        >{getLang('BUTTON_DOWNLOAD_REPORT')}</Button>
      </AccordionItem>
    </Panel>
  ) : null
}

LocationPanel.propTypes = {
  feature: PropTypes.object,
  others: PropTypes.array,
  metric: PropTypes.string,
  icon: PropTypes.any,
  onClose: PropTypes.func,
  onGapClick: PropTypes.func,
  onHelpClick: PropTypes.func,
  onSelectFeature: PropTypes.func,
}

export default LocationPanel
