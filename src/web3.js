const Web3 = require('web3');
//const web3 = new Web3('https://mainnet.infura.io');
const web3 = new Web3(
	new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws')
);

export default web3;
