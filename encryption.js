require('dotenv').config();
const crypto = require("crypto");

const encryption =  {
  generateHmac: function (xData, secretKey, algorithm, encoding) {
    encoding = encoding || "base64";
    algorithm = algorithm || "sha256";
    return crypto.createHmac(algorithm, secretKey).update(xData).digest(encoding);
  },
  verifySignature: function (xSignature, xData) {
    var signature = encryption.generateHmac(xData, process.env.HMAC_SECRET);
    if (signature === xSignature){
      return true;
    } else {
      return false;
    }
  },
  decodeData: function (data) {
    return JSON.parse(new Buffer(data, 'base64').toString());
  }
};

module.exports = encryption;
