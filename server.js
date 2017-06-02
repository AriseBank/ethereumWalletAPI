const express = require('express'),
      app = express(),
      router = require('./routes'),
      keythereum = require('keythereum'),
      bodyParser = require('body-parser'),
      encryption = require('./encryption');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3003');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Signature, X-Data');
  next();
});

var verifyHeaders = function (req, res, next) {
  debugger;
  var signature = req.header('X-Signature');
  var data = req.header('X-Data');
  var decodedData = encryption.decodeData(data);
  req.decodedData = decodedData;
  if (typeof signature === 'undefined' || typeof data === 'undefined') {
    res.send({message: 'Signature not found.'});
  } else {
    console.log(encryption.verifySignature(signature, data));
    if (encryption.verifySignature(signature, data) === false) {
      next();
    } else {
      res.send({success: 0, message: 'Invalid Signature.'});
    }
  }
};

app.use(verifyHeaders);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const server = app.listen(3008, () => {
  const port = server.address().port;
  console.log(`ETH Wallet Server listening at http://localhost:${port}`);
});
