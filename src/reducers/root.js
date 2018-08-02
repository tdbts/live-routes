import { combineReducers } from 'redux';
import calculatingRoute from './calculatingRoute';
import routeSelectorPlace from './routeSelectorPlace';
import routeSelectorMap from './routeSelectorMap';
import service from './service';

export default combineReducers({
	calculatingRoute,
	routeSelectorPlace,
	routeSelectorMap,
	service
});
