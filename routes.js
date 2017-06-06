const UsersAndTransactions = require('./users-and-transactions.js');
const express = require('express'),
      router = express.Router();

router.all('/*', (req, res, next) => {
  var usersAndTransactions = new UsersAndTransactions(req.decodedData.username);
  req.usersAndTransactions = usersAndTransactions;
  next();
});

router.post('/wallet/new', (req, res) => {
  let passphrase = req.decodedData.passphrase;
  let username = req.usersAndTransactions.username;
  req.usersAndTransactions.createNewWallet(username, passphrase).then(function(address) {
    res.send({address});
  }).catch(function(reason) {
    res.send({success: 0, message: reason});
  });
});

router.post('/send', (req, res) => {
  let address = req.decodedData.address;
  let amount = req.decodedData.amount;
  req.usersAndTransactions.sendToExternal(address, amount);
});

router.post('/ethereum/get_balance', (req, res) => {
  let address = req.decodedData.address;
  let balance = req.usersAndTransactions.getUserBalance(address).then((balance) => {
    res.send({balance});
  });
});

module.exports = router;
