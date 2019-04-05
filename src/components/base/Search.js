import React from 'react'
import PropTypes from 'prop-types';
import SedaSearch from 'react-seda-search';
import LANG from '../../constants/lang';

const defaultProps = {
  inputProps: {
    placeholder: LANG['MAP_SEARCH_PLACEHOLDER']
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
      <SedaSearch
        algoliaId={process.env.REACT_APP_ALGOLIA_ID}
        algoliaKey={process.env.REACT_APP_ALGOLIA_KEY}
        indices={indices || defaultProps.indices}
        onSuggestionSelected={onSuggestionSelected}
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


