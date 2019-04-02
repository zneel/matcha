"use strict";
const db = require("../services/db");

/**
 * register a new user
 * @param {*} user
 */
const register = user => {
  const { email, username, firstname, lastname, password, confirmationHash } = user;
  return db.query(
    `INSERT INTO matcha.user (email, username, firstname, lastname, password, confirm_email_token) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, username, firstname, lastname`,
    [email, username, firstname, lastname, password, confirmationHash]
  );
};

/**
 * get a user
 * @param {*} userId
 */
const getUser = userId => db.query(`SELECT * FROM matcha.user WHERE id = $1`, [userId]);

/**
 * get all users paginated
 */
const getUsers = (limit, offset) => {
  return db.query(`SELECT * FROM matcha.user LIMIT $1 OFFSET $2`, [
    limit,
    offset
  ]);
};

/**
 * update an user
 * @param {*} user
 * @param {*} userId
 */
const updateUser = (user, userId) => {
  return db.query(
    `UPDATE FROM matcha.user (username, genre, o, bio, created_at, tags, image) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) WHERE id = ?`,
    [...user, userId]
  );
};

/**
 * delete a user and its associations with cascade delete
 * @param {*} userId
 */
const deleteUser = userId => db.query(`DELETE FROM matcha.user WHERE id = $1`, [userId]);

/**
 * confirm an user from the confirmation hash.
 */
const confirmUser = confirmationHash => {
    return db.query(`UPDATE matcha.user SET confirm_email_token = null, is_activated = true WHERE confirm_email_token = $1`, [confirmationHash]);
}

module.exports = {
  register,
  getUser,
  updateUser,
  deleteUser,
  confirmUser
};
