import React, { Component } from 'react';
import { createEtherscanLink, displayTokenValue } from './helpers';

export default class TokenEvent extends Component {
	state = { tokenSymbol: '' };

	async componentDidMount() {
		// bad code because it queries the API for each token event instead of caching

		/*let request = `https://api.ethplorer.io/getTokenInfo/${
			this.props.token
		}?apiKey=freekey`;
		const response = await fetch(request);
		const json = await response.json();
		this.setState({
			tokenSymbol: json.symbol
    });*/
		return;
	}

	render() {
		return (
			<tr>
				<td>{this.state.tokenSymbol}</td>
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
