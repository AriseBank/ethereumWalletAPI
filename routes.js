const UsersAndTransactions = require('./users-and-transactions.js');
const express = require('express'),
      router = express.Router();

router.all('/*', (req, res, next) => {
  debugger;
  var usersAndTransactions = new UsersAndTransactions(req.decodedData.username);
  req.usersAndTransactions = usersAndTransactions;
  next();
});

router.post('/wallet/new', (req, res) => {
  let passphrase = req.body.passphrase;
  let username = req.usersAndTransaction.username;
  req.usersAndTransactions.createWallet(username, passphrase, function(wallet) {
    res.send({address: wallet.address});
  });
});

router.get('/wallet/:address/balance', (req, res) => {
});

module.exports = router;
