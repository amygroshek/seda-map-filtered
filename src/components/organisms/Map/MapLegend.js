import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { getScatterplotVars, getMapVars, isVersusFromVarNames } from '../../../modules/config';
import SedaScatterplotPreview from '../../seda/SedaScatterplotPreview';
import SedaLocationMarkers from '../../seda/SedaLocationMarkers';
import { Button } from '@material-ui/core';
import ScatterplotAxis from '../Scatterplot/ScatterplotAxis';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles';

const LegendPanel = ({
  title,
  expanded,
  children,
  className,
  ...rest
}) => {

  return (
    <div className={classNames("legend-panel", className)} {...rest}>
      { title &&
        <div className="legend-panel__title">
          {title}
        </div>
      }
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
  helpOpen = false,
  secondary,
  view = 'map',
  hovered,
  variant,
  onFullClick,
  onToggleClick,
  onHelpClick,
  classes = {}
}) => {
  const vars = getScatterplotVars(region, metric, demographic);
  const mapVars = getMapVars(region, metric, demographic);
  const theme = useTheme();
  const isAboveMedium = useMediaQuery(theme.breakpoints.up('md'));
  // force condensed for split view and small viewports
  variant = (view === 'split' || !isAboveMedium) ? 'condensed' : variant;
  const isVersus = isVersusFromVarNames(vars.xVar, vars.yVar);
  return (
    <div className={classNames(
      "map-legend", 
      classes.root, 
      { "map-legend--split-view": view === 'split' }
    )}>
      { variant === 'chart' &&
        <LegendPanel
          expanded={true}
          className={classNames(
            "legend-panel--chart",
            { "legend-panel--versus": isVersus }
          )}
        >
          <SedaScatterplotPreview>
            <SedaLocationMarkers {...{...vars}} />
            <ScatterplotAxis
              axis='y'
              varName={vars.yVar}
              hovered={hovered}
              region={region}
              className='legend-bar--y-preview'
              labelPrefix='LEGEND_SHORT_'
            />
            <ScatterplotAxis
              axis='x'
              varName={vars.xVar}
              hovered={hovered}
              region={region}
              labelPrefix='LEGEND_SHORT_'
              className='legend-bar--x-preview'
            />
          </SedaScatterplotPreview>
        </LegendPanel>
      }
      { (variant === 'condensed' || isVersus) &&
        <LegendPanel
          expanded={true}
          className="legend-panel--condensed"
        >
          <ScatterplotAxis
            axis='x'
            varName={mapVars.yVar}
            hovered={hovered}
            region={region}
          />
          {/* { !isVersus &&
            <ScatterplotAxis
              axis='x'
              varName={mapVars.xVar}
              hovered={hovered}
              region={region}
              className='legend-bar--secondary'
            />
          } */}
        </LegendPanel>
      }
      { view === 'map' && isAboveMedium &&
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
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => onHelpClick(helpOpen)}
          >
            Help
          </Button>
        </div>
      }
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
  classes: PropTypes.object,
  onFullClick: PropTypes.func,
  onToggleClick: PropTypes.func,
  onHelpClick: PropTypes.func,
}

export default MapLegend
