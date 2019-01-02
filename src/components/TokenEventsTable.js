import React, { Component } from 'react';
import TokenEvent from './TokenEvent';
import erc20ABI from '../abi/erc20ABI.js';

import web3 from '../web3';

const ZRX_ADDR = '0xE41d2489571d322189246DaFA5ebDe1F4699F498';
const LOCAL_STORAGE_KEY = 'trans1';

export default class TokenEventsTable extends Component {
	state = {
		subscriptions: [],
		transactions: [], //should be events actually
		blockTimes: {}, // block number to readable timestamp string mapping
		tokenNames: {} // token contract address => token name mapping
	};

	eventHashes = new Set();

	componentDidMount() {
		//console.log(JSON.stringify(web3));
		const zrx = erc20ABI;
		//console.log(JSON.stringify(zrx));
		const zrxToken = new web3.eth.Contract(zrx, ZRX_ADDR);
		// zrxToken.methods
		// 	.totalSupply().call().then(console.log);

		// read something from the storage so that the table is not empty
		// TODO - switch to Firebase sync
		const localTransactions = JSON.parse(
			localStorage.getItem(LOCAL_STORAGE_KEY)
		);
		if (localTransactions) {
			this.setState({
				transactions: localTransactions
			});
		}

		let sub = zrxToken.events.allEvents(
			/*{ fromBlock: 'latest' },*/ (error, event) => {
				let eventHash = event.transactionHash;
				if (event) {
					if (this.eventHashes.has(eventHash)) {
						console.log(`event ${eventHash} already added`);
						return;
					} else {
						this.eventHashes.add(eventHash);
						event.timestamp = this.props.getBlockTime(event.blockNumber);
						this.setState({
							transactions: [event, ...this.state.transactions]
						});

						//DEBUG
						//console.log(`new Transaction Detected: ${JSON.stringify(event)}`);
						//DEBUG

						// save the first 10 transactions into local storage for debug purposes
						if (this.state.transactions.length <= 10) {
							localStorage.setItem(
								LOCAL_STORAGE_KEY,
								JSON.stringify(this.state.transactions.slice(0, 10))
							);
						}
					}
				}
				if (error) {
					console.error('error');
				}
			}
		);
		//let sub2 = zrxToken.events.allEvents({}, console.log);
		this.state.subscriptions.push(sub);
	}

	render() {
		return (
			<div>
				<table className="table is-bordered is-striped">
					<thead>
						<tr>
							<th>Token</th>
							<th>Type</th>
							<th>Hash</th>
							<th>From</th>
							<th>To</th>
							<th>Amount</th>
							<th>Block#</th>
							<th>Time</th>
						</tr>
					</thead>
					<tbody>
						{this.state.transactions ? (
							this.state.transactions.map(transaction => {
								return (
									<TokenEvent
										key={transaction.transactionHash}
										event={transaction.event}
										transactionHash={transaction.transactionHash}
										from={transaction.returnValues._from}
										to={transaction.returnValues._to}
										value={transaction.returnValues._value}
										token={transaction.address}
										block={transaction.blockNumber}
										timestamp={this.props.getBlockTime(transaction.blockNumber)}
									/>
								);
							})
						) : (
							<tr>
								<td>No transactions found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}
