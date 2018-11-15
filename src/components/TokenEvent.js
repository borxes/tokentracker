import React, { Component } from 'react';
import { createEtherscanLink, displayTokenValue } from './helpers';

export default class TokenEvent extends Component {
	render() {
		return (
			<tr>
				<td>{this.props.token}</td>
				<td>{this.props.event}</td>
				<td>{createEtherscanLink(this.props.transactionHash)}</td>
				<td>
					{this.props.from ? this.props.from.slice(0, 7) : ''}
					...
				</td>
				<td>
					{this.props.to ? this.props.to.slice(0, 7) : ''}
					...
				</td>
				<td>{displayTokenValue(this.props.value)}</td>
				<td>
					<a href={`https://etherscan.io/block/${this.props.block}`}>
						{this.props.block}
					</a>
				</td>
				<td>{this.props.timestamp}</td>
			</tr>
		);
	}
}
