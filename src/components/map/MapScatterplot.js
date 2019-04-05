import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { getMetricById, getChoroplethColors } from '../../modules/config';
import { onHoverFeature, onViewportChange } from '../../actions/mapActions';
import { loadLocation } from '../../actions/featuresActions';
import { underscoreCombine } from '../../utils/index'
import * as scatterplotStyle from '../../style/scatterplot-style';
import { onScatterplotData, onScatterplotLoaded } from '../../actions/scatterplotActions';
import { getStateName } from '../../constants/statesFips';
import { getDemographicById } from '../../modules/config';
import DynamicScatterplot from '../base/DynamicScatterplot';
import { getMetricTooltip } from '../../modules/config';


export class MapScatterplot extends Component {
  static propTypes = {
    region: PropTypes.string,
    demographic: PropTypes.object,
    yVar: PropTypes.string,
    xVar: PropTypes.string,
    zVar: PropTypes.string,
    colors: PropTypes.array,
    yMetric: PropTypes.object,
    hoveredId: PropTypes.string,
    selected: PropTypes.array,
    highlightedState: PropTypes.string,
    highlightOn: PropTypes.bool,
    data: PropTypes.object,
    onHoverFeature: PropTypes.func,
    updateMapViewport: PropTypes.func,
    onSelectLocation: PropTypes.func,
    onMouseMove: PropTypes.func,
    onData: PropTypes.func,
    onError: PropTypes.func,
    activeState: PropTypes.string,
    onLoaded: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.loaded = false;
    this.state = {
      baseScatterplot: null,
      restore: false,
    }
  }

  /**
   * Gets the configuration overrides for the base scatterplot
   */
  _getOverrides() {
    const { yMetric, highlightOn, data, region } = this.props;
    const xMetric = getMetricById('ses');
    const hlIndex = highlightOn ? 2 : 0;
    const placeNames = data[region] && data[region].name ?
        data[region].name : {}
    const overrides = {
      visualMap: scatterplotStyle.visualMap(yMetric, getChoroplethColors(), hlIndex),
      grid: scatterplotStyle.grid,
      xAxis: scatterplotStyle.xAxis(xMetric),
      yAxis: scatterplotStyle.yAxis(yMetric),
      tooltip: {
        show:true,
        trigger: 'item',
        extraCssText: 'max-width: 188px; white-space: normal',
        formatter: ({value}) => {
          const name = placeNames && placeNames[value[3]] ? 
            placeNames[value[3]] : 'Unknown'
          const stateName = getStateName(value[3])
          return `
            <div class="tooltip__title">${name}, ${stateName}</div>
            <div class="tooltip__content">
              ${getMetricTooltip(yMetric.id, value[1])}
            </div>
          `
        }
      }
    };
    return overrides;
  }

  // TODO: Remove global instance
  _onReady = (e) => {
    this.echart = e;
    window.echartInstance = e
    this.props.onLoaded && this.props.onLoaded(e)
  }
  
  _onHover = (location) => {
    if (location && location.id) {
      const feature = {
        id: location.id,
        properties: location,
      }
      this.props.onHoverFeature(feature);
    } else {
      this.props.onHoverFeature(null);
    }
  }

  componentDidMount() {
    this.setState({
      baseScatterplot: this._getOverrides(),
    })
  }

  componentDidUpdate(prevProps) {
    const { data, region, yMetric, highlightOn } = this.props 
    // update scatterplot overrides when metric changes
    if (
      prevProps.yMetric.id !== yMetric.id ||
      prevProps.highlightOn !== highlightOn ||
      Boolean(prevProps.data[region].name) !== Boolean(data[region].name)
    ) {
      this.setState({
        baseScatterplot: this._getOverrides()
      })
    }
    // turn off highlight if no state available
    if (prevProps.activeState !== this.props.activeState) {
      if (!this.props.activeState) {
        this._toggleHighlight(false, this.props.highlightOn)
      } else {
        this.state.restore && this._toggleHighlight(true)
      }
    }
  }

  render() {
    return (
      <div className='map-scatterplot'>
        <div className="map-scatterplot__container">
          { 
            this.state.baseScatterplot && 
            <DynamicScatterplot
              xVar={this.props.xVar}
              yVar={this.props.yVar}
              zVar={this.props.zVar}
              region={this.props.region}
              data={this.props.data || {}}
              options={this.state.baseScatterplot}
              hovered={this.props.hoveredId}
              highlightedState={this.props.highlightedState}
              selected={this.props.selected}
              onReady={this._onReady}
              onHover={this._onHover}
              onClick={this.props.onSelectLocation}
              onData={this.props.onData}
            /> 
          }
          <Typography variant="body2" classes={{root: "tmp__axis-overlay" }}>
            <span>← poorer</span>
            <span>richer →</span>
          </Typography>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (
  { 
    map, 
    hovered: { feature }, 
    selected, 
    scatterplot: { data } 
  }, 
  { match: { params: { region, metric, demographic } } }
) => { 
  region = (region === 'schools' ? 'districts' : region);
  const activeState = map.highlightState && map.usState ? 
    map.usState : '';
  return ({
    region,
    data,
    activeState,
    demographic: getDemographicById(demographic),
    yVar: underscoreCombine(demographic, metric),
    xVar: underscoreCombine(demographic, 'ses'),
    zVar: 'sz',
    colors: getChoroplethColors(),
    yMetric: getMetricById(metric),
    selected: selected && selected[region],
    highlightOn: map.highlightState && map.usState,
    highlightedState: activeState,
    hoveredId: feature && 
      feature.properties && 
      feature.properties.id ?
        feature.properties.id : ''
  })
}

const mapDispatchToProps = (dispatch) => ({
  onData: (data, region) => 
    dispatch(onScatterplotData(data, region)),
  onLoaded: () => 
    dispatch(onScatterplotLoaded('map')),
  onHoverFeature: (feature) =>
    dispatch(onHoverFeature(feature)),
  onSelectLocation: (location) => {
    dispatch(loadLocation(location))
    dispatch(onViewportChange({ 
      latitude: location.lat, 
      longitude: location.lon,
      zoom: location.id.length+2
    }, true))
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapScatterplot)
