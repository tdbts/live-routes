import { SET_ROUTE_SELECTOR_BOUNDS } from '../actions/actions';
import { DEFAULT_BOUNDS } from '../constants/constants';

const routeSelectorBounds = function routeSelectorBounds(state = DEFAULT_BOUNDS, action) {

	const { type, payload } = action;

	switch (type) {
		case SET_ROUTE_SELECTOR_BOUNDS:
			return payload ? payload : state;
		default:
			return state;
	}

};

export default routeSelectorBounds;
