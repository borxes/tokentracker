import React from 'react';
import { connect } from 'react-redux';

//displays only the last status
const TokenStatus = props => <div>{props.status[props.status.length - 1]}</div>;

export default connect(state => ({ status: state.status }))(TokenStatus);
