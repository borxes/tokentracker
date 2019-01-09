import axios from 'axios';
import erc20ABI from '../abi/erc20ABI.js';
import web3 from '../web3';
import { toast } from 'react-toastify';
//import { ETHPLORER_API_KEY } from '../env.js';

const ETHPLORER_URL = 'https://api.ethplorer.io';
const API_KEY = '?apiKey=freekey'; /*`?apiKey=${ETHPLORER_API_KEY}`*/
const TOKEN_LIMIT = 10;
//export const LOCAL_SUB_KEY = 'store_subs';

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

export const SET_STATUS = 'SET_STATUS';

// set minimum USD value for a transaction to be displayed
export const SET_MIN_VAL = 'SET_MIN_VAL';

////////////////////
// Action creators
////////////////////

// Adds tokens to tracks where tokens is an array.
export function addTokens(tokens) {
	tokens.forEach(token => {
		token.subscribed = false;
	});
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

	dispatch(setStatus('Top 10 tokens retrieved'));
};

// side-effect: subscribe to token events
// we subscribe to tokenSymbol and retrieve token's info from tokenState
export const addSub = (tokenSymbol, tokenState) => dispatch => {
	const token = tokenState.find(elem => elem.symbol === tokenSymbol);
	console.log(`addSub token=${token.symbol} subscribed=${!!token.subscribed}`);
	if (token && !token.subscribed) {
		const tokenContract = new web3.eth.Contract(erc20ABI, token.address);
		console.log(`subscribing to ${token.symbol}`);
		const sub = tokenContract.events.allEvents((error, event) => {
			if (event) {
				event.tokenSymbol = tokenSymbol;
				const timeStamp = new Date(Date.now());
				event.timeStamp = timeStamp.toString().split(' ')[4]; // just the time
				//dispatch(setStatus(`adding Transaction hash ${event.transactionHash}`));
				dispatch(addTransaction(event));
			}
			if (error) {
				dispatch(setStatus(`${tokenSymbol} subscription error ${error}`));
			}
		});
		dispatch({
			type: ADD_SUB,
			payload: {
				token: tokenSymbol,
				sub: sub
			}
		});
		/* local Storage is buggy atm
		let localSubs = JSON.parse(localStorage.getItem(LOCAL_SUB_KEY)) || [];
		localSubs.push(tokenSymbol);
    localStorage.setItem(LOCAL_SUB_KEY, JSON.stringify(localSubs));
    */
	} else dispatch(setStatus(`Failed to subscribe ${tokenSymbol}`));
};

export const removeSub = (tokenSymbol, tokenState) => dispatch => {
	const token = tokenState.find(elem => elem.symbol === tokenSymbol);
	console.log(
		`removeSub token=${token.symbol} subscribed=${!!token.subscribed}`
	);
	if (token && token.subscribed) {
		const sub = token.subscription;
		if (!sub) {
			//console.log(`removeSub token=${token} couldn't find subscription`);
			return;
		} else {
			sub.unsubscribe((error, success) => {
				if (success) {
					console.log(`unsubscribed from ${token.symbol}`);
					return {
						type: REMOVE_SUB,
						payload: token
					};
				}
				if (error) {
					dispatch(setStatus(`Failed to unsubscribe ${tokenSymbol}`));
				}
			});
		}
	} else
		dispatch(
			setStatus(`removeSub didn't find a subscription for ${tokenSymbol}`)
		);
};

export function addTransaction(transaction) {
	return {
		type: ADD_TRANSACTION,
		payload: transaction
	};
}

export function setStatus(status) {
	toast.info(status, {
		position: toast.POSITION.BOTTOM_RIGHT,
		className: 'has-text-white center'
	});

	return {
		type: SET_STATUS,
		payload: status
	};
}

export function setMinValue(value) {
	return {
		type: SET_MIN_VAL,
		payload: value
	};
}
