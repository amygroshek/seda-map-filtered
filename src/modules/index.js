import { combineReducers } from 'redux'
import map from './map';
import scatterplot from './scatterplot';
import search from './search';

export default combineReducers({ map, scatterplot, search })
