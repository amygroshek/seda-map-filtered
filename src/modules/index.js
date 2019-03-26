import { combineReducers } from 'redux'
import map from './map';
import scatterplot from './scatterplot';
import search from './search';
import hovered from './hovered';
import selected from './selected';
import features from './features';
import report from './report';

export default combineReducers({ 
  map, 
  scatterplot, 
  search,
  hovered,
  selected,
  features,
  report
})
