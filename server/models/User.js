const bcrypt = require("bcrypt");
const db = require("../services/db");

/**
 * register a new user
 * @param {*} user
 */
const register = async user => {
  const { email, username, first, last, password } = user;
  const saltRounds = 10;
  try {
    const hashed = await bcrypt.hash(password, saltRounds);
    const { rows } = db.query(
      `INSERT INTO matcha.user (email, username, firstname, lastname, password) 
      VALUES ($1, $2, $3, $4, $5)`,
      [email, username, first, last, hashed]
    );
    return rows[0];
  } catch (e) {
    throw new Error(`Error during user creation: ${e}`);
  }
};

/**
 * get a user
 * @param {*} userId
 */
const getUser = async userId => {
  try {
    const { rows } = await db.query(`SELECT * FROM matcha.user WHERE id = $1`, [
      userId
    ]);
    return rows[0];
  } catch (e) {
    throw new Error(`Error during user creation: ${e}`);
  }
};

/**
 * get all users paginated
 */
const getUsers = async () => {
  try {
    const { rows } = await db.query(`SELECT * FROM matcha.user WHERE id = $1`, [
      userId
    ]);
    return rows;
  } catch (e) {
    throw new Error(`Error while fetching all users: ${e}`);
  }
};

/**
 * update an user
 * @param {*} user
 * @param {*} userId
 */
const updateUser = async (user, userId) => {
  try {
    const { rows } = await db.query(
      `UPDATE FROM matcha.user (username, genre, o, bio, created_at, tags, image) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) WHERE id = ?`,
      [...user, userId]
    );
    return rows[0];
  } catch (e) {
    throw new Error(`Error during user creation: ${e}`);
  }
};

/**
 * delete a user and its associations with cascade delete
 * @param {*} userId
 */
const deleteUser = async userId => {
  try {
    return db.query(`DELETE FROM matcha.user WHERE id = $1`, [userId]);
  } catch (e) {
    throw new Error(`Error during user creation: ${e}`);
  }
};

module.exports = {
  register,
  getUser,
  updateUser,
  deleteUser
};
