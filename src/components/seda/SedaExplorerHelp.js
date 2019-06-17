import React from 'react'
import TabPanel from '../organisms/TabPanel';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { getLang, populateContext } from '../../constants/lang';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import HelpAccordion from './SedaHelpAccordion';
import GradientLegend from '../molecules/GradientLegend';
import { getChoroplethColors, isGapDemographic } from '../../modules/config';

const colors = getChoroplethColors();


const HelpPanelContent = (props) => {
  const context = { ...props }
  const isGap = isGapDemographic(props.demographic)
  if (isGap) {
    context['demographic1'] = props['demographic'][1]
    context['demographic2'] = props['demographic'][0]
  }
  return (
    <div className="help-content">
      <div className="visual-help">

        {/* { (context.view === 'map' || context.view === 'split') &&
            <MapVisualLegend colors={colors} className={
              classNames(
                "visual-help__preview", 
                {"visual-help__preview--schools": context.region === 'schools'}
              )}
            />
        } */}
        { (context.view === 'chart' || context.view === 'split') &&
            <Typography paragraph={true}>
              {getLang('WT_CHART', populateContext(context))}
            </Typography>
        }
        { (context.view === 'chart' || context.view === 'split') &&
            <Typography>
              {getLang('WT_CHART_'+context.secondary, populateContext(context))}
            </Typography>
        }
                { (context.view === 'map' || context.view === 'split') &&
        <Typography paragraph={true}>
          {getLang('WT_MAP', populateContext({
            ...props, 
            region: context.region === 'schools' ? 
              'districts' : context.region 
            }
          ))}
        </Typography>
        }
        { (
            (context.viewport && context.viewport.zoom > 9) || 
            context.region === 'schools'
          ) &&
          <Typography paragraph={true}>
            {getLang('WT_MAP_ZOOMED', populateContext(props))}
          </Typography>
        }
        <div className="visual-help__legend">
          <GradientLegend vertical={true} />
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
                      'WT_' + context.metric + '_' + (isGap ? '' : 'NON') + 'GAP_HIGH_CONCEPT', 
                      populateContext(context, 'WT_CONTEXT_' + (isGap ? 'GAP_' : '') + context.metric)
                    )
                  }
                </span>
                <span>
                  {
                    getLang(
                      'WT_' + context.metric + '_' + (isGap ? '' : 'NON') + 'GAP_HIGH', 
                      populateContext(context, 'WT_CONTEXT_' + (isGap ? 'GAP_' : '') + context.metric)
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
                    'WT_' + context.metric + '_' + (isGap ? '' : 'NON') + 'GAP_MID', 
                    populateContext(context, 'WT_CONTEXT_' + (isGap ? 'GAP_' : '') + context.metric)
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
                      'WT_' + context.metric + '_' + (isGap ? '' : 'NON') + 'GAP_LOW_CONCEPT', 
                      populateContext(context, 'WT_CONTEXT_' + (isGap ? 'GAP_' : '') + context.metric)
                    )
                  }
                </span>
                <span>
                  {
                    getLang(
                      'WT_' + context.metric + '_' + (isGap ? '' : 'NON') + 'GAP_LOW', 
                      populateContext(context, 'WT_CONTEXT_' + (isGap ? 'GAP_' : '') + context.metric)
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
  )
}

const mapStateToProps = (
  { ui: { helpOpen, helpTab }, map: { viewport } },
  { match: { params: { region, demographic, metric, view }}}
) => ({
  open: helpOpen,
  value: helpTab,

  children: <HelpPanelContent
    {...{ viewport, tab: helpTab, region, demographic, metric, view, secondary: 'ses' }}
  />
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
)(TabPanel)
