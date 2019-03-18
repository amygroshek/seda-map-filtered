import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SedaScatterplot from 'react-seda-scatterplot'
import Select from '../base/Select';

class DynamicScatterplot extends Component {
  static propTypes = {
    xLock: PropTypes.bool,
    yLock: PropTypes.bool,
    xVar: PropTypes.string,
    yVar: PropTypes.string,
    zVar: PropTypes.string,
    region: PropTypes.string,
    xVars: PropTypes.array,
    yVars: PropTypes.array,
    options: PropTypes.object,
    data: PropTypes.object
  }

  render() {
    const { xVar, yVar, zVar, xVars, yVars } = this.props;
    return (
      <div className='dynamic-scatterplot'>
        <div className='dynamic-scatterplot__controls'>
          { xVars &&
            <Select
              label="X Axis"
              value={ xVar }
              items={ xVars }
              onChange={(e) => console.log(e)}
            />
          }
          { yVars &&
            <Select
              label="Y Axis"
              value={ yVar }
              items={ yVars }
              onChange={(e) => console.log(e)}
            />
          }
        </div>
        <div className='dynamic-scatterplot__graph'>
          <SedaScatterplot
            endpoint={process.env.REACT_APP_VARS_ENDPOINT}
            xVar={xVar}
            yVar={yVar}
            zVar={zVar}
            prefix={this.props.region}
            options={this.props.options}
          /> 
        </div>
      </div>
    )
  }
}


export default DynamicScatterplot;