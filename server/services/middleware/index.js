"use strict";
const jwt = require("jsonwebtoken");
const consts = require("../../consts");
const fs = require("fs");


const checkToken = (req, res, next) => {
  if (req.headers['authorization']) {
    let token = req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length)
    }
    if (token) {
      fs.readFile(`${process.cwd()}/public.pub`, 'utf8', (err, data) => {
        if (err) {return next({msg:consts.SERVER_ERROR, code: 500})}
        jwt.verify(token, data, (err, decoded) => {
          if (err) {return next({msg:consts.UNAUTHORIZED, code:403})}
          req.user = decoded.data;
          delete req.user.password;
          return next();
          console.log('asdasd');
        });
      });
    } else {
      return next({msg:consts.BAD_REQUEST, code:400})
    }
  }
  else {
    return next({msg:consts.UNAUTHORIZED, code:403})
  }
};

module.exports = {
  checkToken
}
