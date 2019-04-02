const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const validation = require("../services/validation/user");
const User = require("../models/User");

const consts = require("../consts");

router.get("/me", (req, res, next) => {
  res.json("Hello user");
});

router.get("/:id(\\d+)", async (req, res, next) => {
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

router.get("/:limit(\\d+)/:offset(\\d+)/", async (req, res, next) => {
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
        const hashed = await bcrypt.hash(body.password, 10);
        body.password = hashed;
        const user = await User.register(body);
        return res.json(user);
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

router.put("/:id", (req, res, next) => {
  res.json("Hello user");
});

router.delete("/:id", (req, res, next) => {
  res.json("Hello user");
});

module.exports = router;
