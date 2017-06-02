const express = require('express'),
      app = express(),
      router = require('./routes'),
      keythereum = require('keythereum');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Signature, X-Data');
  next();
});

app.use(router);

const server = app.listen(3008, () => {
  const port = server.address().port;
  console.log(`ETH Wallet Server listening at http://localhost:${port}`);
});
