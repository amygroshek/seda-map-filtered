import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import DynamicScatterplot from './DynamicScatterplot';

export class SocioeconomicConditions extends Component {
  static propTypes = {
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
    region: PropTypes.string,
    xVar: PropTypes.string,
    yVar: PropTypes.string,
    zVar: PropTypes.string,
    highlight: PropTypes.string,
    onOptionChange: PropTypes.func,
  }

  render() {
    const { region, controls, xVar, yVar, zVar, highlight, onOptionChange } = this.props;
    return (
      <div className="report-card-section socioeconomic-conditions">
        <Typography classes={{root: "report-card-section__heading" }}>
          Socioeconomic Conditions
        </Typography>
        <div className="report-card-section__body">
          <Typography variant="body2">
            This section will show how the socioeconomic conditions compares to other areas. By default, it shows how average test scores correlate to socioeconomic status in the scatterplot. The scatterplot also allows the user to select any of the three key data metrics to see how they correlate to socioeconomic conditions.
          </Typography>
          <DynamicScatterplot 
            xVar={xVar}
            yVar={yVar}
            zVar={zVar}
            controls={controls}
            highlight={highlight === 'none' ? null : highlight}
            region={region}
            onOptionChange={onOptionChange}
          />
        </div>
      </div>
    )
  }
}

export default SocioeconomicConditions
