import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import ReactEcharts from 'echarts-for-react';
import { scatterOptions, hoverOptions } from '../../constants/scatterOptions';
import { getPaddedMinMax } from '../../modules/metrics';
import { loadVarsForRegion } from '../../actions/scatterplotActions';

export class MapScatterplot extends Component {
  static propTypes = {
    region: PropTypes.string,
    yVar: PropTypes.string,
    xVar: PropTypes.string,
    metric: PropTypes.string,
    hoveredFeature: PropTypes.object
  }

  _loadScatterplotData() {
    const { xVar, yVar, xData, yData, region, loadVarsForRegion } = this.props;
    const vars = [];
    xVar && !xData && vars.push(xVar);
    yVar && !yData && vars.push(yVar);
    loadVarsForRegion(vars, region);
  }

  _getVisualMap() {
    const { metrics, metric } = this.props;
    return {
      ...getPaddedMinMax(metrics, metric),
      inRange: {
        color: metrics.colors
      }
    }
  }

  _getDataForFeatureId(id) {
    const { xData, yData } = this.props;
    return xData && yData ?
      [ [ xData[id], yData[id] ] ] :
      []
  }

  _getOverlayOptions() {
    const { hoveredFeature, metrics, metric } = this.props;
    return {
      ...hoverOptions,
      yAxis: {
        ...hoverOptions.yAxis,
        ...getPaddedMinMax(metrics, metric, 2)
      },
      series: [
        {
          id: 'hover',
          type: 'effectScatter',
          symbolSize: 10,
          itemStyle: {
            color: 'rgba(255,0,0, 1)'
          },
          data: hoveredFeature && 
            hoveredFeature.properties.id ? 
              this._getDataForFeatureId(hoveredFeature.properties.id) : 
              []
          ,
          z: 3
        }
      ]
    }
    
  }

  _getData() {
    const { xData, yData } = this.props;
    if (!yData || !xData) { return []; }
    const data = mergeDatasets(xData, yData);
    return Object.keys(data).map(k => data[k])
  }

  _getScatterOptions() {
    const { metrics, metric } = this.props;
    return {
      ...scatterOptions,
      visualMap: {
        ...scatterOptions.visualMap,
        ...this._getVisualMap()
      },
      yAxis: {
        ...scatterOptions.yAxis,
        ...getPaddedMinMax(metrics, metric, 2)
      },
      series: [
        {
          id: 'scatter',
          name: 'scatter',
          type: 'scatter',
          data: this._getData(),
          z:2
        }
      ]
    }
  }

  _updateDimensions() {
    // this.echart.resize();
  }

  _onChartReady(e) {
    // console.log(e)
    // e.on('mousemove', console.log)
    // this.echart = e;
  }

  _handleResize() {
    this._updateDimensions();
  }

  componentDidMount() {
    window.addEventListener(
      'resize', this._handleResize.bind(this)
    );
    this._updateDimensions();
    this._loadScatterplotData();
  }

  componentDidUpdate(prevProps) {
    const { region, xVar, yVar } = this.props;
    if (
      prevProps.region !== region ||
      prevProps.xVar !== xVar ||
      prevProps.yVar !== yVar
    ) {
      this._loadScatterplotData();
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize', this._handleResize.bind(this)
    );
  }

  render() {
    return (
      <div className='map-scatterplot'>
        <Paper className="map-scatterplot__container">
          <ReactEcharts
            onChartReady={this._onChartReady.bind(this)}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            option={this._getScatterOptions()}

          />
          <ReactEcharts
            style={{ pointerEvents: 'none', position: 'absolute', width: '100%', height: '100%' }}
            option={this._getOverlayOptions()}
          />
        </Paper>
      </div>
    )
  }
}

const mergeDatasets = (set1, set2) =>
  Object.keys(set1).reduce(
    (acc, curr) => {
      if (
        set2.hasOwnProperty(curr) && 
        parseFloat(set2[curr]) > -9999 &&
        parseFloat(set1[curr]) > -9999 &&
        curr !== "" && curr !== "id"
      ) {
        acc[curr] = [ 
          parseFloat(set1[curr]), 
          parseFloat(set2[curr]) 
        ]
      }
      return acc;
    }, {}
  )

const mapStateToProps = ({map, scatterplot, metrics}) => {
  const region = 
    map.region === 'schools' ? 
      'districts' : map.region;
  const xData = 
    scatterplot.data[region] &&
    scatterplot.data[region]['all_ses'] ?
      scatterplot.data[region]['all_ses'] :
      null
  const yVar = 'all_' + map.metric;
  const yData = 
    scatterplot.data[region] &&
    scatterplot.data[region][yVar] ?
      scatterplot.data[region][yVar] :
      null
  return ({
    region,
    xData,
    yData,
    yVar,
    metrics,
    xVar: 'all_ses',
    metric: map.metric,
    hoveredFeature: map.hoveredFeature ? 
      map.hoveredFeature : null
  })
}

const mapDispatchToProps = (dispatch) => ({
  loadVarsForRegion: (vars, region) => 
    dispatch(loadVarsForRegion(vars, region))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapScatterplot)
