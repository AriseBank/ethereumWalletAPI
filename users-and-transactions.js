const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const ethers = require('ethers-wallet');

var UsersAndTransactions = function(address) {
  this.web3 = web3;
};

UsersAndTransactions.prototype.createWallet = function(passphrase, callback) {
  const privateKey = web3.sha3(passphrase);
  const wallet = new ethers.Wallet(privateKey);
  return callback(wallet);
};


module.exports = UsersAndTransactions;
