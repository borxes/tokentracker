import React from 'react';
// Helper functions

export function createEtherscanLink(transactionHash) {
	if (transactionHash) {
		return (
			<a href={`https://etherscan.io/tx/${transactionHash}`}>
				{`${transactionHash.slice(0, 8)}...`}
			</a>
		);
	}
}

// convert the token value from web3.js into a normalized form
export function displayTokenValue(value, decimals = 18) {
	//console.log('tokenValue: ', value);
	return Number((value / Math.pow(10, decimals)).toFixed(3));
}

export function blockDateTime(timestamp) {
	let date = new Date(timestamp * 1000);
	return date.toTimeString().split(' ')[0];
}
