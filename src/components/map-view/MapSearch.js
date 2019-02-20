import React from 'react'
import { InstantSearch, SearchBox, Hits, Highlight, Configure, connectSearchBox } from 'react-instantsearch-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { onViewportChange, onRegionChange } from '../../actions/mapActions';
import {FlyToInterpolator} from 'react-map-gl';
import * as ease from 'd3-ease';


const SearchMenuItem = 
  ({hit, onClick}) => {
    return (
      <MenuItem component='div' onClick={() => onClick(hit)}>
        <span className="hit-name">
          <Highlight attribute="name" hit={hit} />
        </span>
      </MenuItem>
    );
  }

const Results = connectSearchBox(
  ({ currentRefinement, refine, onClick }) =>
    currentRefinement ? (
      <Hits hitComponent={ (hit) => <SearchMenuItem hit={hit.hit} onClick={e => { refine(''); onClick(e)}} /> } />
    ) : //<div>No query</div>
    null
);

const mapDispatchToProps = (dispatch) => ({
  updateMapViewport: (hit) => {
    if (hit) {
      dispatch(onViewportChange({ 
        latitude: parseFloat(hit.lat), 
        longitude: parseFloat(hit.lon),
        zoom: hit.id.length,
        transitionDuration: 3000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: ease.easeCubic
      }))
      console.log(hit)
      const region = hit.group === 'district' ?
        'districts' : hit.group === 'county' ?
        'counties' : 'schools';
      dispatch(onRegionChange(region))
    }
  }
})

const Search = connect(null, mapDispatchToProps)(
  ({ updateMapViewport }) => {
    return (
      <div>
        <SearchBox />
        <Results onClick={(e) => {
          updateMapViewport(e);
        }} />
      </div>
    );
  }
);

const MapSearch = () => {
  return (
    <div className="map-search-wrapper">
      <InstantSearch
        appId="VQGKAQUEHP"
        apiKey="d57cfd62e7ef2abb89335bf26080e3fd"
        indexName="dev_seda"
      >
        <Configure hitsPerPage={5} />
        <Search />
      </InstantSearch>
    </div>
  )
}




export default MapSearch


