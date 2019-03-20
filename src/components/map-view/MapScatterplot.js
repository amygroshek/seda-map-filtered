import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import * as _isEqual from 'lodash.isequal';
import { getStops } from '../../modules/metrics';
import { onHoverFeature, onViewportChange, onCoordsChange, toggleHighlightState } from '../../actions/mapActions';
import { loadLocation } from '../../actions/featuresActions';
import { Typography, Checkbox } from '@material-ui/core';
import { getSingularRegion } from '../../utils/index'
import { demographics } from '../../constants/dataOptions';
import SedaScatterplot from 'react-seda-scatterplot';
import * as scatterplotStyle from '../../style/scatterplot-style';
import { onScatterplotData, onScatterplotError } from '../../actions/scatterplotActions';
import { getStateName } from '../../constants/statesFips';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { theme } from '../../style/echartTheme';

export class MapScatterplot extends Component {
  static propTypes = {
    region: PropTypes.string,
    demographic: PropTypes.object,
    yVar: PropTypes.string,
    xVar: PropTypes.string,
    zVar: PropTypes.string,
    colors: PropTypes.array,
    yMetric: PropTypes.object,
    xMetric: PropTypes.object,
    yRange: PropTypes.object,
    hoveredId: PropTypes.string,
    selectedIds: PropTypes.array,
    selectedColors: PropTypes.array,
    stops: PropTypes.array,
    onHoverFeature: PropTypes.func,
    updateMapViewport: PropTypes.func,
    onSelectLocation: PropTypes.func,
    onMouseMove: PropTypes.func,
    onDataLoaded: PropTypes.func,
    onError: PropTypes.func,
    showState: PropTypes.string,
    onToggleHighlight: PropTypes.func,
    highlightState: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      baseScatterplot: null,
      restore: false,
    }
  }

  _toggleHighlight = (highlightState, restore = false) => {
    this.props.onToggleHighlight(highlightState);
    this.setState(
      { restore }, 
      () => this.setState({ baseScatterplot: this._getOverrides() })
    )
  }

  /**
   * Gets the configuration overrides for the base scatterplot
   */
  _getOverrides() {
    const { xMetric, yMetric, colors, selectedIds } = this.props;
    const hl = this.props.highlightState;
    const series = [
      {
        id: 'base',
        animation: false,
        silent: hl ? true : false,
        itemStyle: {
          color: 'rgba(0, 0, 0, 0.1)',
          borderColor: hl ? 'rgba(0,0,0,0.1)' : 'rgba(6, 29, 86, 0.4)',
        },
      },
      {
        id: 'highlight',
        type: 'scatter',
        show: this.props.highlightState,
        itemStyle: {
          borderColor: 'rgba(6, 29, 86, 0.4)',
        }
      },
      scatterplotStyle.overlays(yMetric),
    ];
    const hlIndex = hl ? 2 : 0
    const overrides = {
      visualMap: scatterplotStyle.visualMap(yMetric, colors, hlIndex),
      grid: scatterplotStyle.grid,
      xAxis: scatterplotStyle.xAxis(xMetric),
      yAxis: scatterplotStyle.yAxis(yMetric),
      series
    };
    return overrides;
  }

  // TODO: Remove global instance
  _onReady = (e) => {
    this.echart = e;
    window.echartInstance = e
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

  _onMouseMove = (e) => {
    const coords = {
      x: e.event.event.clientX, 
      y: e.event.event.clientY
    }
    this.props.onMouseMove(coords)
  }

  componentDidMount() {
    this.setState({
      baseScatterplot: this._getOverrides(),
    })
  }

  componentDidUpdate(prevProps) {
    // update scatterplot overrides when metric changes
    if (
      !_isEqual(prevProps.yMetric, this.props.yMetric),
      prevProps.highlightState !== this.props.highlightState
    ) {
      this.setState({
        baseScatterplot: this._getOverrides()
      })
    }
    // turn off highlight if no state available
    if (prevProps.showState !== this.props.showState) {
      if (!this.props.showState) {
        this._toggleHighlight(false, this.props.highlightState)
      } else {
        this.state.restore && this._toggleHighlight(true)
      }
    }
  }

  render() {
    const { region, showState } = this.props;
    return (
      <div className='map-scatterplot'>
        <div className="map-scatterplot__container">
          { 
            this.state.baseScatterplot && 
            <SedaScatterplot
              endpoint={process.env.REACT_APP_VARS_ENDPOINT}
              xVar={this.props.xVar}
              yVar={this.props.yVar}
              zVar={this.props.zVar}
              prefix={this.props.region}
              options={this.state.baseScatterplot}
              hovered={this.props.hoveredId}
              highlighted={this.props.highlightState ? this.props.highlighted : []}
              selected={this.props.selectedIds}
              selectedColors={this.props.selectedColors}
              onReady={this._onReady}
              onHover={this._onHover}
              onClick={this.props.onSelectLocation}
              onMouseMove={this._onMouseMove}
              onDataLoaded={(e) => this.props.onDataLoaded(e, this.props.region)}
              onError={this.props.onError}
              theme={theme}
            /> 
          }
          <Typography variant="body2" classes={{root: "tmp__axis-overlay" }}>
            <span>← poorer</span>
            <span>richer →</span>
          </Typography>
          <Typography classes={{root: 'map-scatterplot__hint'}} variant="caption">
            Each circle represents {this.props.demographic.id === 'all' ? 'all' : this.props.demographic.label.toLowerCase()}
            {' '}students in one {getSingularRegion(this.props.region)}. Larger circles represent {this.props.region} with more students.
          </Typography>
          { showState &&
            <div className="checkbox-overlay">
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={this.props.highlightState} 
                    onChange={(e) => this._toggleHighlight(e.target.checked)}
                  />
                }
                label={
                  <span>Highlight {region} in <strong>{showState}</strong></span>
                }
                labelPlacement="start"
              />
            </div>
          }
        </div>
      </div>
    )
  }
}


