import React, { Component } from 'react'
import ReactMapGL, {NavigationControl} from 'react-map-gl';
import PropTypes from 'prop-types';
import * as _isEqual from 'lodash.isequal';
import { defaultMapStyle, getChoroplethLayer, getChoroplethOutline, getDotLayer, getBackgroundChoroplethLayer, getChoroplethOutlineCasing } from '../../style/map-style';
import { getRegionFromId } from '../../utils';

class Map extends Component {

  state = {
    mapStyle: defaultMapStyle
  };

  /**
   * Gets the width and height of the map container
   */
  _getContainerSize() {
    if (!this.mapContainer) {
      return { width: 400, height: 400 }
    }
    return {
      width: this.mapContainer.clientWidth,
      height: this.mapContainer.clientHeight
    }
  }

  _handleResize() {
    this._updateViewport();
  }

  /**
   * Update viewport route and update currently viewed US state
   * @param {object} vp viewport object 
   */
  _updateViewport(vp = this.props.viewport) {
    this.props.onViewportChange({
      ...vp,
      ...this._getContainerSize()
    });
  }


  /**
   * Sets the feature state for rendering styles
   * @param {string} region 
   * @param {string} featureId 
   * @param {object} state 
   */
  _setFeatureState(region, featureId, state) {
    this.map && this.map.setFeatureState({
      source: 'composite', 
      sourceLayer: region, 
      id: featureId
    }, state);
  }

  /**
   * Updates the selected color on the state of the map features.
   * Removes colors from oldSelected and assigns colors to selectedIds.
   * @param {Array<string>} oldSelected 
   * @param {Array<string>} selectedIds 
   */
  _updateOutlineSelected(oldSelected = [], selectedIds = []) {
    oldSelected.forEach(id => {
      const region = getRegionFromId(id);
      this._setFeatureState(
        region, id, { selected: false}
      );
    })
    selectedIds.forEach((id,i) => {
      const region = getRegionFromId(id);
      this._setFeatureState(
        region, id, { selected: this.props.colors[i % this.props.colors.length] }
      );
    })
  }

  /**
   * Updates the outline of a feature on hover
   * @param {*} oldFeature feature to remove highlight from
   * @param {*} newFeature feature to add highlight to
   * @param {*} region source layer
   */
  _updateOutlineHighlight(oldFeature, newFeature, region) {
    if (oldFeature) {
      this._setFeatureState(region, oldFeature, { hover: false});
    }
    if (newFeature) {
      this._setFeatureState(region, newFeature, { hover: true});
    }
  }

  /**
   * Updates the map choropleths based on props
   * @param {boolean} init inserts the layers instead of replacing when true
   */
  _updateChoropleth() {
    const { region, choroplethVar } = this.props;
    let updatedLayers;
    if (region !== 'schools') {
      const choroplethLayer = 
        getChoroplethLayer(region, choroplethVar);
      const choroplethOutline = 
        getChoroplethOutline(region);
      const choroplethOutlineCasing = 
        getChoroplethOutlineCasing(region);
      updatedLayers = 
        defaultMapStyle
          .get('layers')
          .splice(4, 0, choroplethLayer)
          .splice(59, 0, choroplethOutline)
          .splice(59, 0, choroplethOutlineCasing)
    } else {
      const choroplethLayer = 
        getBackgroundChoroplethLayer('districts', choroplethVar);
      const dotLayer = 
        getDotLayer(region, choroplethVar);
      updatedLayers = defaultMapStyle
        .get('layers')
        .splice(4, 0, choroplethLayer)
        .splice(59, 0, dotLayer)
    }

    const mapStyle = defaultMapStyle
      .set('layers', updatedLayers);
    this.setState({ mapStyle });
  }

  /**
   * Outline selected locations and set US state from viewport on load
   */
  _onLoad = event => {
    this.map = event.target;
    // this.map.addControl(new mapboxgl.AttributionControl(), 'bottom-left');
    this._updateOutlineSelected([], this.props.selected)
  }

  /**
   * Get the clicked on the relevant layers that and
   * pass to the handler prop
   */
  _onClick = event => {
    const { features } = event;
    const { region } = this.props;
    // find features for current region that wer clicked
    const selectedFeature = features && 
      features.find(f => (
        (region !== 'schools' && f.layer.id === 'choropleth') ||
        (region === 'schools' && f.layer.id === 'dots')
      ));
    // dispatch selected feature event if selected
    return selectedFeature &&
      this.props.onClick(selectedFeature)
  }

  /**
   * Get the hovered features on the relevant layers and
   * pass to the handler
   */
  _onHover = event => {
    const { features } = event;
    const { region } = this.props;
    // find features on the active region
    const hoveredFeature = features && 
      features.find(f => (
        (region !== 'schools' && f.layer.id === 'choropleth') ||
        (region === 'schools' && f.layer.id === 'dots')
      ));
    // set the mouse coords
    const coords = { x: event.point[0], y: event.point[1] };
    // trigger hover feature actions, padding the featue and
    // mouse coordinates
    this.props.onHover(hoveredFeature, coords);
  };

  /**
   * Clear the hovered feature when leaving the map component
   */
  _onHoverOut = () => {
    this.props.onHover(undefined, null);
  }

  /** Initialize choropleth layer */
  componentDidMount() {
    this._updateChoropleth();
  }

  componentDidUpdate(prevProps) {
    const { region, hovered, selected, choroplethVar } = this.props;
    // update the choropleth if any of the map data has changed
    if (
      prevProps.choroplethVar !== choroplethVar ||
      prevProps.region !== region
    ) {
      this._updateChoropleth();
    }
    // update the highlight if the hovered feature has changed
    if (prevProps.hovered !== hovered) {
      this._updateOutlineHighlight(
        prevProps.hovered, 
        hovered, 
        region
      )
    }
    // update selected outlines on change
    const oldSelected = prevProps.selected;
    if (!_isEqual(oldSelected, selected)) {
      this._updateOutlineSelected(
        oldSelected, 
        selected
      )
    }
  }

  render() {
    const { viewport, onViewportChange, onHover, attributionControl = false } = this.props;
    return (
      <div 
        className="map"
        ref={ (el) => this.mapContainer = el }
        onMouseLeave={() => onHover(null, null)}
      >
        <div className="map__container">
          <ReactMapGL
            { ...viewport }
            mapStyle={this.state.mapStyle}
            onViewportChange={(vp) => this._updateViewport(vp)}
            onHover={this._onHover}
            onClick={this._onClick}
            onLoad={this._onLoad}
            attributionControl={attributionControl}
          >
            <div className="map__zoom">
              <NavigationControl onViewportChange={onViewportChange} />
            </div>
          </ReactMapGL>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  choroplethVar: PropTypes.string,
  region: PropTypes.string,
  colors: PropTypes.array,
  viewport: PropTypes.object,
  initialViewport: PropTypes.object,
  hovered: PropTypes.string,
  selected: PropTypes.array,
  onViewportChange: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  attributionControl: PropTypes.bool,
}


export default Map;
