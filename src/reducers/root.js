import { combineReducers } from 'redux';
import routeSelectorPlace from './routeSelectorPlace';
import routeSelectorMap from './routeSelectorMap';

export default combineReducers({
	routeSelectorPlace,
	routeSelectorMap
});
