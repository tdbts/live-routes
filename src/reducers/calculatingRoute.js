import { ROUTE_CALCULATION_REQUEST, ROUTE_CALCULATION_COMPLETE } from '../actions/actions';

const calculatingRoute = function calculatingRoute(state = false, action) {

	switch (action.type) {
		case ROUTE_CALCULATION_REQUEST:
			return true;
		case ROUTE_CALCULATION_COMPLETE:
			return false;
		default:
			return state;
	}

};

export default calculatingRoute;
