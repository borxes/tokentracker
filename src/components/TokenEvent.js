import React, { Component } from 'react';
import { createEtherscanLink, displayTokenValue } from './helpers';

export default class TokenEvent extends Component {
	render() {
		const transaction = this.props.transaction;
		const tokenAmount = displayTokenValue(
			transaction.returnValues.value,
			this.props.decimals
		);
		return (
			<tr>
				<td>{transaction.tokenSymbol}</td>
				<td>{transaction.event}</td>
				<td>{createEtherscanLink(transaction.transactionHash)}</td>
				<td>
					{transaction.returnValues.from
						? transaction.returnValues.from.slice(0, 7)
						: ''}
					...
				</td>
				<td>
					{transaction.returnValues.to
						? transaction.returnValues.to.slice(0, 7)
						: ''}
					...
				</td>
				<td>{tokenAmount}</td>
				<td>${(tokenAmount * this.props.tokenRate).toFixed(2)}</td>
				<td>
					<a href={`https://etherscan.io/block/${transaction.blockNumber}`}>
						{transaction.blockNumber}
					</a>
				</td>
				<td>{transaction.timeStamp}</td>
			</tr>
		);
	}
}
