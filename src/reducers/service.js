import { SET_SERVICE } from '../actions/actions';

const service = function service(state = null, action) {
	
	const { type, payload } = action;

	switch (type) {
		case SET_SERVICE:
			return payload;
		default:
			return state;
	}

};

export default service;
