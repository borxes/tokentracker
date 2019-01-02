import axios from 'axios';

const ETHPLORER_URL = 'https://api.ethplorer.io';
const API_KEY = '?apiKey=freekey';
const TOKEN_LIMIT = 10;

////////////////////
// Action Constants
////////////////////

// add new token to sub options
export const ADD_TOKENS = 'ADD_TOKENS';

// add new subscription to a token
export const ADD_SUB = 'ADD_SUB';

// remove token subscription
export const REMOVE_SUB = 'REMOVE_SUB';

// add new transaction
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

////////////////////
// Action creators
////////////////////

// Adds tokens to tracks where tokens is an array.
export function addTokens(tokens) {
	return {
		type: ADD_TOKENS,
		payload: tokens
	};
}

export const fetchTopTokens = () => async dispatch => {
	const response = await axios.get(
		`${ETHPLORER_URL}/getTop${API_KEY}&criteria=cap&limit=${TOKEN_LIMIT}`
	);

	dispatch({
		type: ADD_TOKENS,
		payload: response.data.tokens.slice(1) // we ignore the first token which is always ETH
	});
};

export function addSub(token) {
	return {
		type: ADD_SUB,
		payload: token
	};
}

export function removeSub(token) {
	return {
		type: REMOVE_SUB,
		payload: token
	};
}

export function addTransaction(transaction) {
	return {
		type: ADD_TRANSACTION,
		payload: transaction
	};
}
