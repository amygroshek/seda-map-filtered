import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SedaScatterplot from 'react-seda-scatterplot'
import Controls from '../base/Controls';
import { theme } from '../../style/echartTheme';
import * as scatterplotStyle from '../../style/scatterplot-style';
import { connect } from 'react-redux';
import { onHoverFeature, onCoordsChange } from '../../actions/mapActions';
import { BASE_VARS } from '../../constants/dataOptions';


class DynamicScatterplot extends Component {
  static propTypes = {
    xVar: PropTypes.string,
    yVar: PropTypes.string,
    zVar: PropTypes.string,
    region: PropTypes.string,
    controls: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string,
        options: PropTypes.arrayOf(
          PropTypes.shape({ 
            id: PropTypes.string, 
            label: PropTypes.string 
          })
        )
      })
    ),
    options: PropTypes.object,
    data: PropTypes.object,
    highlight: PropTypes.string,
    onOptionChange: PropTypes.func,
    variant: PropTypes.string
  }

  state = {
    options: null
  }

  /**
   * Gets the configuration overrides for the base scatterplot
   */
  _getOverrides() {
    const { xVar, yVar, highlight, metrics, variant } = this.props;
    const yMetric = metrics[yVar.split('_')[1]];
    const xMetric = metrics[xVar.split('_')[1]];
    const yDem = yVar.split('_')[0];
    const xDem = xVar.split('_')[0];
    const hl = Boolean(highlight);
    const series = [
      {
        id: 'base',
        type: 'scatter',
        animation: false,
        silent: hl ? true : false,
        itemStyle: {
          color: hl ? 'rgba(0,0,0,0.1)' : '#76ced2cc',
          borderColor: hl ? 'rgba(0,0,0,0.1)' : 'rgba(6, 29, 86, 0.4)',
        },
      },
      {
        id: 'highlight',
        type: 'scatter',
        show: hl,
        itemStyle: {
          borderColor: 'rgba(6, 29, 86, 0.4)',
        }
      }
    ];
    const overlays = scatterplotStyle.overlays(yMetric, variant);
    if (overlays) {
      series.push(overlays);
    }
    const overrides = {
      grid: {
        top:24,
        bottom:48,
        left:0,
        right:48
      },
      xAxis: scatterplotStyle.xAxis(xMetric, xDem),
      yAxis: scatterplotStyle.yAxis(yMetric, yDem),
      series
    };
    return overrides;
  }

  _onMouseMove = (e) => {
    const coords = {
      x: e.event.event.clientX, 
      y: e.event.event.clientY
    }
    this.props.onMouseMove(coords)
  }

  _onHover = (location) => {
    // if (location && location.id) {
    //   const feature = {
    //     id: location.id,
    //     properties: location,
    //   }
    //   this.props.onHoverFeature(feature);
    // } else {
    //   this.props.onHoverFeature(null);
    // }
  }

  componentDidMount() {
    const options = this._getOverrides()
    this.setState({ options })
  }

  componentDidUpdate(prevProps) {
    // update scatterplot overrides when metric changes
    if (
      prevProps.yVar !== this.props.yVar ||
      prevProps.xVar !== this.props.xVar ||
      prevProps.highlight !== this.props.highlight
    ) {
      const options = this._getOverrides()
      this.setState({ options })
    }
  }

  render() {
    const { xVar, yVar, zVar, controls, onOptionChange } = this.props;
    return (
      <div className='dynamic-scatterplot'>
        { controls &&
          <Controls 
            controls={controls}
            onOptionChange={onOptionChange}
          />
        }
        <div className='dynamic-scatterplot__graph'>
          <SedaScatterplot
            endpoint={process.env.REACT_APP_VARS_ENDPOINT}
            xVar={xVar}
            yVar={yVar}
            zVar={zVar}
            data={this.props.scatterplotData}
            onHover={this._onHover}
            onMouseMove={this._onMouseMove}
            prefix={this.props.region}
            options={this.state.options}
            highlighted={this.props.highlightedIds}
            selected={this.props.selectedIds}
            selectedColors={['#f00']}
            theme={theme}
            baseVars={BASE_VARS}
          /> 
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

const mapStateToDispatch = (
  { map, metrics: { items }, selected, scatterplot: { data } }, 
  { region, highlight }
) => ({
  selectedIds: selected[region],
  highlightedIds: highlight && data && data[region] && 
    data[region]['name'] && map.usState ? 
      getStateIds(Object.keys(data[region]['name']), highlight) : 
      [],
  metrics: items,
  scatterplotData: data && data[region] ? data[region] : undefined,
})

const mapDispatchToProps = (dispatch) => ({
  onHoverFeature: (feature) =>
    dispatch(onHoverFeature(feature)),
  onMouseMove: (coords) =>
    dispatch(onCoordsChange(coords)),
})

export default connect(mapStateToDispatch, mapDispatchToProps)(DynamicScatterplot);