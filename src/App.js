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
				<section
					className="hero is-bold is-light mainHero"
					style={{ marginBottom: '5px' }}
				>
					<div className="hero-body has-text-centered ">
						<div className="container">
							<h1 className="title has-text-black is-size-1">ERC20 Tracker</h1>
							<h2 className="subtitle is-size-3 has-text-grey">
								<br />
								Keeping An Eye On Token Transfers
							</h2>
						</div>
					</div>
				</section>
				<div class="notification has-text-centered">
					ERC20 Tracker lets you watch token transfers{' '}
					<strong>in real time</strong> as they take place on the Ethereum
					blockchain.
					<br /> At the moment you can subscribe to any of the top 10 tokens by
					market cap and filter the token transfers by minimum USD value.
				</div>
				<TokenStatus />
				<div className="columns">
					<div className="column is-one-quarter">
						<TokenSelector />
					</div>
					<div className="column">
						<div className="eventsTable center">
							<TokenEventsTable />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
