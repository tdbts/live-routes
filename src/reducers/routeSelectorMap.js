import { SET_ROUTE_SELECTOR_MAP } from '../actions/actions';

const routeSelectorBounds = function routeSelectorBounds(state = null, action) {

	const { type, payload } = action;

	switch (type) {
		case SET_ROUTE_SELECTOR_MAP:
			return payload ? payload : state;
		default:
			return state;
	}

};

export default routeSelectorBounds;
