const db = require("../services/db");

/**
 * register a new user
 * @param {*} user
 */
const register = user => {
  const { email, username, first, last, password } = user;
  return db.query(
    `INSERT INTO matcha.user (email, username, firstname, lastname, password) 
      VALUES ($1, $2, $3, $4, $5)`,
    [email, username, first, last, password]
  );
};

/**
 * get a user
 * @param {*} userId
 */
const getUser = userId =>
  db.query(`SELECT * FROM matcha.user WHERE id = $1`, [userId]);

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
const deleteUser = userId =>
  db.query(`DELETE FROM matcha.user WHERE id = $1`, [userId]);

const checkUserExists = (username, email) =>
  db.query(
    `SELECT COUNT(*) FROM matcha.user WHERE username = $1 OR email = $2`,
    [username, email]
  );
module.exports = {
  register,
  getUser,
  updateUser,
  deleteUser,
  checkUserExists
};
