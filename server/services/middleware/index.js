"use strict";
const jwt = require("jsonwebtoken");
const consts = require("../../consts");
const fs = require("fs");


const checkToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
  const privateKey = fs.readFileSync(`${process.cwd()}/private.key`);
  console.log(privateKey)
  if (token) {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {return next({msg:consts.UNAUTHORIZED, code:403})}
      req.user = decoded;
      return next();
    });
  }
  return next({msg:consts.BAD_REQUEST, code:400})
};

module.exports = {
  checkToken
}
