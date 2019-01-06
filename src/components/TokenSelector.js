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
		/* localStorage is buggy atm
    localStorage.setItem(
			LOCAL_SUB_KEY,
			JSON.stringify(this.props.subscriptions.map(sub => sub.token))
    );
    */
	};

	async componentDidMount() {
		//await so that we don't try to subscribe to tokens before retrieving them
		await this.props.dispatch(fetchTopTokens());
		let tokensChecked = {};
		this.props.tokens.forEach(
			token => (tokensChecked[token.symbol] = token.subscribed) // thank you eslint
		);
		this.setState({ checked: tokensChecked });
		/* local Storage has a nasty bug atm (multiplying subs)
    const localSubs = JSON.parse(localStorage.getItem(LOCAL_SUB_KEY));
		if (localSubs) {
			localSubs.forEach(sub => {
				//console.log('component mounting, trying to sub to ', sub);
				this.props.dispatch(addSub(sub, this.props.tokens));
			});
    }
    */
	}

	render() {
		return (
			<div className="token-selector">
				<nav className="panel">
					<p className="panel-heading">Top 10 Tokens</p>
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
