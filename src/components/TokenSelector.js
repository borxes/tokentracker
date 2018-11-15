import React, { Component } from 'react';

export default class TokenSelector extends Component {
	state = {
		tokens: []
	};

	componentDidMount() {
		return;
	}

	render() {
		return (
			<div className="token-selector">
				<nav className="panel">
					<p className="panel-heading">Top 10 Tokens</p>
					<label className="panel-block is-active">
						<input type="checkbox" />
						<span className="panel-icon">
							<i className="fas fa-book" aria-hidden="true" />
						</span>
						0x
					</label>
					<label className="panel-block is-active">
						<input type="checkbox" />
						<span className="panel-icon">
							<i className="fas fa-book" aria-hidden="true" />
						</span>
						OMG
					</label>
				</nav>
			</div>
		);
	}
}
