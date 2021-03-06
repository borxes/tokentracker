import React, { Component } from 'react';
import { connect } from 'react-redux';
import TokenEvent from './TokenEvent';
import { displayTokenValue } from './helpers';

class TokenEventsTable extends Component {
	render() {
		return (
			<div>
				<table className="table is-bordered is-striped">
					<thead>
						<tr>
							<th>Type</th>
							<th>Hash</th>
							<th>From</th>
							<th>To</th>
							<th>Amount</th>
							<th>USD Value</th>
							<th>Block#</th>
							<th>Time</th>
						</tr>
					</thead>
					<tbody>
						{this.props.transactions ? (
							this.props.transactions.map(transaction => {
								const token = this.props.tokens.find(
									token => token.symbol === transaction.tokenSymbol
								);
								const tokenAmount = displayTokenValue(
									transaction.returnValues.value,
									token.decimals
								);
								const usdValue = token.price.rate * tokenAmount;
								return (
									// we show logged transaction even after token was unsubscribed
									//token.subscription.id &&
									usdValue >= this.props.minDisplayValue && (
										<TokenEvent
											transaction={transaction}
											key={transaction.transactionHash}
											usdValue={usdValue.toFixed(2)}
											tokenAmount={tokenAmount}
										/>
									)
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

function mapStateToProps(state) {
	return {
		tokens: state.tokens,
		transactions: state.transactions,
		minDisplayValue: state.settings.minDisplayValue
	};
}

export default connect(mapStateToProps)(TokenEventsTable);
