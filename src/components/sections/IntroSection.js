import React from 'react'
import Hint from '../base/Hint';
import MapSearch from '../map/MapSearch';
import { Typography } from '@material-ui/core';

function MapIntro({onSearchSelect}) {
  return (
    <div className="section section--intro ">
      <img 
        className="section__image"
        alt="Educational Opportunity Project" 
        src="/assets/img/seda-light.svg"
      />
      <div className="section__header">
        <Typography 
          variant="h5" 
          component="div" 
          className="section__heading"
        >
          <span>
            Explore educational opportunity in
          </span> 
          <MapSearch
            onSuggestionSelected={onSearchSelect}
          />
        </Typography>
        <Typography component="div" className="section__description">
          <span>
            Using over 330 million test scores across 
            the U.S., we&#39;ve calculated {' '}
          </span>
          <Hint 
            text="The average test scores of children in a community reveal the total set of educational opportunities they have had from birth to the time they take the tests" 
          >
            <span>average test scores</span>
          </Hint>
          <span>,{' '}</span>
          <Hint 
            text="The growth of test scores from grade 3 to 8 shows how much students learn on average while they are in school." 
          >growth of test scores over time</Hint>
          <span>, and{' '}</span>
          <Hint 
            text="The trend in test scores from 2009 to 2016 indicates the extent to which a community is getting better at providing educational opportunities over time." 
          >trends in test scores over time </Hint>
          <span>{' '}to measure educational opportunity.</span>
        </Typography>
      </div>
      
    </div>
  )
}

export default MapIntro

