import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import DynamicScatterplot from '../base/DynamicScatterplot';
import MapLocationCards from '../map/MapLocationCards';
import MapSearch from '../map/MapSearch';
import MenuSentence from '../base/MenuSentence';
import LANG from '../../constants/lang';
import { onScatterplotData, onScatterplotLoaded, getDispatchForSection } from '../../actions/scatterplotActions';
import { onHoverFeature } from '../../actions/mapActions';
import { loadLocation } from '../../actions/featuresActions';


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
    ready: PropTypes.bool,
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
    selectedLocationCount: PropTypes.number,
    /**
     * Determines the graph config variant
     */
    variant: PropTypes.string,
  }

  render() {
    const { 
      title, 
      description, 
      id, 
      name, 
      controls, 
      onOptionChange, 
      controlText,
      selectedLocationCount,
      ready = true,
      ...rest 
    } = this.props;
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

        <div className="section__body">
        
          <div className="section__places">
            <MapLocationCards metrics={[rest.xVar, rest.yVar]}>
              <div className="location-card location-card--search">
                <Typography component="p" className="helper helper--card-search">
                  { LANG['CARD_SEARCH_HELPER'] }
                </Typography>
              </div>
            </MapLocationCards>
          </div>

          {/* Hack approach to overlay search on top of visualization */}
          <div className="section__places section__places--overlay">
            <div className="location-card-list">
              {
                Boolean(selectedLocationCount) && 
                [...Array(selectedLocationCount)].map((_, i) =>
                  <div key={'pchld-'+i} className="location-card"></div>
                )
              }
              <div className="location-card location-card--search">
                <MapSearch
                  inputProps={{
                    placeholder: LANG['CARD_SEARCH_PLACEHOLDER']
                  }}
                />
              </div>
            </div>
          </div>

          <div className="section__component">

            <div className="section__controls">
              <MenuSentence 
                text={controlText}
                controls={controls}
                onChange={onOptionChange}
              />
            </div>
            { ready &&
              <DynamicScatterplot
                {...rest}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ScatterplotSection

export const sectionMapDispatchToProps = (sectionId) =>
  (dispatch, ownProps) => ({
    onOptionChange: 
      getDispatchForSection(dispatch, sectionId, ownProps),
    onData: (data, region) =>
      dispatch(onScatterplotData(data, region)),
    onReady: () => 
      dispatch(onScatterplotLoaded(sectionId)),
    onHover: (feature) =>
      dispatch(onHoverFeature(feature)),
    onClick: (location) =>
      dispatch(loadLocation(location))
  })
