const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const ethers = require('ethers-wallet');
const fs = require('fs');

var UsersAndTransactions = function(address, username) {
  this.web3 = web3;
  this.username = username;
};

UsersAndTransactions.prototype.createWallet = function(username, passphrase, callback) {
  const privateKey = web3.sha3(passphrase);
  const wallet = new ethers.Wallet(privateKey);
  this.encryptWallet(wallet, passphrase, function(encryptedWallet) {
    if (!fs.existsSync('./wallets/')) {
      fs.mkdirSync('./wallets/');
    }
    fs.writeFileSync('./wallets/' + username, json);
  });
  return callback(wallet);
};

UsersAndTransactions.prototype.encryptWallet = function(wallet, passphrase) {
  wallet.encrypt(passphrase, function(percent) {
    console.log("Encrypting: " + parseInt(percent * 100) + "% complete");
  }).then(function(json) {
    return json;
  });
};


module.exports = UsersAndTransactions;
