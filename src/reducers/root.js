import { combineReducers } from 'redux';
import calculatingRoute from './calculatingRoute';
import directions from './directions';
import routeSelectorPlace from './routeSelectorPlace';
import routeSelectorMap from './routeSelectorMap';
import service from './service';

export default combineReducers({
	calculatingRoute,
	directions,
	routeSelectorPlace,
	routeSelectorMap,
	service
});
