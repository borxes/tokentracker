import React, { Component } from 'react';
import { createEtherscanLink } from './helpers';

export default class TokenEvent extends Component {
	render() {
		const transaction = this.props.transaction;
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
				<td>{this.props.tokenAmount}</td>
				<td>${this.props.usdValue}</td>
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
