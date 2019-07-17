import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { getChoroplethColors, getMetricRange } from '../../../modules/config';
import LegendBar from '../../molecules/LegendBar';
import { getLang } from '../../../modules/lang';
import { getFeatureProperty } from '../../../modules/features';
import SedaScatterplotPreview from '../../seda/SedaScatterplotPreview';
import SedaLocationMarkers from '../../seda/SedaLocationMarkers';
import { Button } from '@material-ui/core';
import { getFormatterForMetric, formatNumber } from '../../../utils';

const choroplethColors = getChoroplethColors();

const LegendPanel = ({
  title,
  expanded,
  children,
  className,
  ...rest
}) => {
  return (
    <div className={classNames("legend-panel", className)} {...rest}>
      <div className="legend-panel__title">
        {title}
      </div>
      { expanded && 
        <div className="legend-panel__content">
          {children}
        </div> 
      }
    </div>
  )
}

LegendPanel.propTypes = {
  title: PropTypes.string,
  expanded: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node, PropTypes.string
  ]),
  className: PropTypes.string,
}

const MapLegend = ({
  metric,
  demographic,
  region,
  secondary,
  hovered,
  variant,
  onFullClick,
  onToggleClick,
  onHelpClick,
}) => {
  const values = [
    getFeatureProperty(hovered, `${demographic}_${metric}`),
    getFeatureProperty(hovered, `${demographic}_${secondary}`)
  ];
  const primaryValue = values[0] || values[0] === 0 ?
    formatNumber(values[0]) : null;
  const secondaryValue = values[1] || values[1] === 0 ?
    formatNumber(values[1]) : null;
  const yFormatter = getFormatterForMetric(metric);
  const xFormatter = getFormatterForMetric(secondary);
  return (
    <div className={classNames("map-legend", {
      "map-legend--secondary": secondaryValue || secondaryValue === 0
    })}>
      { variant === 'chart' &&
        <LegendPanel
          title={getLang(`label_${metric}`) + ' vs. ' + getLang(`label_${secondary}`)}
          expanded={true}
          className="legend-panel--chart"
        >
          <SedaScatterplotPreview>
            <SedaLocationMarkers />
            <LegendBar
              vertical={true}
              value={primaryValue}
              colors={choroplethColors} 
              startLabel={getLang('LEGEND_LOW')}
              endLabel={getLang('LEGEND_HIGH')}
              colorRange={getMetricRange(metric, demographic, region, 'map')}
              legendRange={getMetricRange(metric, demographic, region)}
              className="legend-bar--y-preview"
              formatter={yFormatter}
            />
            <LegendBar
              value={secondaryValue}
              colors={['#ccc', '#ccc']} 
              startLabel={getLang('LEGEND_LOW_'+secondary)}
              endLabel={getLang('LEGEND_HIGH_'+secondary)}
              legendRange={getMetricRange(secondary, demographic, region)}
              invert={secondary === 'frl'}
              className="legend-bar--x-preview"
              formatter={xFormatter}
            />
          </SedaScatterplotPreview>
        </LegendPanel>
      }
      { variant === 'condensed' &&
        <LegendPanel
          title={getLang('LABEL_'+metric)}
          expanded={true}
          className="legend-panel--condensed"
        >
          <LegendBar
            colors={choroplethColors} 
            value={primaryValue}
            startLabel={getLang('LEGEND_LOW_'+metric)}
            endLabel={getLang('LEGEND_HIGH_'+metric)}
            colorRange={getMetricRange(metric, demographic, region, 'map')}
            legendRange={getMetricRange(metric, demographic, region)}
          />
          <LegendBar 
            className="legend-bar--secondary"
            value={secondaryValue}
            title={getLang('LABEL_'+secondary)}
            colors={['#fff', '#fff']} 
            startLabel={getLang('LEGEND_LOW_'+secondary)}
            endLabel={getLang('LEGEND_HIGH_'+secondary)}
            colorRange={getMetricRange(secondary, demographic, region, 'map')}
            legendRange={getMetricRange(secondary, demographic, region, 'map')}
          />
        </LegendPanel>
      }
      
      <div className="legend-actions">
        <Button variant="contained" color="primary" onClick={onToggleClick}>
          { variant === 'chart' ? 'Hide Chart' : 'Show Chart' }
        </Button>
        {
          variant === 'chart' &&
            <Button variant="contained" color="primary" onClick={onFullClick}>
              Show Full Chart
            </Button>
        }
        <Button variant="contained" color="secondary" onClick={onHelpClick}>
          Help
        </Button>
      </div>
    </div>
  )
}

MapLegend.propTypes = {
  variant: PropTypes.string,
  metric: PropTypes.string,
  demographic: PropTypes.string,
  region: PropTypes.string,
  secondary: PropTypes.string,
  hovered: PropTypes.object,
  onFullClick: PropTypes.func,
  onToggleClick: PropTypes.func,
  onHelpClick: PropTypes.func,
}

export default MapLegend
