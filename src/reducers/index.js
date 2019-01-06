//import _ from 'lodash';
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

		case ADD_SUB:
			let tokens = state;
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
			tokens = state;
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
			console.log(
				`searching for transaction hash ${action.payload.transactionHash}...`
			);
			let transactionIndex = state.find(
				transaction => transaction.hash === action.payload.transactionHash
			);
			console.log(
				`found transaction has ${
					action.payload.transactionHash
				} at index ${transactionIndex}`
			);

			return transactionIndex === undefined
				? [action.payload].concat(state)
				: state;

		default:
			return state;
	}
}

//function subscriptions - fix to object
/* subscriptions moved to tokens reducer
function subscriptions(state = [], action) {
	switch (action.type) {
		case ADD_SUB:
			let subIndex = state.map(sub => sub.token).indexOf(action.payload.token);
			// only add one subscription per token, but this also should be enforced by the action
			if (subIndex === -1) return state.concat(action.payload);
			else return state;
		case REMOVE_SUB:
			return state.filter(sub => sub !== action.payload);
		default:
			return state;
	}
}
*/

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
	status
});

export default rootReducer;
