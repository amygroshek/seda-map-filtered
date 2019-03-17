import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import * as _isEqual from 'lodash.isequal';
import { getStops } from '../../modules/metrics';
import { onHoverFeature, onViewportChange, onCoordsChange } from '../../actions/mapActions';
import { loadLocation } from '../../actions/featuresActions';
import { Typography } from '@material-ui/core';
import { getSingularRegion } from '../../utils/index'
import { demographics } from '../../constants/dataOptions';
import SedaScatterplot from 'react-seda-scatterplot';
import * as scatterplotStyle from '../../constants/mapScatterplot';

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
    addSelectedLocation: PropTypes.func,
    onCoordsChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      baseScatterplot: null
    }
  }

  /**
   * Gets the configuration overrides for the base scatterplot
   */
  _getOverrides() {
    const { xMetric, yMetric, colors } = this.props;
    const overrides = {
      visualMap: scatterplotStyle.visualMap(yMetric, colors),
      grid: scatterplotStyle.grid,
      xAxis: scatterplotStyle.xAxis(xMetric),
      yAxis: scatterplotStyle.yAxis(yMetric),
      series: [
        {
          id: 'base',
          itemStyle: {
            'normal': {
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.34)'
            },
            'emphasis': {
              borderWidth: 2,
              borderColor: 'rgba(255,0,0,1)'
            }
          },
        }, 
        scatterplotStyle.overlays(yMetric)
      ]
    };
    return overrides;
  }

  // TODO: Remove global instance
  _onReady = (e) => {
    window.echartInstance = e
  }

  _onClick = (location) => {
    this.props.addSelectedLocation(location)
    this.props.updateMapViewport(location)
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
    this.props.onCoordsChange(coords)
  }

  componentDidMount() {
    this.setState({
      baseScatterplot: this._getOverrides(),
    })
  }

  componentDidUpdate(prevProps) {
    // update scatterplot overrides when metric changes
    if (
      !_isEqual(prevProps.yMetric, this.props.yMetric)
    ) {
      this.setState({
        baseScatterplot: this._getOverrides()
      })
    }
  }

  render() {
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
              selected={this.props.selectedIds}
              selectedColors={this.props.selectedColors}
              onReady={this._onReady}
              onHover={this._onHover}
              onClick={this._onClick}
              onMouseMove={this._onMouseMove}
              onDataLoaded={(e) => console.log(e)}
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = (
  { metrics, hovered: { feature }, selected }, 
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
    hoveredId: feature && 
      feature.properties && 
      feature.properties.id ?
        feature.properties.id : ''
  })
}

const mapDispatchToProps = (dispatch) => ({
  onHoverFeature: (feature) =>
    dispatch(onHoverFeature(feature)),
  onCoordsChange: (coords) =>
    dispatch(onCoordsChange(coords)),
  addSelectedLocation: (location) => (
    dispatch(loadLocation(location))
  ),
  updateMapViewport: (locationData) =>
    dispatch(onViewportChange({ 
      latitude: locationData.lat, 
      longitude: locationData.lon,
      zoom: locationData.id.length+2
    }, true))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MapScatterplot)
