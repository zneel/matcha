const Database = require("../services/db");
const bcrypt = require("bcrypt");

const db = new Database();

const addUser = async user => {
  const { email, username, name, surname, password } = user;
  const saltRounds = 10;
  try {
    const hashed = await bcrypt.hash(password, saltRounds);
    return db.query(
      `INSERT INTO users (email, username, name, surname, password) VALUES (?, ?, ?, ?, ?)`,
      [email, username, name, surname, hashed]
    );
  } catch (e) {
    throw new Error(`Error during user creation: ${e}`);
  }
};

const getUser = async userId => {
  try {
    return db.query(`SELECT * FROM users WHERE id = ?`, [userId]);
  } catch (e) {
    throw new Error(`Error during user creation: ${e}`);
  }
};

const updateUser = async (user, userId) => {
  try {
    return db.query(
      `UPDATE FROM users (username, genre, sexual_orientation, bio, created_at, tags, image) 
        VALUES (?, ?, ?, ?, ?, ?, ?) WHERE id = ?`,
      [...user, userId]
    );
  } catch (e) {
    throw new Error(`Error during user creation: ${e}`);
  }
};

const deleteUser = async userId => {
  try {
    return db.query(`DELETE FROM users WHERE id = ?`, [userId]);
  } catch (e) {
    throw new Error(`Error during user creation: ${e}`);
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser
};
