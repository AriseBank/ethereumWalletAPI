"use strict";
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const ethers = require('ethers-wallet');
const fs = require('fs');

var UsersAndTransactions = function(username) {
  this.web3 = web3;
  this.username = username;
};

UsersAndTransactions.prototype.createNewWallet = function(username, passphrase) {
  return new Promise((resolve, reject) => {
    this.createWallet(username, passphrase).then((wallet) => {
      this.encryptWallet(wallet, passphrase).then((encryptedWallet) => {
        this.writeEncryptedWallet(encryptedWallet).then((encryptedWallet) => {
          const encryptedWalletId = JSON.parse(encryptedWallet).id;
          resolve(encryptedWalletId);
        }).catch(function(reason) {
          reject(reason);
        });
      }).catch(function(reason) {
        reject(reason);
      });
    }).catch(function(reason) {
      reject(reason);
    });
  });
};

UsersAndTransactions.prototype.createWallet = function(username, passphrase) {
  return new Promise(function (resolve, reject) {
    try {
      fs.statSync("./wallets/" + 'asdas' + ".dat").isFile();
      reject("Wallet with your username already exists!")
    } catch (e) {
      const privateKey = web3.sha3(passphrase);
      const wallet = new ethers.Wallet(privateKey);
      resolve(wallet);
    }
  }.bind(this));
};

UsersAndTransactions.prototype.encryptWallet = function(wallet, passphrase, username) {
  return new Promise(function (resolve, reject) {
    wallet.encrypt(passphrase, function(percent) {
      console.log("Encrypting: " + parseInt(percent * 100) + "% complete");
    }).then(function(json) {
      resolve(json);
    });
  });
};

UsersAndTransactions.prototype.writeEncryptedWallet = function(encryptedWallet) {
  return new Promise(function (resolve, reject) {
    try {
      if (!fs.existsSync('./wallets/')) {
        fs.mkdirSync('./wallets/');
      }
      debugger;
      fs.writeFileSync('./wallets/' + 'asdf' + '.dat', encryptedWallet);
      resolve(encryptedWallet);
    } catch(e) {
      reject(e);
    }
  }.bind(this));
};

UsersAndTransactions.prototype.getBalance = function(address) {
  return web3.eth.getBalance(address);
};


module.exports = UsersAndTransactions;
