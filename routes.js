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
  req.usersAndTransactions.createNewWallet(username, passphrase).then(function(encryptedWalletId) {
    res.send({encryptedWalletId});
  }).catch(function(reason) {
    debugger;
    res.send({success: 0, message: reason});
  });
});

router.get('/wallet/balance', (req, res) => {

});

module.exports = router;
