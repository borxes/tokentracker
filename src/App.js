import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import TokenEventsTable from './components/TokenEventsTable';
import TokenSelector from './components/TokenSelector';
import TokenStatus from './components/TokenStatus';
import web3 from './web3';
import { blockDateTime } from './components/helpers';

// number of tokens available for tracking
const TOKENLIMIT = 10;

class App extends Component {
	blockTimes = new Map(); //block number to timestamp mapping
	blockSubscription = null;

	state = {
		currentBlock: 0,
		status: '',
		topTokens: []
	};

	componentDidMount() {
		// listen to all new blocks in order to obtain timestamps
		// theoretically we can analyze each block and extract token events from it
		this.blockSubscription = web3.eth
			.subscribe('newBlockHeaders', function(error, result) {
				if (error) {
					console.error(error);
				}
			})
			.on('data', blockHeader => {
				if (blockHeader.number) {
					this.setState({
						status: `adding block ${blockHeader.number} timestamp=${
							blockHeader.timestamp
						}`
					});
					this.blockTimes.set(blockHeader.number, blockHeader.timestamp);
					this.setState({
						currentBlock: blockHeader.number
					});
				}
			})
			.on('error', console.error);

		// obtain the list of top token from ethplorer.io
		fetch(
			`https://api.ethplorer.io/getTop?apiKey=freekey&criteria=cap&limit=${TOKENLIMIT}`
		)
			.then(response => response.json())
			.then(json => {
				let tokens = json.tokens.slice(1); // ignore ETH as the first returned result
				this.setState({
					status:
						'Retrieved the list of top ERC20 tokens by market cap: ' +
						tokens
							.slice(1)
							.map(token => token.symbol)
							.join(' '),
					topTokens: tokens
				});
			});
	}

	componentWillUnmount() {
		this.blockSubscription.unsubscribe();
	}

	getBlockTime = block => {
		//console.log(`getBlockTime called block=${block}`);
		if (this.blockTimes.has(block)) {
			let timeStr = blockDateTime(this.blockTimes.get(block));
			return timeStr;
		}
	};

	render() {
		return (
			<div className="container is-fluid">
				<div className="notification is-info tokenStatus">
					<TokenStatus status={this.state.status} />
				</div>
				<div className="columns">
					<div className="column is-one-quarter">
						<TokenSelector tokens={this.state.topTokens} />
					</div>
					<div className="column is-three-quarters">
						<TokenEventsTable getBlockTime={this.getBlockTime} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
