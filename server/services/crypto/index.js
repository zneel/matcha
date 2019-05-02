"use strict";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const genHash = () => {
  return new Promise((resolve, _) => {
    const hash = crypto.randomBytes(80).toString("hex");
    return resolve(hash);
  });
};

const signJwt = payload => {
  return new Promise((resolve, reject) => {
    const privateKey = fs.readFileSync(`${process.cwd()}/private.pem`);
    jwt.sign(
      { data: payload },
      privateKey,
      { algorithm: "RS256", expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      }
    );
  });
};
module.exports = {
  genHash,
  signJwt
};
