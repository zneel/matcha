const express = require("express");
const router = express.Router();
const validation = require("../services/validation/user");
const User = require("../models/User");
const consts = require("../consts");

router.get("/me", (req, res, next) => {
  res.json("Hello user");
});

router.get("/:id(\\d+)", async (req, res, next) => {
  if (!req.params.id <= 0) {
    const user = await User.getUser(req.params.id);
    if (!user || user.length === 0) {
      return next({ msg: consts.USER_NOT_FOUND, code: 404 });
    }
    return res.json(user);
  }
  const error = new Error(consts.BAD_REQUEST);
  error.code = 400;
  return next(error);
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
        const user = await User.addUser(body);
        return res.json(user);
      } catch (e) {
        if (e) {
          return next(e);
        }
      }
    }
  }
  return next();
});

router.put("/:id", (req, res, next) => {
  res.json("Hello user");
});

router.delete("/:id", (req, res, next) => {
  res.json("Hello user");
});
module.exports = router;
