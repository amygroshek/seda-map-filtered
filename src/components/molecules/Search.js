import React from 'react'
import PropTypes from 'prop-types';
import SedaSearch from 'react-seda-search';
import SearchIcon from '@material-ui/icons/Search';

const defaultProps = {
  inputProps: {
    placeholder: 'search'
  },
  indices: ['cities', 'counties', 'districts', 'schools']
}

const Search = ({
  inputProps,
  indices,
  onSuggestionSelected
}) => {
  return (
    <div className="map-search">
      <SearchIcon className="map-search__icon" />
      <SedaSearch
        algoliaId={process.env.REACT_APP_ALGOLIA_ID}
        algoliaKey={process.env.REACT_APP_ALGOLIA_KEY}
        indices={indices || defaultProps.indices}
        onSuggestionSelected={onSuggestionSelected}
        onSelectedClear={() => {}}
        inputProps={{
          ...defaultProps.inputProps,
          ...inputProps
        }}
      />
    </div>
  )
}

Search.propTypes = {
  inputProps: PropTypes.object,
  indices: PropTypes.array,
  onSuggestionSelected: PropTypes.func,
}

export default Search


