const crypto = require('crypto');
module.exports = function (secret) {
    var mima = secret+"";
    const hash = crypto.createHash('md5').update(mima).digest('hex');
   return hash;
}