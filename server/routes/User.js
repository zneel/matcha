"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer  = require('multer')
const validation = require("../services/validation/user");
const crypto = require("../services/crypto");
const User = require("../models/User");
const mail = require("../services/mail");
const consts = require("../consts");
const upload = multer({ dest: `${process.cwd()}/uploads` })
const middleware = require('../services/middleware');

router.get("/me", middleware.checkToken, (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  }
});

router.post("/login", async (req, res, next) => {
  if (req.body) {
    const {body} = req;
    if ((body.username && validation.validateUsername(body.username)) && 
      (body.password && validation.validatePassword(body.password))) {
      try {
        const user = await User.loginUser(body.username);
        if (user.rowCount === 0) {
          return next({ msg: consts.USER_NOT_FOUND, code: 404})
        }
        const validPassword = await bcrypt.compare(body.password, user.rows[0].password)
        if (validPassword) {
          const token = await crypto.signJwt(user.rows[0]);
          return res.json({token: token});
        } else {
          return next({msg:consts.UNAUTHORIZED, code: 403});
        }
      } catch (e) {
        return next({msg: consts.SERVER_ERROR, code: 500})
      }
    }
  }
  return next({ msg: consts.BAD_REQUEST, code: 400 });
});

router.post("/logout", middleware.checkToken, async (req, res, next) => {

})

router.get("/:id(\\d+)", middleware.checkToken,async (req, res, next) => {
  try {
    const user = await User.getUser(req.params.id);
    if (!user.rows[0] || user.rows.length === 0) {
      return next({ msg: consts.USER_NOT_FOUND, code: 404 });
    }
    delete user.rows[0].password;
    return res.json(user.rows[0]);
  } catch (e) {
    return next({ msg: consts.BAD_REQUEST, code: 400 });
  }
});

router.get("/:limit(\\d+)/:offset(\\d+)/", middleware.checkToken,async (req, res, next) => {
  if (req.params.limit >= 0 || !req.params.offset >= 0) {
    try {
      const users = await User.getUsers(offset, limit);
      if (!user.rows[0] || user.rows.length === 0) {
        return next({ msg: consts.NO_USERS, code: 404 });
      }
      return res.json(users);
    } catch (e) {
      return next({ msg: consts.BAD_REQUEST, code: 400 });
    }
  }
  return next({ msg: consts.BAD_REQUEST, code: 400 });
});

router.post("/register", async (req, res, next) => {
  if (req.body) {
    const { body } = req;
    if (
      body.email &&
      validation.validateEmail(body.email) &&
      (body.username && validation.validateUsername(body.username)) &&
      (body.firstname && validation.validateName(body.firstname)) &&
      (body.lastname && validation.validateName(body.lastname)) &&
      (body.password && validation.validatePassword(body.password))
    ) {
      try {
        const hashed = bcrypt.hash(body.password, 10);
        const confirmationHash = crypto.genHash();
        body.password = await hashed;
        body.confirmationHash = await confirmationHash;
        const confirmUrl = `http://${req.hostname}:${process.env.PORT || 3000}/user/confirm/${body.confirmationHash}`;
        const user = await User.register(body);
        await mail(body.email, body.firstname, body.lastname, confirmUrl);
        return res.json(user.rows[0])
      } catch (e) {
        if (e.code === "23505") {
          return next({ msg: consts.USER_EXISTS, code: 409 });
        }
        return next({ msg: consts.BAD_REQUEST, code: 400 });
      }
    }
  }
  return next({ msg: consts.BAD_REQUEST, code: 400 });
});

router.put("/:id", middleware.checkToken,(req, res, next) => {
  res.json("Hello user");
});

router.delete("/:id", middleware.checkToken,(req, res, next) => {
  res.json("Hello user");
});

router.get("/confirm/:confirmationHash", async (req, res, next) => {
  if (req.params.confirmationHash) {
    try {
      const confirmUser = await User.confirmUser(req.params.confirmationHash);
      return res.json(confirmUser);
    } catch(e) {
      return next({ msg: consts.CANNOT_CONFIRM, code: 500 });
    }
  }
  return next({ msg: consts.BAD_REQUEST, code: 400 });
});

module.exports = router;
