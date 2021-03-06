"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const validation = require("../services/validation/user");
const crypto = require("../services/crypto");
const User = require("../models/User");
const mail = require("../services/mail");
const consts = require("../consts");
const middleware = require("../services/middleware");

router.get("/me", middleware.checkToken, (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  }
});

router.post("/login", async (req, res, next) => {
  if (req.body) {
    const { body } = req;
    if (body.username && body.password) {
      try {
        const user = await User.loginUser(body.username);
        if (user.rowCount === 0) {
          return next({ msg: consts.UNAUTHORIZED, code: 403 });
        }
        const validPassword = await bcrypt.compare(
          body.password,
          user.rows[0].password
        );
        if (validPassword) {
          const token = await crypto.signJwt(user.rows[0]);
          return res.json({ token: token });
        } else {
          return next({ msg: consts.UNAUTHORIZED, code: 403 });
        }
      } catch (e) {
        console.log(e);
        return next({ msg: consts.SERVER_ERROR, code: 500 });
      }
    }
  }
  return next({ msg: consts.BAD_REQUEST, code: 400 });
});

/**
 * @TODO implement logout
 */
router.post("/logout", middleware.checkToken, async (req, res, next) => {});

router.get("/:id(\\d+)", middleware.checkToken, async (req, res, next) => {
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

router.get(
  "/:limit(\\d+)/:offset(\\d+)/",
  middleware.checkToken,
  async (req, res, next) => {
    if (!parseInt(req.params.limit) >= 0 || !parseInt(req.params.offset) >= 0) {
      const { limit, offset } = req.params;
      try {
        const users = await User.getUsers(parseInt(limit), parseInt(offset));
        if (!users.rows || users.rows.length === 0) {
          return next({ msg: consts.NO_USERS, code: 404 });
        }
        const sanitizeUsers = users.rows.map(({ password, ...e }) => e);
        return res.json(sanitizeUsers);
      } catch (e) {
        return next({ msg: consts.BAD_REQUEST, code: 400 });
      }
    }
    return next({ msg: consts.BAD_REQUEST, code: 400 });
  }
);

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
        const confirmUrl = `http://${req.hostname}:${process.env.PORT ||
          3000}/user/confirm/${body.confirmationHash}`;
        const user = await User.register(body);
        await mail(body.email, body.firstname, body.lastname, confirmUrl);
        return res.json(user.rows[0]);
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

router.put("/:id", middleware.checkToken, async (req, res, next) => {
  if (req.body) {
    const { body, user } = req;
    if (
      (body.email && validation.validateEmail(body.email)) ||
      (body.username && validation.validateUsername(body.username)) ||
      (body.firstname && validation.validateName(body.firstname)) ||
      (body.lastname && validation.validateName(body.lastname)) ||
      (body.password && validation.validatePassword(body.password)) ||
      (body.dob && validation.validateDob(body.dob)) ||
      (body.city && validation.validateString(body.city)) ||
      (body.country && validation.validateString(body.country)) ||
      (body.lat && validation.validateLocation(body.lat)) ||
      (body.lon && validation.validateLocation(body.lon)) ||
      (body.bio && validation.validateString(body.bio)) ||
      (body.genre && validation.validateGenre(body.genre)) ||
      (body.sex_orient && validation.validateSexOrient(body.sex_orient))
    ) {
      try {
        const user = await User.updateUser(body, user.id);
        return res.json(user.rows[0]);
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
/**
 * @TODO add picture
 */
router.post("/:id/picture", middleware.checkToken, (req, res, next) => {
  if (req.file) {
  }
});

/**
 * @TODO delete user.
 */
router.delete("/:id", middleware.checkToken, (req, res, next) => {
  res.json("Hello user");
});

router.get("/confirm/:confirmationHash", async (req, res, next) => {
  if (req.params.confirmationHash) {
    try {
      const confirmUser = await User.confirmUser(req.params.confirmationHash);
      return res.json(confirmUser);
    } catch (e) {
      return next({ msg: consts.CANNOT_CONFIRM, code: 500 });
    }
  }
  return next({ msg: consts.BAD_REQUEST, code: 400 });
});

router.post("/reset/:passwordResetHash", async (req, res, next) => {
  if (
    req.params.passwordResetHash &&
    (req.body.password && validation.validatePassword(req.body.password))
  ) {
    try {
      const { passwordResetHash } = req.params;
      const { password } = req.body;
      const hashed = await bcrypt.hash(password);
      const resetPassword = await User.changePassword(
        passwordResetHash,
        hashed
      );
      return res.json(resetPassword);
    } catch (e) {
      return next({ msg: consts.BAD_REQUEST, code: 400 });
    }
  }
});

module.exports = router;
