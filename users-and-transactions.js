"use strict";
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const ethers = require('ethers-wallet');
const providers = require('ethers').providers;
const provider = new providers.JsonRpcProvider();
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
          resolve(JSON.parse(encryptedWallet).id);
        }).catch((reason) => reject(reason));
      }).catch((reason) => reject(reason));
    }).catch((reason) => reject(reason));
  });
};

UsersAndTransactions.prototype.createWallet = function(username, passphrase) {
  return new Promise((resolve, reject) => {
    try {
      fs.statSync("./wallets/" + username + ".dat").isFile();
      reject("Wallet with your username already exists!")
    } catch (e) {
      const privateKey = web3.sha3(passphrase);
      const wallet = new ethers.Wallet(privateKey);
      resolve(wallet);
    }
  });
};

UsersAndTransactions.prototype.encryptWallet = function(wallet, passphrase, username) {
  return new Promise((resolve, reject) => wallet.encrypt(passphrase, (percent) => {
    console.log("Encrypting: " + parseInt(percent * 100) + "% complete");
  }).then((json) => resolve(json)));
};

UsersAndTransactions.prototype.writeEncryptedWallet = function(encryptedWallet) {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync('./wallets/')) {
        fs.mkdirSync('./wallets/');
      }
      fs.writeFileSync('./wallets/' + this.username + '.dat', encryptedWallet);
      resolve(encryptedWallet);
    } catch(e) {
      reject(e);
    }
  });
};

UsersAndTransactions.prototype.getBalance = function(address) {
  return web3.eth.getBalance(address);
};


module.exports = UsersAndTransactions;
