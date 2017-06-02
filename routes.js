const UsersAndTransactions = require('./users-and-transactions.js');
const express = require('express'),
      router = express.Router();

router.all('/*', (req, res, next) => {
  var usersAndTransactions = new UsersAndTransactions(req.address);
  req.usersAndTransactions = usersAndTransactions;
  next();
});

router.post('/wallet/new', (req, res) => {
  let passphrase = req.passphrase;
  req.usersAndTransactions.createWallet(passphrase, function(wallet) {
    res.send({address: wallet.address});
  });
});

router.get('/wallet/:address/balance', (req, res) => {
  debugger;
});

module.exports = router;
