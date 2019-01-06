import React, { Component } from 'react';

import './App.css';
import TokenEventsTable from './components/TokenEventsTable';
import TokenSelector from './components/TokenSelector';
import TokenStatus from './components/TokenStatus';

//import web3 from './web3';
//import { blockDateTime } from './components/helpers';

class App extends Component {
	componentWillUnmount() {
		//this.blockSubscription.unsubscribe();
	}

	getBlockTime = block => {
		//console.log(`getBlockTime called block=${block}`);
		/*
    if (this.blockTimes.has(block)) {
			let timeStr = blockDateTime(this.blockTimes.get(block));
			return timeStr;
    }
    */
		return 'use the Date class';
	};

	render() {
		return (
			<div className="container is-fluid">
				<div className="notification is-info">
					<TokenStatus />
				</div>
				<div className="columns">
					<div className="column is-one-quarter">
						<TokenSelector />
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
