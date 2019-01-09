import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider/';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

import {
	fetchTopTokens,
	setStatus,
	addSub,
	removeSub,
	setMinValue
} from '../actions';

const Handle = Slider.Handle;
const handle = props => {
	const { value, dragging, index, ...restProps } = props;
	return (
		<Tooltip
			prefixCls="rc-slider-tooltip"
			overlay={'$' + value}
			visible={dragging}
			placement="top"
			key={index}
		>
			<Handle value={value} {...restProps} />
		</Tooltip>
	);
};

class TokenSelector extends Component {
	// keep local state for checkboxes
	state = {
		checked: {},
		minValue: 0
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

	handleSlider = value => {
		console.log(`Filtering transactions by minimum value ${value}`);
		this.setState({ minValue: value });
		this.props.dispatch(setMinValue(value));
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
							<label className="panel-block is-outlined" key={token.symbol}>
								<input
									type="checkbox"
									checked={this.state.checked[token.symbol] ? 'checked' : ''}
									onChange={this.handleClick}
									id={token.symbol}
								/>
								<span className="panel-icon">
									<i className="fas fa-book" aria-hidden="true" />
								</span>
								{token.symbol} - {token.name}
							</label>
						);
					})}
					<div className="panel-block">
						{/* eslint-disable-next-line*/}
						<a
							className="button is-link is-outlined is-fullwidth"
							onClick={this.checkAll}
						>
							Check All
						</a>
						{/* eslint-disable-next-line*/}
						<a
							className="button is-link is-outlined is-fullwidth"
							onClick={this.unCheckAll}
						>
							Uncheck All
						</a>
					</div>
				</nav>
				<nav className="level">
					<div className="level-item has-text-centered">
						Filter by Minimum Transaction Value: ${this.state.minValue}
					</div>
				</nav>
				<nav className="level">
					<div className="level-item has-text-centered">
						<Slider
							defaultValue={0}
							min={0}
							max={10000}
							handle={handle}
							onChange={this.handleSlider}
						/>
					</div>
				</nav>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tokens: state.tokens,
		settings: state.settings
	};
}

export default connect(mapStateToProps)(TokenSelector);
