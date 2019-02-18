import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios';
import { parse } from 'papaparse';
import Paper from '@material-ui/core/Paper';
import ReactEcharts from 'echarts-for-react';
import { scatterOptions, hoverOptions } from '../../constants/scatterOptions';
import { metrics } from '../../constants/dataOptions';

export class MapScatterplot extends Component {
  static propTypes = {
    region: PropTypes.string,
    yVar: PropTypes.string,
    xVar: PropTypes.string,
    metric: PropTypes.string,
    hoveredFeature: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      scatterData: []
    }
  }

  _loadDataForVar(varName) {
    const {region} = this.props;
    const url = `/assets/data/${region}/${varName}.csv`;
    return axios.get(url).then((res) => {
      const parsed = parse(res.data);
      if (parsed.errors.length) {
        throw new Error(res.errors[0])
      }
      return parsed.data
        .reduce((acc, curr) => {
          acc[curr[0]] = curr[1];
          return acc;
        }, {});
    })
  }

  _buildScatterplotData() {
    const { xVar, yVar } = this.props;
    return Promise.all([
      this._loadDataForVar(xVar),
      this._loadDataForVar(yVar),
    ])
      .then(data => Object.keys(data[0]).reduce(
        (acc, curr) => {
          if (
            data[1].hasOwnProperty(curr) && 
            curr !== "" && curr !== "id"
          ) {
            acc[curr] = [ 
              parseFloat(data[0][curr]), 
              parseFloat(data[1][curr]) 
            ]
          }
          return acc;
        }, {}
      ))
      .then(data => {
        this.setState({ 
          data,
          scatterData: Object.keys(data)
            .filter(k => data[k][1] > -999)
            .map(k => data[k])
        });
        return data;
      })
  }

  _getVisualMap() {
    return {
      ...this._getMetricMinMax(),
      inRange: {
        color: this._getMetricColors()
      }
    }
  }

  _getMetricColors() {
    const { metric } = this.props;
    const stops = metrics.find(m => m.id === metric).stops;
    return stops.map(s => s[1])
  }

  _getMetricMinMax(padSteps = 0) {
    const { metric } = this.props;
    const stops = metrics.find(m => m.id === metric).stops;
    let min = stops[0][0];
    let max = stops[stops.length-1][0];
    if (padSteps) {
      const stepSize = Math.abs(stops[0][0] - stops[1][0]);
      min = Math.round((min - (stepSize * padSteps))*10)/10;
      max = Math.round((max + (stepSize * padSteps))*10)/10;
    }
    return { min, max }
  }

  _getSeries() {
    const { hoveredFeature } = this.props;
    const series = [
      {
        id: 'scatter',
        name: 'scatter',
        type: 'scatter',
        data: Object.keys(this.state.data)
                    .filter(k => this.state.data[k][1] > -999)
                    .map(k => this.state.data[k]),
        z:2
      }
    ]
    if (hoveredFeature) {
      series.push({
        id: 'hover',
        type: 'effectScatter',
        symbolSize: 20,
        
        data: [
          this.state.data[hoveredFeature.properties.id]
        ],
        z: 3
      })
    }
    return series;
  }

  _getOverlayOptions() {
    const { hoveredFeature } = this.props;
    return {
      ...hoverOptions,
      yAxis: {
        ...hoverOptions.yAxis,
        ...this._getMetricMinMax(2)
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
            this.state.data[hoveredFeature.properties.id] && 
            this.state.data[hoveredFeature.properties.id][1] > -999 ? 
              [ this.state.data[hoveredFeature.properties.id] ] : 
              null
          ,
          z: 3
        }
      ]
    }
    
  }

  _getScatterOptions() {
    return {
      ...scatterOptions,
      visualMap: {
        ...scatterOptions.visualMap,
        ...this._getVisualMap()
      },
      yAxis: {
        ...scatterOptions.yAxis,
        ...this._getMetricMinMax(2)
      },
      series: [
        {
          id: 'scatter',
          name: 'scatter',
          type: 'scatter',
          data: this.state.scatterData,
          z:2
        }
      ]
    }
  }

  _updateDimensions() {
    // this.echart.resize();
  }

  _onChartReady(e) {
    console.log(e)
    e.on('mousemove', console.log)
    // this.echart = e;
  }

  handleResize() {
    this._updateDimensions();
  }

  componentDidMount() {
    window.addEventListener(
      'resize', this.handleResize.bind(this)
    );
    this._updateDimensions();
    this._buildScatterplotData();
  }

  componentDidUpdate(prevProps) {
    const { region, xVar, yVar } = this.props;
    if (
      prevProps.region !== region ||
      prevProps.xVar !== xVar ||
      prevProps.yVar !== yVar
    ) {
      this._buildScatterplotData();
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize', this.handleResize.bind(this)
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

const mapStateToProps = (state) => ({
  region: state.map.region === 'schools' ? 
    'districts' : state.map.region,
  metric: state.map.metric,
  yVar: 'all_' + state.map.metric,
  xVar: 'all_ses',
  xData: state.scatterplot.data[region]['all_ses'],
  hoveredFeature: state.map.hoveredFeature ? 
    state.map.hoveredFeature : null
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScatterplot)
