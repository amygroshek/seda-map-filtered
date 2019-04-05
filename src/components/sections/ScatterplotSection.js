import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import DynamicScatterplot from '../base/DynamicScatterplot';
import MapLocationCards from '../map/MapLocationCards';
import MenuSentence from '../base/MenuSentence';

export class ScatterplotSection extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    controlText: PropTypes.string,
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
    selected: PropTypes.array,
    selectedColors: PropTypes.array,
    data: PropTypes.object,
    onOptionChange: PropTypes.func,
    classes: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.string,
    /**
     * Determines the graph config variant
     */
    variant: PropTypes.string,
  }

  render() {
    const { title, description, id, name, controls, onOptionChange, controlText, ...rest } = this.props;
    return (
      <div id={id} name={name} className="section section--scatterplot">
        <div className="section__header">
          <Typography 
            variant="h5" 
            component="div" 
            className="section__heading"
          >
            {title}
          </Typography>
          <Typography 
            component="div" 
            className="section__description"
          >
            {description}
          </Typography>
        </div>

        { rest.selected && rest.selected.length > 0 &&
          <div className="section__places">
            <MapLocationCards 
              metrics={[rest.xVar, rest.yVar]}
            />
          </div>
        }
        <div className="section__component">

          <div className="section__controls">
            <MenuSentence 
              text={controlText}
              controls={controls}
              onChange={onOptionChange}
            />
          </div>

          <DynamicScatterplot
            {...rest}
          />
        </div>
      </div>
    )
  }
}

export default ScatterplotSection
