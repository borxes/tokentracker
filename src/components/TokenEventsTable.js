import React, { Component } from 'react';
import { connect } from 'react-redux';
import TokenEvent from './TokenEvent';

class TokenEventsTable extends Component {
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
								return (
									<TokenEvent
										transaction={transaction}
										key={transaction.transactionHash}
										tokenRate={token.price.rate}
										decimals={token.decimals}
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

function mapStateToProps(state) {
	return {
		tokens: state.tokens,
		transactions: state.transactions
	};
}

export default connect(mapStateToProps)(TokenEventsTable);
