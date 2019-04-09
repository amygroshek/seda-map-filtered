import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import DynamicScatterplot from '../base/DynamicScatterplot';
import MapLocationCards from '../map/MapLocationCards';
import MapSearch from '../map/MapSearch';
import MenuSentence from '../base/MenuSentence';
import LANG from '../../constants/lang';
import { onScatterplotData, onScatterplotLoaded } from '../../actions/scatterplotActions';
import { onHoverFeature, updateCurrentState } from '../../actions/mapActions';
import { loadLocation } from '../../actions/featuresActions';
import { updateRoute } from '../../modules/router';


export class ScatterplotSection extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    classes: PropTypes.object,
    renderScatterplot: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    headerMenu: PropTypes.shape({
      text: PropTypes.string,
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
    }),
    scatterplot: PropTypes.shape({
      region: PropTypes.string,
      xVar: PropTypes.string,
      yVar: PropTypes.string,
      zVar: PropTypes.string,
      highlight: PropTypes.string,
      selected: PropTypes.array,
      data: PropTypes.object,
      highlightedState: PropTypes.string,
      variant: PropTypes.string,
    }),
    selectedLocationCount: PropTypes.number,
    onOptionChange: PropTypes.func,
    onData: PropTypes.func,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    onReady: PropTypes.func
  }

  render() {
    const { 
      title, 
      description, 
      id, 
      name, 
      headerMenu,
      onOptionChange, 
      selectedLocationCount,
      renderScatterplot = true,
      scatterplot,
      onData,
      onHover,
      onClick,
      onReady
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
            <MapLocationCards 
              section={id}
              metrics={[scatterplot.xVar, scatterplot.yVar]}
            >
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
                {...headerMenu}
                onChange={onOptionChange}
              />
            </div>
            { renderScatterplot &&
              <DynamicScatterplot
                {...scatterplot}
                onData={onData}
                onReady={onReady}
                onHover={onHover}
                onClick={onClick}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ScatterplotSection

const getDispatchForSection = (dispatch, section, ownProps) =>
  (id, option) => {
    switch(id) {
      case 'highlight':
        if (option.value === 'us') {
          dispatch(updateCurrentState(null))
        } else {
          dispatch(updateCurrentState(option.id))
        }
        return;
      case 'region':
        return updateRoute(ownProps, { region: option.id })
      default:
        return dispatch({
          type: 'SET_REPORT_VARS',
          sectionId: section,
          optionId: id,
          value: option.id
        })
    }
  }

export const sectionMapDispatchToProps = (sectionId) =>
  (dispatch, ownProps) => ({
    onOptionChange: 
      getDispatchForSection(dispatch, sectionId, ownProps),
    onData: (data, region) =>
      dispatch(onScatterplotData(data, region)),
    onReady: () => 
      dispatch(onScatterplotLoaded(sectionId)),
    onHover: (feature) =>
      dispatch(onHoverFeature(feature, sectionId)),
    onClick: (location) =>
      dispatch(loadLocation(location))
  })
