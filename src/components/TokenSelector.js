import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	fetchTopTokens,
	setStatus,
	addSub,
	removeSub
	//LOCAL_SUB_KEY
} from '../actions';

class TokenSelector extends Component {
	// keep local state for checkboxes
	state = {
		checked: {}
	}; // token: checked

	handleClick = event => {
		let id = event.target.id;
		let tokensChecked = this.state.checked;
		tokensChecked[id] = !tokensChecked[id]; // flip the checked state
		this.props.dispatch(
			setStatus(`${id} subscription ${tokensChecked[id] ? 'on' : 'off'}`)
		);
		this.setState({ checked: tokensChecked });
		this.props.dispatch(
			tokensChecked[id]
				? addSub(id, this.props.tokens)
				: removeSub(id, this.props.tokens)
		);
	};

	checkAll = event => {
		let currentlyChecked = this.state.checked;
		this.props.tokens.forEach(token => {
			currentlyChecked[token.symbol] = true;
			this.props.dispatch(addSub(token.symbol, this.props.tokens));
		});
		this.setState({ checked: currentlyChecked });
		this.props.dispatch(setStatus(`Subscribing to all tokens`));
	};

	unCheckAll = event => {
		let currentlyChecked = this.state.checked;
		this.props.tokens.forEach(token => {
			currentlyChecked[token.symbol] = false;
			this.props.dispatch(removeSub(token.symbol, this.props.tokens));
		});
		this.setState({ checked: currentlyChecked });
		this.props.dispatch(setStatus(`Unsubscribing from all tokens`));
	};

	async componentDidMount() {
		//await so that we don't try to subscribe to tokens before retrieving them
		await this.props.dispatch(fetchTopTokens());
		let tokensChecked = {};
		this.props.tokens.forEach(
			token => (tokensChecked[token.symbol] = token.subscribed) // thank you eslint
		);
		this.setState({ checked: tokensChecked });
	}

	render() {
		return (
			<div className="token-selector">
				<nav className="panel">
					<p className="panel-heading">Top 10 ERC20 tokens by market cap</p>
					{this.props.tokens.map(token => {
						return (
							<label className="panel-block is-active" key={token.symbol}>
								<input
									type="checkbox"
									checked={this.state.checked[token.symbol] ? 'checked' : ''}
									onChange={this.handleClick}
									id={token.symbol}
								/>
								<span className="panel-icon">
									<i className="fas fa-book" aria-hidden="true" />
								</span>
								{token.symbol}
							</label>
						);
					})}
					<div className="panel-block">
						<a
							className="button is-link is-outlined is-fullwidth"
							onClick={this.checkAll}
						>
							Check All
						</a>
						<a
							className="button is-link is-outlined is-fullwidth"
							onClick={this.unCheckAll}
						>
							Uncheck All
						</a>
					</div>
				</nav>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tokens: state.tokens,
		subscriptions: state.subscriptions
	};
}

export default connect(mapStateToProps)(TokenSelector);
