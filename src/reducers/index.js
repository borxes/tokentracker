import _ from 'lodash';
import { combineReducers } from 'redux';

import {
	ADD_TOKENS,
	ADD_TRANSACTION,
	ADD_SUB,
	REMOVE_SUB,
	SET_STATUS
} from '../actions';

function tokens(state = [], action) {
	switch (action.type) {
		case ADD_TOKENS:
			return state.concat(action.payload);
		default:
			return state;
	}
}

function transactions(state = [], action) {
	switch (action.type) {
		case ADD_TRANSACTION:
			return state.concat(action.payload);
		default:
			return state;
	}
}

//function subscriptions - fix to object
function subscriptions(state = [], action) {
	switch (action.type) {
		case ADD_SUB:
			console.log('sub reducer called ADD_SUB');
			return state.concat(action.payload);
		case REMOVE_SUB:
			console.log('sub reducer called REMOVE_SUB');
			return state.filter(sub => sub !== action.payload);
		default:
			return state;
	}
}

function status(state = [], action) {
	switch (action.type) {
		case SET_STATUS:
			return state.concat(action.payload);
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	tokens,
	transactions,
	subscriptions,
	status
});

export default rootReducer;
