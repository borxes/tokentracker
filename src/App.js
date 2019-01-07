import React, { Component } from 'react';

import './App.css';
import TokenEventsTable from './components/TokenEventsTable';
import TokenSelector from './components/TokenSelector';
import TokenStatus from './components/TokenStatus';

//import web3 from './web3';
//import { blockDateTime } from './components/helpers';

class App extends Component {
	render() {
		return (
			<div className="container is-fluid">
				<section class="hero is-medium has-text-black is-light is-bold">
					<div class="hero-body has-text-centered">
						<div class="container">
							<h1 class="title">ERC20 Tracker</h1>
							<h2 class="subtitle">Keep An Eye On ERC20 Token Transfers</h2>
						</div>
					</div>
				</section>
				<TokenStatus />
				<div className="columns">
					<div className="column is-one-quarter">
						<TokenSelector />
					</div>
					<div className="column">
						<div className="container is-fluid">
							<TokenEventsTable />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
