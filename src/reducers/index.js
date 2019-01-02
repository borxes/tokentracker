import { combineReducers } from 'redux';

import { ADD_TOKENS, ADD_TRANSACTION, ADD_SUB, REMOVE_SUB } from '../actions';

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

//function subscriptions

const rootReducer = combineReducers({
	tokens,
	transactions
});

export default rootReducer;
