import { SET_ROUTE_SELECTOR_PLACE } from '../actions/actions';
import { DEFAULT_PLACE } from '../constants/constants';

const routeSelectorPlace = function routeSelectorPlace(state = DEFAULT_PLACE, action) {

	const { type, payload } = action;

	switch (type) {
		case SET_ROUTE_SELECTOR_PLACE:
			return payload ? payload : state;
		default:
			return state;
	}

};

export default routeSelectorPlace;
