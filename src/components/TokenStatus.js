import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//displays only the last status
class TokenStatus extends React.Component {
	render() {
		return <ToastContainer autoClose={4000} />;
	}
}

export default connect(state => ({ status: state.status }))(TokenStatus);
