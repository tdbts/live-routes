import { combineReducers } from 'redux';
import routeSelectorBounds from './routeSelectorBounds';
import routeSelectorMap from './routeSelectorMap';

export default combineReducers({
	routeSelectorBounds,
	routeSelectorMap
});
