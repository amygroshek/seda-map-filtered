import React from 'react'
import TabPanel from '../organisms/TabPanel';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { getLang, populateContext } from '../../modules/lang';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import HelpAccordion from './SedaHelpAccordion';
import LegendBar from '../molecules/LegendBar';
import { getChoroplethColors, isGapDemographic } from '../../modules/config';
import MapVisualLegend from '../molecules/MapVisualLegend';

const colors = getChoroplethColors();

const SedaHelp = ({
  open,
  tab,
  viewport, 
  region, 
  demographic, 
  metric, 
  view, 
  secondary = 'ses',
  onClose,
  onTabChange,
}) => {
  const isGap = isGapDemographic(demographic)
  const context = {
    demographic1: isGap && demographic[1],
    demographic2: isGap && demographic[0],
    demographic,
    region, 
    metric,
    secondary
  }
  return (
    <TabPanel 
      open={open} 
      value={tab} 
      onClose={onClose} 
      onTabChange={onTabChange}
      classes={{root: 'panel--help'}}
    >
      <div className="help-content">
        <div className="visual-help">

          { (view === 'map' || view === 'split') &&
              <MapVisualLegend colors={colors} className={
                classNames(
                  "visual-help__preview", 
                  {"visual-help__preview--schools": context.region === 'schools'}
                )}
              />
          }
          { (view === 'chart' || view === 'split') &&
              <Typography paragraph={true}>
                {getLang('WT_CHART', populateContext(context))}
              </Typography>
          }
          { (view === 'chart' || view === 'split') &&
              <Typography>
                {getLang('WT_CHART_'+secondary, populateContext(context))}
              </Typography>
          }
          { (view === 'map' || view === 'split') &&
          <Typography paragraph={true}>
            {getLang('WT_MAP', populateContext({
              ...context, 
              region: region === 'schools' ? 
                'districts' : region 
              }
            ))}
          </Typography>
          }
          { (
              (viewport && viewport.zoom > 9) || 
              region === 'schools'
            ) &&
            <Typography paragraph={true}>
              {getLang('WT_MAP_ZOOMED', populateContext(context))}
            </Typography>
          }
          <div className="visual-help__legend">
            <LegendBar vertical={true} />
            <ul className={classNames("visual-help__list", "visual-help__list--" + context.view)}>
              <li className="visual-help__list-item">
                <span 
                  className="circle circle--dark"
                  style={{background: colors[6]}}
                >1</span>
                <div>
                  <span className="visual-help__legend-concept">
                    {
                      getLang(
                        'WT_' + metric + '_' + (isGap ? '' : 'NON') + 'GAP_HIGH_CONCEPT', 
                        populateContext(context, 'WT_CONTEXT_' + (isGap ? 'GAP_' : '') + metric)
                      )
                    }
                  </span>
                  <span>
                    {
                      getLang(
                        'WT_' + context.metric + '_' + (isGap ? '' : 'NON') + 'GAP_HIGH', 
                        populateContext(context, 'WT_CONTEXT_' + (isGap ? 'GAP_' : '') + metric)
                      )
                    }
                  </span>
                </div>
                
              </li>
              <li className="visual-help__list-item">
                <span 
                  className="circle"
                  style={{background: colors[3]}}
                >2</span>
                <span>
                  {
                    getLang(
                      'WT_' + metric + '_' + (isGap ? '' : 'NON') + 'GAP_MID', 
                      populateContext(context, 'WT_CONTEXT_' + (isGap ? 'GAP_' : '') + metric)
                    )
                  }
                </span>
              </li>
              <li className="visual-help__list-item">
                <span 
                  className="circle circle--dark"
                  style={{background: colors[0]}}
                >3</span>
                <div>
                  <span className="visual-help__legend-concept">
                    {
                      getLang(
                        'WT_' + metric + '_' + (isGap ? '' : 'NON') + 'GAP_LOW_CONCEPT', 
                        populateContext(context, 'WT_CONTEXT_' + (isGap ? 'GAP_' : '') + metric)
                      )
                    }
                  </span>
                  <span>
                    {
                      getLang(
                        'WT_' + metric + '_' + (isGap ? '' : 'NON') + 'GAP_LOW', 
                        populateContext(context, 'WT_CONTEXT_' + (isGap ? 'GAP_' : '') + metric)
                      )
                    }
                  </span>
                </div>
                
              </li>
            </ul>
          </div>
        </div>
        <HelpAccordion elevation={0} />
      </div>
    </TabPanel>
    
  )
}

const mapStateToProps = (
  { ui: { helpOpen, helpTab }, map: { viewport } },
  { match: { params: { region, demographic, metric, view }}}
) => ({
  open: helpOpen,
  tab: helpTab,
  viewport, 
  region, 
  demographic, 
  metric, 
  view, 
})

const mapDispatchToProps = (dispatch) => ({
  onTabChange: (e, value) => {
    dispatch({
      type: 'SET_HELP_TAB',
      tab: value
    })
  },
  onClose: () => {
    dispatch({
      type: 'TOGGLE_HELP',
      open: false
    })
  }  
})


export default compose(
  withRouter,
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )
)(SedaHelp)
