import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTopTokens } from '../actions';

class TokenSelector extends Component {
	componentDidMount() {
		this.props.dispatch(fetchTopTokens());
	}

	render() {
		return (
			<div className="token-selector">
				<nav className="panel">
					<p className="panel-heading">Top 10 Tokens</p>
					{this.props.tokens.map(token => {
						return (
							<label className="panel-block is-active" key={token.symbol}>
								<input type="checkbox" />
								<span className="panel-icon">
									<i className="fas fa-book" aria-hidden="true" />
								</span>
								{token.symbol}
							</label>
						);
					})}
				</nav>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tokens: state.tokens
	};
}

export default connect(mapStateToProps)(TokenSelector);
