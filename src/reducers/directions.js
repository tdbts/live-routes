import { CLEAR_DIRECTIONS, SET_DIRECTIONS } from '../actions/actions';

const directions = function directions(state = null, action) {
	
	const { type, payload } = action;

	switch (type) {
		case SET_DIRECTIONS:
			return (state !== payload) ? payload : state;
		case CLEAR_DIRECTIONS:
			return null;
		default:
			return state;		
	}

}; 

export default directions;
