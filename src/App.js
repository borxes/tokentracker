import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import TokenEventsTable from './components/TokenEventsTable';
import TokenSelector from './components/TokenSelector';
import web3 from './web3';
import { blockDateTime } from './components/helpers';

class App extends Component {
	blockTimes = new Map(); //block number to timestamp mapping
	blockSubscription = null;

	state = {
		currentBlock: 0
	};

	componentDidMount() {
		this.blockSubscription = web3.eth
			.subscribe('newBlockHeaders', function(error, result) {
				if (error) {
					console.error(error);
				}
			})
			.on('data', blockHeader => {
				if (blockHeader.number) {
					console.log(
						`adding block ${blockHeader.number} timestamp=${
							blockHeader.timestamp
						}`
					);
					this.blockTimes.set(blockHeader.number, blockHeader.timestamp);
					this.setState({
						currentBlock: blockHeader.number
					});
				}
			})
			.on('error', console.error);
	}

	componentWillUnmount() {
		this.blockSubscription.unsubscribe();
	}

	getBlockTime = block => {
		console.log(`getBlockTime called block=${block}`);
		if (this.blockTimes.has(block)) {
			let timeStr = blockDateTime(this.blockTimes.get(block));
			console.log(`block ${block} timestamp found ${timeStr}`);
			return timeStr;
		} else console.log(`block ${block} timestamp not found bliad`);
	};

	render() {
		return (
			<div className="columns">
				<div className="column is-one-quarter">
					<TokenSelector />
				</div>
				<div className="column is-three-quarters">
					<TokenEventsTable getBlockTime={this.getBlockTime} />
				</div>
			</div>
		);
	}
}

export default App;
