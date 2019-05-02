"use strict";
const db = require("../services/db");

/**
 * register a new user
 * @param {*} user
 */
const register = user => {
  const {
    email,
    username,
    firstname,
    lastname,
    password,
    confirmationHash
  } = user;
  return db.query(
    `INSERT INTO matcha.user (email, username, firstname, lastname, password, confirm_email_token) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, username, firstname, lastname`,
    [email, username, firstname, lastname, password, confirmationHash]
  );
};

/**
 * get an user
 * @param {*} userId
 */
const getUser = userId =>
  db.query("SELECT * FROM matcha.user WHERE id = $1", [userId]);

/**
 * get all users paginated
 */
const getUsers = (limit, offset) =>
  db.query("SELECT * FROM matcha.user LIMIT $1 OFFSET $2", [limit, offset]);

/**
 * update an user
 * @param {*} user
 * @param {*} userId
 */
const updateUser = (body, userId) => {
  return db.query(
    `UPDATE FROM matcha.user (username, genre, o, bio, created_at, tags, image) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) WHERE id = $8`,
    [
      body.email,
      body.password,
      body.dob,
      body.city,
      body.country,
      `${(body.lat, body.lon)}body`.userId
    ]
  );
};

/**
 * delete an user and its associations with cascade delete
 * @param {*} userId
 */
const deleteUser = userId =>
  db.query("DELETE FROM matcha.user WHERE id = $1", [userId]);

/**
 * confirm an user from the confirmation hash.
 */
const confirmUser = confirmationHash =>
  db.query(
    "UPDATE matcha.user SET confirm_email_token = null, is_activated = true WHERE confirm_email_token = $1",
    [confirmationHash]
  );

/**
 * check an user for login
 */
const loginUser = username =>
  db.query(
    "SELECT * FROM matcha.user WHERE username = $1 AND is_activated = true",
    [username]
  );

/**
 * change an user password
 */
const resetPassword = (resetPasswordHash, password) =>
  db.query(
    "UPDATE matcha.user SET reset_password_token = null, password = $1 WHERE reset_password_token = $2",
    [password.resetPasswordHash]
  );

module.exports = {
  register,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  confirmUser,
  loginUser,
  resetPassword
};
