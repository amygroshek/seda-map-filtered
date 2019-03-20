import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SedaScatterplot from 'react-seda-scatterplot'
import Controls from '../base/Controls';
import { theme } from '../../style/echartTheme';
import * as scatterplotStyle from '../../style/scatterplot-style';
import { connect } from 'react-redux';

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
  }

  state = {
    options: null
  }

  /**
   * Gets the configuration overrides for the base scatterplot
   */
  _getOverrides() {
    const { xVar, yVar, highlight } = this.props;
    const yMetric = yVar.split('_')[1];
    const xMetric = xVar.split('_')[1];
    const hl = Boolean(highlight);
    const series = [
      {
        id: 'base',
        type: 'scatter',
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
        show: hl,
        itemStyle: {
          borderColor: 'rgba(6, 29, 86, 0.4)',
        }
      },
      scatterplotStyle.overlays({ id: yMetric }),
    ];
    const overrides = {
      grid: scatterplotStyle.grid,
      xAxis: scatterplotStyle.xAxis({ id: xMetric }),
      yAxis: scatterplotStyle.yAxis({ id: yMetric }),
      series
    };
    return overrides;
  }

  componentDidMount() {
    const options = this._getOverrides()
    console.log(options)
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
      console.log(options)
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
            prefix={this.props.region}
            options={this.state.options}
            highlighted={this.props.highlightedIds}
            selected={this.props.selectedIds}
            selectedColors={['#f00']}
            theme={theme}
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
  { map, selected, scatterplot: { data } }, 
  { region, highlight }
) => ({
  selectedIds: selected[region],
  highlightedIds: highlight && data && data[region] && 
    data[region]['name'] && map.usState ? 
      getStateIds(Object.keys(data[region]['name']), highlight) : 
      [],
})

export default connect(mapStateToDispatch, null)(DynamicScatterplot);