const getStateIds = (ids, fips) => {
  if (ids && fips) {
    return ids
      .filter(d => d.substring(0,2) === fips)
  }
  return [];
}

const mapStateToProps = (
  { map, metrics, hovered: { feature }, selected, scatterplot: { data } }, 
  { match: { params: { region, metric, demographic } } }
) => { 
  region = (region === 'schools' ? 'districts' : region);
  return ({
    region,
    demographic: demographics.find(d => d.id === demographic),
    yVar: demographic + '_' + metric,
    xVar: demographic + '_ses',
    zVar: 'sz',
    stops: getStops(metrics, metric), 
    colors: metrics.colors,
    xMetric: metrics.items['ses'],
    yMetric: metrics.items[metric],
    selectedIds: selected[region],
    selectedColors: selected.colors,
    highlightState: map.viewport && map.viewport.zoom > 6 ? map.highlightState : false,
    showState: map.usState && map.viewport && map.viewport.zoom > 6 ? getStateName(map.usState) : '',
    highlighted: data && data[region] && 
      data[region]['name'] && map.usState &&
      map.viewport && map.viewport.zoom > 6 ? 
      getStateIds(Object.keys(data[region]['name']), map.usState) : [],
    hoveredId: feature && 
      feature.properties && 
      feature.properties.id ?
        feature.properties.id : ''
  })
}

const mapDispatchToProps = (dispatch) => ({
  onToggleHighlight: (on) =>
    dispatch(toggleHighlightState(on)),
  onDataLoaded: (data, region) => 
    dispatch(onScatterplotData(data, region)),
  onError: (err) => 
    dispatch(onScatterplotError(err)),
  onHoverFeature: (feature) =>
    dispatch(onHoverFeature(feature)),
  onMouseMove: (coords) =>
    dispatch(onCoordsChange(coords)),
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
