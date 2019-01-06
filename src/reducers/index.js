//import _ from 'lodash';
import { combineReducers } from 'redux';

import {
	ADD_TOKENS,
	ADD_TRANSACTION,
	ADD_SUB,
	REMOVE_SUB,
	SET_STATUS,
	SET_MIN_VAL
} from '../actions';

function tokens(state = [], action) {
	let tokens = state;

	switch (action.type) {
		case ADD_TOKENS:
			return state.concat(action.payload);

		case ADD_SUB:
			let tokenIndex = tokens.findIndex(
				token => token.symbol === action.payload.token
			);
			if (tokenIndex > -1) {
				console.log(`ADD_SUB token = ${action.payload.token}`);
				tokens[tokenIndex].subscribed = true;
				tokens[tokenIndex].subscription = action.payload.sub;
				return tokens;
			} else return state; // cannot subscribe to a token that we don't have in the list

		case REMOVE_SUB:
			tokenIndex = tokens.findIndex(
				token => token.symbol === action.payload.token
			);
			if (tokenIndex > -1) {
				console.log(`REMOVE_SUB token = ${action.payload.token}`);
				tokens[tokenIndex].subscribed = false;
				tokens[tokenIndex].subscription = null;
				return tokens;
			} else return state; // cannot unsubscribe from a token that we don't have in the list

		default:
			return state;
	}
}

function transactions(state = [], action) {
	switch (action.type) {
		case ADD_TRANSACTION:
			// only add unique transactions
			let transactionIndex = state.find(
				transaction =>
					transaction.transactionHash === action.payload.transactionHash
			);
			console.log(
				`found transaction has ${
					action.payload.transactionHash
				} at index ${transactionIndex}`
			);
			// add it only if it's unique
			return transactionIndex === undefined
				? [action.payload].concat(state)
				: state;

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

function settings(state = { minDisplayValue: 0 }, action) {
	switch (action.type) {
		case SET_MIN_VAL:
			return { ...state, minDisplayValue: action.payload };
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	tokens,
	transactions,
	status,
	settings
});

export default rootReducer;
