import { combineReducers } from 'redux'
import map from './map';
import scatterplot from './scatterplot';
import search from './search';
import selected from './selected';
import features from './features';
import sections from './sections';
import view from './view';

export default combineReducers({ 
  map, 
  scatterplot, 
  search,
  selected,
  features,
  sections,
  view
})
