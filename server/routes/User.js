const express = require("express");
const router = express.Router();
const validation = require("../services/validation/user");
const User = require("../models/User");

const consts = require("../consts");

router.get("/me", (req, res, next) => {
  res.json("Hello user");
});

router.get("/:id(\\d+)", async (req, res, next) => {
  if (req.params.id >= 0) {
    try {
      const user = await User.getUser(req.params.id);
      if (!user || user.length === 0) {
        return next({ msg: consts.USER_NOT_FOUND, code: 404 });
      }
      delete user.password;
      return res.json(user);
    } catch (e) {
      const error = new Error(consts.BAD_REQUEST);
      error.code = 400;
      return next(error);
    }
  }
});

router.get("/:offset(\\d+)/:limit(\\d+)/", async (req, res, next) => {
  if (req.params.offset >= 0 || !req.params.offset >= 0) {
    try {
      const users = await User.getUsers(offset, limit);
      if (!users || users.length === 0) {
        return next({ msg: consts.NO_USERS, code: 404 });
      }
      return res.json(users);
    } catch (e) {
      const error = new Error(consts.BAD_REQUEST);
      error.code = 400;
      return next(error);
    }
  }
});

router.post("/register", async (req, res, next) => {
  if (req.body) {
    const { body } = req;
    if (
      body.email &&
      validation.validateEmail(body.email) &&
      (body.username && validation.validateUsername(body.username)) &&
      (body.name && validation.validateName(body.name)) &&
      (body.surname && validation.validateName(body.surname)) &&
      (body.password && validation.validatePassword)
    ) {
      try {
        const user = await User.register(body);
        return res.json(user);
      } catch (e) {
        if (e) {
          return next(e);
        }
      }
    }
  }
  const error = new Error(consts.BAD_REQUEST);
  error.code = 400;
  return next(error);
});

router.put("/:id", (req, res, next) => {
  res.json("Hello user");
});

router.delete("/:id", (req, res, next) => {
  res.json("Hello user");
});

module.exports = router;
