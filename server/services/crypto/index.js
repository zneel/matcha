"use strict";
const crypto = require("crypto");

const genmd5  = () => {
  return new Promise((resolve, reject) => {
    const randomBytes = crypto.randomBytes(70);
    const hash = crypto.createHash('md5', randomBytes);
    return resolve(hash.digest('hex'));
  })
}

module.exports = genmd5;
